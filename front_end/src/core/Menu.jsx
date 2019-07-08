import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Authenticate, signout } from "../auth/index";

const Menu = ({ history }) => {
  const { isAuthenticated, role } = Authenticate();
  const authLinks = (
    <Fragment>
      {role === 1 ? (
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin/dashboard">
            Dashboard
          </NavLink>
        </li>
      ) : (
        <li className="nav-item">
          <NavLink className="nav-link" to="/user/dashboard">
            Dashboard
          </NavLink>
        </li>
      )}

      <li className="nav-item">
        <a onClick={() => signout(history)} className="nav-link">
          Signout
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <NavLink exact className="nav-link" to="/signin">
          Signin
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink exact className="nav-link" to="/signup">
          Signup
        </NavLink>
      </li>
    </Fragment>
  );
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <NavLink exact className="nav-link" to="/">
            Home
          </NavLink>
        </li>

        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
