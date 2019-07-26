"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _User = _interopRequireDefault(require("../../model/User"));

var _Order = _interopRequireDefault(require("../../model/Order"));

var _Product = _interopRequireDefault(require("../../model/Product"));

var _authHelper = require("../../helper/authHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // @route /api/order/test
// @desc test route
// @access PUBLIC

router.get("/test", function (req, res) {
  res.json({
    msg: "order works"
  });
}); // @route /api/order/create_order
// @desc create new order
// @access PRIVATE

router.post("/create_order", _authHelper.vetifyToken, _authHelper.isDecodeToken, function (req, res) {
  req.body.dataOrder.user = req.user.id;
  var bulkOps = req.body.dataOrder.products.map(function (item) {
    return {
      updateOne: {
        filter: {
          _id: item._id
        },
        update: {
          $inc: {
            quantity: -item.count,
            sold: +item.count
          }
        }
      }
    };
  });

  _Product["default"].bulkWrite(bulkOps, {}).then(function () {
    var history = [];
    req.body.dataOrder.products.forEach(function (item) {
      history.push({
        name: item.name,
        productId: item._id,
        description: item.description,
        category: item.category,
        quantity: item.count,
        transaction_id: req.body.dataOrder.transaction_id,
        amount: req.body.dataOrder.amount,
        createdAt: Date.now()
      });
    });
    return _User["default"].findOneAndUpdate({
      _id: req.user.id
    }, {
      $push: {
        history: history
      }
    }, {
      "new": true
    });
  }).then(function () {
    var productsOrder = [];
    req.body.dataOrder.products.forEach(function (e) {
      var item = {
        product: e._id,
        name: e.name,
        price: e.price,
        count: e.count
      };
      productsOrder.push(item);
    });
    req.body.dataOrder.products = productsOrder;
    var Order = new _Order["default"](req.body.dataOrder);
    return Order.save();
  }).then(function (order) {
    res.json(order);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
}); // @route /api/order/list_order
// @desc get list order with admin
// @access PRIVATE

router.get("/list_order", _authHelper.vetifyToken, _authHelper.isDecodeToken, _authHelper.isCheckAdmin, function (req, res) {
  _Order["default"].find().populate({
    path: "user",
    select: "name _id address"
  }).sort({
    createdAt: -1
  }).then(function (order) {
    res.json(order);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
}); // @route /api/order/get_status_value
// @desc get status value order
// @access PRIVATE

router.get("/get_status_value", _authHelper.vetifyToken, _authHelper.isDecodeToken, _authHelper.isCheckAdmin, function (req, res) {
  res.json(_Order["default"].schema.path("status").enumValues);
}); // @route /api/order/update_status
// @desc update status order
// @access

router.put("/update_status", _authHelper.vetifyToken, _authHelper.isDecodeToken, _authHelper.isCheckAdmin, function (req, res) {
  // console.log(req.body);
  _Order["default"].findByIdAndUpdate(req.body.id, {
    $set: req.body.status
  }, {
    "new": true
  }).then(function (order) {
    res.json(order);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
});
var _default = router;
exports["default"] = _default;