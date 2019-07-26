"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var UserSchema = new _mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  about: {
    type: String
  },
  role: {
    type: Number,
    "default": 0
  },
  history: {
    type: Array,
    "default": []
  },
  address: {
    type: String
  }
}, {
  timestamps: true
});
var User = (0, _mongoose.model)("users", UserSchema);
var _default = User;
exports["default"] = _default;