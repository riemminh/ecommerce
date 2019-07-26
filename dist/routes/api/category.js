"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _Category = _interopRequireDefault(require("../../model/Category"));

var _categoryValidation2 = _interopRequireDefault(require("../../validator/categoryValidation"));

var _authHelper = require("../../helper/authHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // @route /api/category/create_category
// @desc create category
// @access PRIVATE

router.post("/create_category", _authHelper.vetifyToken, _authHelper.isDecodeToken, _authHelper.isCheckAdmin, function (req, res) {
  var _categoryValidation = (0, _categoryValidation2["default"])(req.body),
      isValid = _categoryValidation.isValid,
      errors = _categoryValidation.errors;

  if (!isValid) {
    res.status(400).json(errors);
  } else {
    _Category["default"].findOne({
      name: req.body.name
    }).then(function (category) {
      if (category) {
        errors.name = "category da co. vui long nhap category khac";
        return res.status(400).json(errors);
      } else {
        var newCategory = new _Category["default"]({
          name: req.body.name
        });
        newCategory.save().then(function (category) {
          res.json(category);
        })["catch"](function (err) {
          return res.status(400).json(err);
        });
      }
    });
  }
}); // @route /api/category/list_category
// @desc create category
// @access PUBLIC

router.get("/list_category", function (req, res) {
  _Category["default"].find().then(function (categories) {
    res.json(categories);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
}); // @router /api/category/delete_category/:id_category
// @desc delete categoy
// @access PRIVATE

router["delete"]("/delete_category/:id_category", _authHelper.vetifyToken, _authHelper.isDecodeToken, _authHelper.isCheckAdmin, function (req, res) {
  _Category["default"].findByIdAndRemove(req.params.id_category).then(function () {
    res.json({
      msg: "success"
    });
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
});
var _default = router;
exports["default"] = _default;