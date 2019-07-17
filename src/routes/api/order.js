import { Router } from "express";
import { vetifyToken, isDecodeToken } from "../../helper/authHelper";
import UserModel from "../../model/User";
import OrderModel from "../../model/Order";

import ProductModel from "../../model/Product";

const router = Router();

// @route /api/order/test
// @desc test route
// @access PUBLIC
router.get("/test", (req, res) => {
  res.json({ msg: "order works" });
});

// @route /api/order/create_order
// @desc create new order
// @access PRIVATE
router.post("/create_order", vetifyToken, isDecodeToken, (req, res) => {
  req.body.dataOrder.user = req.user.id;
  let bulkOps = req.body.dataOrder.products.map(item => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } }
      }
    };
  });

  ProductModel.bulkWrite(bulkOps, {})
    .then(() => {
      let history = [];
      req.body.dataOrder.products.forEach(item => {
        history.push({
          name: item.name,
          _id: item._id,
          description: item.description,
          category: item.category,
          quantity: item.count,
          transaction_id: req.body.dataOrder.transaction_id,
          amount: req.body.dataOrder.amount
        });
      });
      return UserModel.findOneAndUpdate(
        { _id: req.user.id },
        { $push: { history: history } },
        { new: true }
      );
    })
    .then(() => {
      let productsOrder = [];
      req.body.dataOrder.products.forEach(e => {
        const item = {
          product: e._id,
          name: e.name,
          price: e.price,
          count: e.count
        };
        productsOrder.push(item);
      });
      req.body.dataOrder.products = productsOrder;
      const Order = new OrderModel(req.body.dataOrder);
      return Order.save();
    })
    .then(order => {
      res.json(order);
    })
    .catch(err => res.status(400).json(err));
});

export default router;
