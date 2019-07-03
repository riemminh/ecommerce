import { Schema, mongoose } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

const Category = mongoose.model("categoty", CategorySchema);

export default Category;
