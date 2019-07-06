import { Router } from "express";
import categoryModel from "../../model/Category";
import categoryValidation from "../../validator/categoryValidation";
import {
  isCheckAdmin,
  isDecodeToken,
  vetifyToken
} from "../../helper/authHelper";

const router = Router();

// @route /api/category/create_category
// @desc create category
// @access PRIVATE

router.post(
  "/create_category",
  vetifyToken,
  isDecodeToken,
  isCheckAdmin,
  (req, res) => {
    const { isValid, errors } = categoryValidation(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      categoryModel.findOne({ name: req.body.name }).then(category => {
        if (category) {
          errors.name = "ten dang co. vui long nhap nam khac";
          return res.status(400).json(errors);
        } else {
          let newCategory = new categoryModel({
            name: req.body.name
          });
          newCategory.save().then(category => {
            res.json(category);
          });
        }
      });
    }
  }
);

// @route /api/category/list_category
// @desc create category
// @access PUBLIC
router.get("/list_category", (req, res) => {
  categoryModel
    .find()
    .then(categories => {
      res.json(categories);
    })
    .catch(err => res.status(400).json(err));
});

// @router /api/category/delete_category/:id_category
// @desc delete categoy
// @access PRIVATE
router.delete(
  "/delete_category/:id_category",
  vetifyToken,
  isDecodeToken,
  isCheckAdmin,
  (req, res) => {
    categoryModel
      .findByIdAndRemove(req.params.id_category)
      .then(() => {
        res.json({ msg: "success" });
      })
      .catch(err => res.status(400).json(err));
  }
);

export default router;
