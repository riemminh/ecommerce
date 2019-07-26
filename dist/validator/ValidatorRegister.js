"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validator = require("validator");

var _isEmpty = _interopRequireDefault(require("./is-empty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var validatorRegister = function validatorRegister(data) {
  var errors = {};
  data.name = data.name ? data.name : "";
  data.email = data.email ? data.email : "";
  data.password = data.password ? data.password : "";

  if (!(0, _validator.isLength)(data.name, {
    min: 4
  })) {
    errors.name = "Name must be between 4 characters";
  }

  if ((0, _validator.isEmpty)(data.name)) {
    errors.name = "is required filed";
  }

  if (!(0, _validator.isEmail)(data.email)) {
    errors.email = "Email is invalid";
  }

  if ((0, _validator.isEmpty)(data.email)) {
    errors.email = "is required filed";
  }

  if ((0, _validator.isEmpty)(data.password)) {
    errors.password = "is required filed";
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty["default"])(errors)
  };
};

var _default = validatorRegister;
exports["default"] = _default;