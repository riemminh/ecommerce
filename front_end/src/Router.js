import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import AdminPrivateRoute from "./auth/AdminPrivateRoute";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Profile from "./user/Profile";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./admin/AdminDashboard";
import Cart from "./core/Cart";
import Product from "./core/Product";
import Shop from "./core/Shop";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProduct from "./admin/ManageProduct";
import Order from "./admin/Order";
import UpdateProduct from "./admin/UpdateProduct";

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
        <PrivateRoute path="/profile/:userId" component={Profile} />
        <AdminPrivateRoute path="/admin/dashboard" component={AdminDashboard} />
        <AdminPrivateRoute path="/admin/products" component={ManageProduct} />
        <AdminPrivateRoute path="/create/category" component={AddCategory} />
        <AdminPrivateRoute path="/create/product" component={AddProduct} />
        <AdminPrivateRoute path="/admin/orders" component={Order} />
        <AdminPrivateRoute
          path="/admin/product/update/:productId"
          component={UpdateProduct}
        />
      </Switch>
    </div>
  );
};

export default Router;
