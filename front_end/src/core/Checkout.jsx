import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Authenticate } from "../auth";
import { getItemCart } from "./cartHelper";

const Checkout = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [items, setItems] = useState([]);
  const init = () => {
    let total;
    if (items.length > 0) {
      total = items.reduce((currentValue, nextValue) => {
        return currentValue + nextValue.count * nextValue.price;
      }, 0);
    } else {
      total = 0;
    }
    setTotalPrice(total);
  };

  useEffect(() => {
    setItems(getItemCart());
    init();
  }, [items]);

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
      <h2>Total: {totalPrice}</h2>

      {showCheckout()}
    </div>
  );
};

export default Checkout;
