import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    about: {
      type: String
    },
    role: {
      type: Number,
      default: 0
    },
    history: {
      type: Array,
      default: []
    },
    address: {
      type: String
    }
  },
  { timestamps: true }
);

const User = model("users", UserSchema);

export default User;
