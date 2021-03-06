import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Authenticate } from "../auth";
import { getClientToken, processPayment, createOrder } from "./apiCore";
import { emptyCart } from "./cartHelper";
import "braintree-web";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    errors: "",
    instance: {},
    address: ""
  });

  const getTotalPriceCart = () => {
    if (products.length > 0) {
      return products.reduce((currentValue, nextValue) => {
        return currentValue + nextValue.count * nextValue.price;
      }, 0);
    } else {
      return 0;
    }
  };

  useEffect(() => {
    let ignore = false;
    // console.log(ignore);
    getClientToken()
      .then(res => {
        if (ignore === false) {
          setData({ ...data, clientToken: res.data.clientToken });
        }
      })
      .catch(err => console.log(err));
    return () => {
      ignore = true;
      // console.log(ignore);
    };
  }, []);

  const handleAddress = event => {
    setData({ ...data, address: event.target.value });
  };

  const { isAuthenticated } = Authenticate();
  const showCheckout = () => {
    return isAuthenticated ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  };
  const buy = () => {
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then(respayment => {
        nonce = respayment.nonce;

        setData({ ...data, loading: true });

        const paymentData = {
          amountClient: getTotalPriceCart(),
          nonceClient: nonce
        };

        processPayment(paymentData)
          .then(res => {
            let dataOrder = {
              products: products,
              transaction_id: res.data.transaction.id,
              amount: res.data.transaction.amount,
              address: data.address
            };
            createOrder(dataOrder)
              .then(resorder => {
                setData({ ...data, loading: false, success: true });
                emptyCart();
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        setData({ ...data, errors: "hay kiem tra payment" });
      });
  };
  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, errors: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className="gorm-group mb-3">
            <label className="text-muted">Delivery address:</label>
            <textarea
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              placeholder="Type your delivery address here..."
            />
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault"
              }
            }}
            onInstance={instance => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-success btn-block">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showSuccess = (
    <div
      className="alert alert-info"
      style={{ display: data.success ? "" : "none" }}
    >
      Thanks! Your payment was successful!
    </div>
  );
  const showError = (
    <div
      className="alert alert-danger"
      style={{ display: data.errors ? "" : "none" }}
    >
      {data.errors}
    </div>
  );
  const showLoading = <h2 className="text-danger">Loading...</h2>;

  return (
    <div>
      <h2>Total: {getTotalPriceCart()}</h2>
      {data.loading ? showLoading : ""}
      {showError}
      {showSuccess}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
