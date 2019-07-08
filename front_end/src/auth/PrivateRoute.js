import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Authenticate } from "./index";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = Authenticate();
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
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

export default PrivateRoute;
