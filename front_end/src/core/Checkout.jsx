import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Authenticate } from "../auth";

const Checkout = () => {
  const { isAuthenticated } = Authenticate();
  const showCheckout = () => {
    return isAuthenticated ? (
      <button className="btn btn-success">Checkout</button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  };
  return (
    <div>
      <h2>Total: 9999</h2>

      {showCheckout()}
    </div>
  );
};

export default Checkout;
