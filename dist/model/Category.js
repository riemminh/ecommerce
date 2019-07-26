"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var CategorySchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var Category = (0, _mongoose.model)("category", CategorySchema);
var _default = Category;
exports["default"] = _default;