import { Router } from "express";
import { Types } from "mongoose";
import ProductModel from "../../model/Product";

import formidable from "formidable";
import fs from "fs";
import {
  isCheckAdmin,
  isDecodeToken,
  vetifyToken
} from "../../helper/authHelper";
import productValidate from "../../validator/productValidation";

const router = Router();

// @route /api/product/create_product
// @desc create new product
// @access PRIVATE
router.post(
  "/create_product",
  vetifyToken,
  isDecodeToken,
  isCheckAdmin,
  (req, res) => {
    let form = new formidable.IncomingForm();
    form.uploadDir = "src/uploads/";

    form.parse(req, (err, fields, files) => {
      const { isValid, errors } = productValidate(fields);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      let newProduct = new ProductModel({
        name: fields.name,
        description: fields.description,
        price: fields.price,
        category: fields.category,
        quantity: fields.quantity,
        sold: fields.sold,
        shipping: fields.shipping
      });
      if (files.photo) {
        // 1kb = 1000
        // 1mb = 1000000
        if (files.photo.size > 1000000) {
          return res
            .status(400)
            .json({ errors: "Image should be less than 1mb in size" });
        }
        let oldpath = files.photo.path;
        let newpath = form.uploadDir + files.photo.name;
        // rename file
        fs.rename(oldpath, newpath, err => {
          const pathDb = newpath.slice(3);
          newProduct.photo.path = pathDb;
          newProduct.photo.pathUnlink = newpath;
          newProduct
            .save()
            .then(product => res.json(product))
            .catch(err => res.status(400).json(err));
        });
      }
    });
  }
);

