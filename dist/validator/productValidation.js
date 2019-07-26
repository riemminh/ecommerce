"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validator = require("validator");

var _isEmpty = _interopRequireDefault(require("./is-empty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var productValidate = function productValidate(data) {
  var errors = {};
  data.name = data.name ? data.name : "";
  data.description = data.description ? data.description : "";
  data.price = data.price ? data.price : "";
  data.category = data.category ? data.category : "";

  if (!(0, _validator.isLength)(data.name, {
    min: 4
  })) {
    errors.name = "Name must be between 4 characters";
  }

  if ((0, _validator.isEmpty)(data.name)) {
    errors.name = "is required filed";
  }

  if ((0, _validator.isEmpty)(data.description)) {
    errors.description = "is required filed";
  }

  if ((0, _validator.isEmpty)(data.category)) {
    errors.category = "is required filed";
  }

  if ((0, _validator.isEmpty)(data.price)) {
    errors.price = "is required filed";
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty["default"])(errors)
  };
};

var _default = productValidate;
exports["default"] = _default;