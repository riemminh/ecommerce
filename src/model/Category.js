import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Category = model("category", CategorySchema);

export default Category;
