import express from "express";
import mongoose, { mongo } from "mongoose";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// middleware

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
