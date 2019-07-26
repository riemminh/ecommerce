"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validator = require("validator");

var _isEmpty = _interopRequireDefault(require("./is-empty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var categoryValidate = function categoryValidate(data) {
  var errors = {};
  data.name = data.name ? data.name : "";

  if (!(0, _validator.isLength)(data.name, {
    min: 3
  })) {
    errors.name = "Name must be between 3 characters";
  }

  if ((0, _validator.isEmpty)(data.name)) {
    errors.name = "is required filed";
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty["default"])(errors)
  };
};

var _default = categoryValidate;
exports["default"] = _default;