// @route /api/product/update_product/:id_product
// @desc update proudct with id
// @access PRIVATE
router.put(
  "/update_product/:id_product",
  vetifyToken,
  isDecodeToken,
  isCheckAdmin,
  (req, res) => {
    // res.json({ mgs: "ddd" });
    // return;
    // res.json({ id: req.params.id_product });
    ProductModel.findById(req.params.id_product)
      .then(product => {
        // res.json(product);
        let form = new formidable.IncomingForm();
        form.uploadDir = "src/uploads/";
        form.parse(req, (err, fields, files) => {
          const { isValid, errors } = productValidate(fields);
          if (!isValid) {
            return res.status(400).json(errors);
          }
          if (err) res.status(400).json(err);
          if (files.photo) {
            // 1kb = 1000
            // 1mb = 1000000
            if (files.photo.size > 1000000) {
              return res
                .status(400)
                .json({ errors: "Image should be less than 1mb in size" });
            }
            let oldpath = files.photo.path;
            let newpath = form.uploadDir + files.photo.name;
            // rename file
            fs.rename(oldpath, newpath, err => {
              if (`src${product.photo.path}` === newpath) {
                const newUp = Object.assign({}, product._doc, fields);
                ProductModel.findByIdAndUpdate(product._id, newUp, {
                  new: true
                }).then(newProduct => {
                  res.json(newProduct);
                });
              } else {
                // no se xoa cai path cu(hinh cu)
                fs.unlink(product.photo.pathUnlink, err => {
                  if (err) res.status(400).json(err);
                  // xong roi minh se gi path cua hinh moi vao pathUnlink
                  const pathDb = newpath.slice(3);
                  product.photo.path = pathDb;
                  product.photo.pathUnlink = newpath;
                  const newUp = Object.assign({}, product._doc, fields);
                  ProductModel.findByIdAndUpdate(product._id, newUp, {
                    new: true
                  }).then(newProduct => {
                    res.json(newProduct);
                  });
                });
              }
            });
          } else {
            const newUp = Object.assign({}, product._doc, fields);

            ProductModel.findByIdAndUpdate(product._id, newUp, {
              new: true
            }).then(newProduct => {
              res.json(newProduct);
              return;
            });
          }
        });
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route /api/product/list_product
// @desc get list product
// @access PUBLIC
/**
 * sell / arrival
 * by sell = /api/product/list_product?sortBy=sold&order=desc&limit=4 // ban chay nhat
 * by arrival = /api/product/list_product?sortBy=createdAt&order=desc&limit=4 // moi nhat
 * if no params are sent, then all products are returned // nếu không có thông số nào được gửi đi, thì tất cả các sản phẩm được trả lại
 */
router.get("/list_product", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  ProductModel.find()
    .populate({ path: "category", select: "name" })
    .sort([[sortBy, order]])
    .limit(limit)
    .then(products => {
      res.json(products);
    })
    .catch(err => res.status(400).json(err));
});

// @route /api/product/related_product/:id_product/:id_category
// @desc get list related product
// @access PUBLIC
router.get("/related_product/:id_product/:id_category", (req, res) => {
  ProductModel.find({
    $and: [
      { category: Types.ObjectId(`${req.params.id_category}`) },
      { _id: { $ne: Types.ObjectId(`${req.params.id_product}`) } }
    ]
  }).then(product => {
    res.json(product);
  });
});

// @route /api/product/delete_product/:id_product
// @desc delete product by id
// @access PRIVATE
router.delete(
  "/delete_product/:id_product",
  vetifyToken,
  isDecodeToken,
  isCheckAdmin,
  (req, res) => {
    ProductModel.findByIdAndRemove(req.params.id_product)
      .then(() => res.json({ msg: "success" }))
      .catch(err => res.status(400).json(err));
  }
);

// @route /api/product/images
// @desc show image
// @access PUBLIC
router.get("/images", (req, res) => {
  let path = `src${req.query.path}`;
  const PromiseRed = path => {
    return new Promise((resole, reject) => {
      fs.readFile(path, function(err, data) {
        if (err) {
          reject(err);
        } else {
          resole(data);
        }
      });
    });
  };
  PromiseRed(path)
    .then(data => {
      if (/.(svg)$/.test(req.params.path)) {
        res.writeHead(200, { "Content-Type": "image/svg" });
        res.end(data); // Send the file data to the browser.
      } else if (/.(png)$/.test(req.params.path)) {
        res.writeHead(200, { "Content-Type": "image/png" });
        res.end(data); // Send the file data to the browser.
      } else if (/.(gif)$/.test(req.params.path)) {
        res.writeHead(200, { "Content-Type": "image/gif" });
        res.end(data); // Send the file data to the browser.
      } else {
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.end(data); // Send the file data to the browser.
      }
    })
    .catch(err => {
      return PromiseRed("src/uploads/not_img.jpg").then(data => {
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.end(data); // Send the file data to the browser.
      });
    });
});

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
// @route /api/product/list_by_search
// @desc search by list
// @access PUBLIC
router.post("/list_by_search", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};
  // console.log(order, sortBy, limit, skip, req.body.filters);

  for (let key in req.body.filters) {
    // console.log(key); => cai nay tra ve key cua object
    if (req.body.filters[key].length > 0) {
      // gte - greater than price [0-10]
      // lte - less than
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  // console.log(findArgs);
  // {
  //    category: [ '5d24a24c1234ca0ac4fa6e19' ],
  //      price: { '$gte': 0, '$lte': 9 }
  //  }
  // res.json(findArgs);
  ProductModel.find(findArgs)
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .skip(skip)
    .then(products => {
      res.json({ size: products.length, products });
    })
    .catch(err => res.status(400).json(err));
});

// @route /api/product/search_text
// @desc search text by category
// @access PUBLIC
// {name: {$regex: 'book', $options: 'i'}, category: ObjectId('5d24a2521234ca0ac4fa6e1a')}
router.post("/search_text", (req, res) => {
  let findArgs = {};
  if (req.body) {
    if (req.body.category !== "") {
      findArgs.category = [req.body.category];
    }
    findArgs.name = { $regex: req.body.textsearch, $options: "i" };
  }

  // console.log(findArgs);

  ProductModel.find(findArgs)
    .then(products => {
      res.json({ products, size: products.length });
    })
    .catch(err => res.status(400).json(err));
});

// @route /api/product/:productId
// @desc get product by id
// @access PUBLIC
router.get("/:productId", (req, res) => {
  ProductModel.findById(req.params.productId)
    .populate("category", "name")
    .then(product => {
      res.json(product);
    })
    .catch(err => res.status(400).json(err));
});

export default router;
