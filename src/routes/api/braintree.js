import { Router } from "express";
import { isDecodeToken, vetifyToken } from "../../helper/authHelper";
import { keys } from "../../config/key";
import braintree from "braintree";

const router = Router();

// connect braintree
let gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: keys.braintree_mearchIdKey,
  publicKey: keys.braintree_publicKey,
  privateKey: keys.braintree_privateKey
});

// @route /api/braintree/getToken
// @desc get token client with braintree
// @access PRIVATE
router.get("/getToken", vetifyToken, isDecodeToken, (req, res) => {
  gateway.clientToken.generate({}, function(err, response) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(response);
    }
  });
});

// @route /api/braintree/payment
// @desc xu li thanh toan
// @access PRIVATE
router.post("/payment", vetifyToken, isDecodeToken, (req, res) => {
  gateway.transaction
    .sale({
      amount: req.body.amountClient,
      paymentMethodNonce: req.body.nonceClient,
      options: {
        submitForSettlement: true
      }
    })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

export default router;
