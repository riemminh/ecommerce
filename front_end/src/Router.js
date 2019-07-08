import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import AdminPrivateRoute from "./auth/AdminPrivateRoute";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashboard from "./core/UserDashboard";
import AdminDashboard from "./core/AdminDashboard";

const Router = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/user/dashboard" component={UserDashboard} />
        <AdminPrivateRoute path="/admin/dashboard" component={AdminDashboard} />
      </Switch>
    </div>
  );
};

export default Router;
