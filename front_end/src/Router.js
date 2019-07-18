import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import AdminPrivateRoute from "./auth/AdminPrivateRoute";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashboard from "./core/UserDashboard";
import AdminDashboard from "./admin/AdminDashboard";
import Cart from "./core/Cart";
import Product from "./core/Product";
import Shop from "./core/Shop";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Order from "./admin/Order";

const Router = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/shop" component={Shop} />
        <Route path="/cart" component={Cart} />
        <Route path="/product/:id" component={Product} />
        <PrivateRoute path="/user/dashboard" component={UserDashboard} />
        <AdminPrivateRoute path="/admin/dashboard" component={AdminDashboard} />
        <AdminPrivateRoute path="/create/category" component={AddCategory} />
        <AdminPrivateRoute path="/create/product" component={AddProduct} />
        <AdminPrivateRoute path="/admin/orders" component={Order} />
      </Switch>
    </div>
  );
};

export default Router;
