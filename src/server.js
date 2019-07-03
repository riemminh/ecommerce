import express from "express";
import mongoose, { mongo } from "mongoose";
import userRoute from "./routes/api/user";
import bodyParser from "body-parser";

const app = express();

// Connect DB
mongoose
  .connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", userRoute);

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
