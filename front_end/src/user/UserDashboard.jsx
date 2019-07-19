import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { Authenticate } from "../auth/index";
import { getHistoryUser } from "./apiUser";
import moment from "moment";

const UserDashboard = () => {
  let ignore = false;
  const [history, setHistory] = useState([]);
  const { name, email, role, id } = Authenticate();
  useEffect(() => {
    getHistoryUser(id)
      .then(resultHistory => {
        if (ignore === false) {
          setHistory(resultHistory.data);
        }
      })
      .catch(err => console.log(err));
    return () => (ignore = true);
  }, []);
  const userLinks = (
    <div className="card">
      <h4 className="card-header">User Links</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to="/cart">
            My Cart
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to={`/profile/${id}`}>
            Update Profile
          </Link>
        </li>
      </ul>
    </div>
  );
  const userInfo = (
    <div className="card mb-5">
      <h3 className="card-header">User Information</h3>
      <ul className="list-group">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">
          {role === 1 ? "Admin" : "Registered User"}
        </li>
      </ul>
    </div>
  );
  const purchaseHistory = (
    <div className="card mb-5">
      <h3 className="card-header">Purchase history</h3>
      <ul className="list-group">
        <li className="list-group-item">
          {history &&
            history.map((h, i1) => {
              return (
                <div key={i1}>
                  {h.products.map((p, i) => {
                    return (
                      <div key={i}>
                        <h6>Product name: {p.name}</h6>
                        <h6>Product price: ${p.price}</h6>
                        <h6>Purchased date: {moment(p.createdAt).fromNow()}</h6>
                      </div>
                    );
                  })}
                  <hr />
                </div>
              );
            })}
        </li>
      </ul>
    </div>
  );
  return (
    <Layout
      title="Dashboard"
      description={`G'day ${name}`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{userLinks}</div>
        <div className="col-9">
          {userInfo}
          {purchaseHistory}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
