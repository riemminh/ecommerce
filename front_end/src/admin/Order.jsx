import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Authenticate } from "../auth/index";
import { Link } from "react-router-dom";
import { getListOrder, getStatusOrders, updateStatusOrder } from "./apiAdmin";
import moment from "moment";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([]);
  const user = Authenticate();

  useEffect(() => {
    let ignore = false;
    getStatusOrders()
      .then(dataStatus => {
        if (ignore === false) {
          setStatus(dataStatus.data);
        }
      })
      .catch(err => console.log(err));
    getListOrder()
      .then(res => {
        if (ignore === false) {
          setOrders(res.data);
        }
      })
      .catch(err => console.log(err));
    return () => (ignore = true);
  }, [orders]);

  const handleChange = idOrder => e => {
    e.persist();
    const ops = {
      status: {
        status: e.target.value
      },
      id: idOrder
    };

    updateStatusOrder(ops)
      .then(result => {
        console.log("success update status");
      })
      .catch(err => console.log(err));
  };

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 style={{ fontSize: "28px" }} className="text-danger display-2">
          Total orders: {orders.length}
        </h1>
      );
    } else {
      return <h1 className="text-danger">No orders</h1>;
    }
  };
  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );
  const goBack = (
    <div className="mt-5 mb-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Orders"
      description={`G'day ${user.name} , you can manage all the orders here`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2 orders-style">
          {showOrdersLength()}
          {orders &&
            orders.map((order, index) => {
              return (
                <div
                  key={index}
                  className="mt-5"
                  style={{ borderBottom: "5px solid indigo" }}
                >
                  <h2 className="mb-5">
                    <span className="bg-primary">Order ID: {order._id}</span>
                  </h2>

                  <ul className="list-group mb-2">
                    <li className="list-group-item">
                      <div className="form-group">
                        <h3 className="mark mb-4">Status: {order.status}</h3>
                        <select
                          onChange={handleChange(order._id)}
                          className="form-control"
                        >
                          <option value="">Update Status</option>
                          {status &&
                            status.map((s, si) => {
                              return (
                                <option value={s} key={si}>
                                  {s}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </li>
                    <li className="list-group-item">
                      Transaction ID: 112213123
                    </li>
                    <li className="list-group-item">Amount: ${order.amount}</li>
                    <li className="list-group-item">
                      Ordered by: {order.name}
                    </li>
                    <li className="list-group-item">
                      Ordered on: {moment(order.createdAt).fromNow()}
                    </li>
                    <li className="list-group-item">
                      Delivery address: {order.address}
                    </li>
                  </ul>

                  <h3 className="mt-4 mb-4 font-italic">
                    Total products in the order: {order.products.length}
                  </h3>
                  {order.products.map((item, indexItem) => (
                    <div
                      className="mb-4"
                      key={indexItem}
                      style={{
                        padding: "20px",
                        border: "1px solid indigo"
                      }}
                    >
                      {showInput("Product name", item.name)}
                      {showInput("Product price", item.price)}
                      {showInput("Product total", item.count)}
                      {showInput("Product Id", item._id)}
                    </div>
                  ))}
                </div>
              );
            })}
          {goBack}
        </div>
      </div>
    </Layout>
  );
};

export default Order;
