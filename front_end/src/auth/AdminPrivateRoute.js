import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Authenticate } from "./index";

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, role } = Authenticate();
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && role === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default AdminPrivateRoute;
