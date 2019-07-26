"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var ProductSchema = new _mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    trim: true,
    required: true
  },
  category: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true
  },
  quantity: {
    type: Number
  },
  sold: {
    type: Number,
    "default": 0
  },
  photo: {
    path: String,
    contentType: String,
    pathUnlink: String
  },
  shipping: {
    required: false,
    type: Boolean
  }
}, {
  timestamps: true
});
var Product = (0, _mongoose.model)("products", ProductSchema);
var _default = Product;
exports["default"] = _default;