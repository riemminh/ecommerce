import { Router } from "express";
import UserModel from "../../model/User";
import OrderModel from "../../model/Order";
import ProductModel from "../../model/Product";
import {
  vetifyToken,
  isDecodeToken,
  isCheckAdmin
} from "../../helper/authHelper";

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

// @route /api/order/list_order
// @desc get list order with admin
// @access PRIVATE
router.get(
  "/list_order",
  vetifyToken,
  isDecodeToken,
  isCheckAdmin,
  (req, res) => {
    OrderModel.find()
      .populate({ path: "user", select: "name _id address" })
      .sort({ createdAt: -1 })
      .then(order => {
        res.json(order);
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route /api/order/get_status_value
// @desc get status value order
// @access PRIVATE
router.get(
  "/get_status_value",
  vetifyToken,
  isDecodeToken,
  isCheckAdmin,
  (req, res) => {
    res.json(OrderModel.schema.path("status").enumValues);
  }
);

// @route /api/order/update_status
// @desc update status order
// @access
router.put(
  "/update_status",
  vetifyToken,
  isDecodeToken,
  isCheckAdmin,
  (req, res) => {
    // console.log(req.body);
    OrderModel.findByIdAndUpdate(
      req.body.id,
      { $set: req.body.status },
      { new: true }
    )
      .then(order => {
        res.json(order);
      })
      .catch(err => res.status(400).json(err));
  }
);

export default router;
