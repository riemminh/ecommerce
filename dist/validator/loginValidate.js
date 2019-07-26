"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validator = require("validator");

var _isEmpty = _interopRequireDefault(require("./is-empty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loginValidate = function loginValidate(data) {
  var errors = {};
  data.email = data.email ? data.email : "";
  data.password = data.password ? data.password : "";

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

var _default = loginValidate;
exports["default"] = _default;