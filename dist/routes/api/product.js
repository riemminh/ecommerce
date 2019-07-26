"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _mongoose = require("mongoose");

var _Product = _interopRequireDefault(require("../../model/Product"));

var _formidable = _interopRequireDefault(require("formidable"));

var _fs = _interopRequireDefault(require("fs"));

var _authHelper = require("../../helper/authHelper");

var _productValidation = _interopRequireDefault(require("../../validator/productValidation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // @route /api/product/create_product
// @desc create new product
// @access PRIVATE

router.post("/create_product", _authHelper.vetifyToken, _authHelper.isDecodeToken, _authHelper.isCheckAdmin, function (req, res) {
  var form = new _formidable["default"].IncomingForm();
  form.uploadDir = "src/uploads/";
  form.parse(req, function (err, fields, files) {
    var _productValidate = (0, _productValidation["default"])(fields),
        isValid = _productValidate.isValid,
        errors = _productValidate.errors;

    if (!isValid) {
      return res.status(400).json(errors);
    }

    var newProduct = new _Product["default"]({
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
        return res.status(400).json({
          errors: "Image should be less than 1mb in size"
        });
      }

      var oldpath = files.photo.path;
      var newpath = form.uploadDir + files.photo.name; // rename file

      _fs["default"].rename(oldpath, newpath, function (err) {
        var pathDb = newpath.slice(3);
        newProduct.photo.path = pathDb;
        newProduct.photo.pathUnlink = newpath;
        newProduct.save().then(function (product) {
          return res.json(product);
        })["catch"](function (err) {
          return res.status(400).json(err);
        });
      });
    }
  });
}); // @route /api/product/update_product/:id_product
// @desc update proudct with id
// @access PRIVATE

router.put("/update_product/:id_product", _authHelper.vetifyToken, _authHelper.isDecodeToken, _authHelper.isCheckAdmin, function (req, res) {
  // res.json({ mgs: "ddd" });
  // return;
  // res.json({ id: req.params.id_product });
  _Product["default"].findById(req.params.id_product).then(function (product) {
    // res.json(product);
    var form = new _formidable["default"].IncomingForm();
    form.uploadDir = "src/uploads/";
    form.parse(req, function (err, fields, files) {
      var _productValidate2 = (0, _productValidation["default"])(fields),
          isValid = _productValidate2.isValid,
          errors = _productValidate2.errors;

      if (!isValid) {
        return res.status(400).json(errors);
      }

      if (err) res.status(400).json(err);

      if (files.photo) {
        // 1kb = 1000
        // 1mb = 1000000
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            errors: "Image should be less than 1mb in size"
          });
        }

        var oldpath = files.photo.path;
        var newpath = form.uploadDir + files.photo.name; // rename file

        _fs["default"].rename(oldpath, newpath, function (err) {
          if ("src".concat(product.photo.path) === newpath) {
            var newUp = Object.assign({}, product._doc, fields);

            _Product["default"].findByIdAndUpdate(product._id, newUp, {
              "new": true
            }).then(function (newProduct) {
              res.json(newProduct);
            });
          } else {
            // no se xoa cai path cu(hinh cu)
            _fs["default"].unlink(product.photo.pathUnlink, function (err) {
              if (err) res.status(400).json(err); // xong roi minh se gi path cua hinh moi vao pathUnlink

              var pathDb = newpath.slice(3);
              product.photo.path = pathDb;
              product.photo.pathUnlink = newpath;
              var newUp = Object.assign({}, product._doc, fields);

              _Product["default"].findByIdAndUpdate(product._id, newUp, {
                "new": true
              }).then(function (newProduct) {
                res.json(newProduct);
              });
            });
          }
        });
      } else {
        var newUp = Object.assign({}, product._doc, fields);

        _Product["default"].findByIdAndUpdate(product._id, newUp, {
          "new": true
        }).then(function (newProduct) {
          res.json(newProduct);
          return;
        });
      }
    });
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
}); // @route /api/product/list_product
// @desc get list product
// @access PUBLIC

/**
 * sell / arrival
 * by sell = /api/product/list_product?sortBy=sold&order=desc&limit=4 // ban chay nhat
 * by arrival = /api/product/list_product?sortBy=createdAt&order=desc&limit=4 // moi nhat
 * if no params are sent, then all products are returned // nếu không có thông số nào được gửi đi, thì tất cả các sản phẩm được trả lại
 */

router.get("/list_product", function (req, res) {
  var order = req.query.order ? req.query.order : "asc";
  var sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  var limit = req.query.limit ? parseInt(req.query.limit) : 6;

  _Product["default"].find().populate({
    path: "category",
    select: "name"
  }).sort([[sortBy, order]]).limit(limit).then(function (products) {
    res.json(products);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
}); // @route /api/product/related_product/:id_product/:id_category
// @desc get list related product
// @access PUBLIC

router.get("/related_product/:id_product/:id_category", function (req, res) {
  _Product["default"].find({
    $and: [{
      category: _mongoose.Types.ObjectId("".concat(req.params.id_category))
    }, {
      _id: {
        $ne: _mongoose.Types.ObjectId("".concat(req.params.id_product))
      }
    }]
  }).then(function (product) {
    res.json(product);
  });
}); // @route /api/product/delete_product/:id_product
// @desc delete product by id
// @access PRIVATE

router["delete"]("/delete_product/:id_product", _authHelper.vetifyToken, _authHelper.isDecodeToken, _authHelper.isCheckAdmin, function (req, res) {
  _Product["default"].findByIdAndRemove(req.params.id_product).then(function () {
    return res.json({
      msg: "success"
    });
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
}); // @route /api/product/images
// @desc show image
// @access PUBLIC

router.get("/images", function (req, res) {
  var path = "src".concat(req.query.path);

  var PromiseRed = function PromiseRed(path) {
    return new Promise(function (resole, reject) {
      _fs["default"].readFile(path, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resole(data);
        }
      });
    });
  };

  PromiseRed(path).then(function (data) {
    if (/.(svg)$/.test(req.params.path)) {
      res.writeHead(200, {
        "Content-Type": "image/svg"
      });
      res.end(data); // Send the file data to the browser.
    } else if (/.(png)$/.test(req.params.path)) {
      res.writeHead(200, {
        "Content-Type": "image/png"
      });
      res.end(data); // Send the file data to the browser.
    } else if (/.(gif)$/.test(req.params.path)) {
      res.writeHead(200, {
        "Content-Type": "image/gif"
      });
      res.end(data); // Send the file data to the browser.
    } else {
      res.writeHead(200, {
        "Content-Type": "image/jpeg"
      });
      res.end(data); // Send the file data to the browser.
    }
  })["catch"](function (err) {
    return PromiseRed("src/uploads/not_img.jpg").then(function (data) {
      res.writeHead(200, {
        "Content-Type": "image/jpeg"
      });
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

router.post("/list_by_search", function (req, res) {
  var order = req.body.order ? req.body.order : "desc";
  var sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  var limit = req.body.limit ? parseInt(req.body.limit) : 100;
  var skip = parseInt(req.body.skip);
  var findArgs = {}; // console.log(order, sortBy, limit, skip, req.body.filters);

  for (var key in req.body.filters) {
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
  } // console.log(findArgs);
  // {
  //    category: [ '5d24a24c1234ca0ac4fa6e19' ],
  //      price: { '$gte': 0, '$lte': 9 }
  //  }
  // res.json(findArgs);


  _Product["default"].find(findArgs).populate("category").sort([[sortBy, order]]).limit(limit).skip(skip).then(function (products) {
    res.json({
      size: products.length,
      products: products
    });
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
}); // @route /api/product/search_text
// @desc search text by category
// @access PUBLIC
// {name: {$regex: 'book', $options: 'i'}, category: ObjectId('5d24a2521234ca0ac4fa6e1a')}

router.post("/search_text", function (req, res) {
  var findArgs = {};

  if (req.body) {
    if (req.body.category !== "") {
      findArgs.category = [req.body.category];
    }

    findArgs.name = {
      $regex: req.body.textsearch,
      $options: "i"
    };
  } // console.log(findArgs);


  _Product["default"].find(findArgs).then(function (products) {
    res.json({
      products: products,
      size: products.length
    });
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
}); // @route /api/product/:productId
// @desc get product by id
// @access PUBLIC

router.get("/:productId", function (req, res) {
  _Product["default"].findById(req.params.productId).populate("category", "name").then(function (product) {
    res.json(product);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
});
var _default = router;
exports["default"] = _default;