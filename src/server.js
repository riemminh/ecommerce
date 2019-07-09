import express from "express";
import mongoose, { mongo } from "mongoose";
import bodyParser from "body-parser";
import userRoute from "./routes/api/user";
import productRoute from "./routes/api/product";
import categoryRoute from "./routes/api/category";

const app = express();

// Connect DB
mongoose.set("useFindAndModify", false);
mongoose
  .connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
