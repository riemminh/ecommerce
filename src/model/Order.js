import { Schema, model } from "mongoose";

const CartItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

const OrderSchema = new Schema(
  {
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
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"]
    },
    update: {
      type: Date
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  },
  { timestamps: true }
);

const Order = model("orders", OrderSchema);

export default Order;
