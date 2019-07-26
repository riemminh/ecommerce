"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _authHelper = require("../../helper/authHelper");

var _key = require("../../config/key");

var _braintree = _interopRequireDefault(require("braintree"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // connect braintree

var gateway = _braintree["default"].connect({
  environment: _braintree["default"].Environment.Sandbox,
  merchantId: _key.keys.braintree_mearchIdKey,
  publicKey: _key.keys.braintree_publicKey,
  privateKey: _key.keys.braintree_privateKey
}); // @route /api/braintree/getToken
// @desc get token client with braintree
// @access PRIVATE


router.get("/getToken", _authHelper.vetifyToken, _authHelper.isDecodeToken, function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(response);
    }
  });
}); // @route /api/braintree/payment
// @desc xu li thanh toan
// @access PRIVATE

router.post("/payment", _authHelper.vetifyToken, _authHelper.isDecodeToken, function (req, res) {
  gateway.transaction.sale({
    amount: req.body.amountClient,
    paymentMethodNonce: req.body.nonceClient,
    options: {
      submitForSettlement: true
    }
  }).then(function (result) {
    res.json(result);
  })["catch"](function (err) {
    res.status(400).json(err);
  });
});
var _default = router;
exports["default"] = _default;