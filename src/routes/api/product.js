import { Router } from "express";
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
          newProduct.photo.contentType = files.photo.type;
          newProduct
            .save()
            .then(product => res.json(product))
            .catch(err => res.status(400).json(err));
        });
      }
    });
  }
);

// @route /api/product/list_product
// @desc get list product
// @access PUBLIC
/**
 * sell / arrival
 * by sell = /list_product?sortBy=sold&order=desc&limit=4
 * by arrival = /list_product?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
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

export default router;
