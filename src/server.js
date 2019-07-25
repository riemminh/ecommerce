import express from "express";
import mongoose, { mongo } from "mongoose";
import bodyParser from "body-parser";
import userRoute from "./routes/api/user";
import productRoute from "./routes/api/product";
import categoryRoute from "./routes/api/category";
import braintreeRoute from "./routes/api/braintree";
import orderRoute from "./routes/api/order";
import { keys } from "./config/key";
import path from "path";

const app = express();

// Connect DB
mongoose.set("useFindAndModify", false);
mongoose
  .connect(process.env.MONGODB_URI || keys.db, {
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
app.use("/api/braintree", braintreeRoute);
app.use("/api/order", orderRoute);

// PORT
const PORT = process.env.PORT || 5000;

// SET UP  HEROKU
if (process.env.NODE_ENV === "production") {
  app.use(express.static("front_end/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "front_end", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
