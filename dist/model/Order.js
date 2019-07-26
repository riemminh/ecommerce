"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var CartItemSchema = new _mongoose.Schema({
  product: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "products"
  },
  name: {
    type: String
  },
  price: {
    type: Number
  },
  count: {
    type: Number
  }
}, {
  timestamps: true
});
var OrderSchema = new _mongoose.Schema({
  products: [CartItemSchema],
  transaction_id: {
    type: String
  },
  amount: {
    type: Number
  },
  address: {
    type: String
  },
  status: {
    type: String,
    "default": "Not processed",
    "enum": ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"]
  },
  update: {
    type: Date
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
}, {
  timestamps: true
});
var Order = (0, _mongoose.model)("orders", OrderSchema);
var _default = Order;
exports["default"] = _default;