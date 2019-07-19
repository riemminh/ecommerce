import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link, Redirect } from "react-router-dom";
import { Authenticate } from "../auth/index";
import { getUserById, updateUserById } from "./apiUser";

const Profile = ({ match }) => {
  let ignore = false;
  const [userValue, setUserValue] = useState({
    name: "",
    email: "",
    address: ""
  });
  let currentUser = Authenticate();
  useEffect(() => {
    getUserById(match.params.userId)
      .then(resultUser => {
        if (ignore === false) {
          setUserValue({
            ...userValue,
            name: resultUser.data.name,
            email: resultUser.data.email,
            address: resultUser.data.address
          });
        }
      })
      .catch(err => console.log());
    return () => (ignore = true);
  }, []);

  const { name, email, address } = userValue;
  const handleOnchange = e => {
    e.persist();
    setUserValue({ ...userValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    const newData = {
      name,
      email,
      address
    };
    updateUserById(match.params.userId, newData)
      .then(userUpdate => {
        currentUser.name = userUpdate.data.name;
        currentUser.email = userUpdate.data.email;
        localStorage.setItem("userToken", JSON.stringify(currentUser));
      })
      .catch(err => console.log(err));
  };
  return (
    <Layout
      title="Profile"
      description="Update your profile"
      className="container-fluid"
    >
      <h2 className="mb-4">Profile update</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            name="name"
            value={name}
            onChange={handleOnchange}
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            name="email"
            value={email}
            onChange={handleOnchange}
            type="email"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Addess</label>
          <input
            name="address"
            value={address ? address : ""}
            onChange={handleOnchange}
            type="text"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </Layout>
  );
};

export default Profile;
