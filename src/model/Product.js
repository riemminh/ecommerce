import { model, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
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
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true
    },
    quantity: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
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
  },
  { timestamps: true }
);

const Product = model("products", ProductSchema);

export default Product;
