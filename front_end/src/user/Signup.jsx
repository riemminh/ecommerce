import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth/index";

const Signup = () => {
  const [errors, setErrors] = useState({});
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    password: "",
    success: false
  });
  useEffect(() => {}, []);
  const handleChange = e => {
    e.persist();
    setDataUser(values => ({ ...values, [e.target.name]: e.target.value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(dataUser);
    signup(dataUser)
      .then(user => {
        console.log(user);
        setDataUser({ name: "", email: "", password: "", success: true });
        setErrors({});
      })
      .catch(err => setErrors(err.response.data));
  };
  const showSuccess = () => (
    <div
      className="alert alert-info mt-4"
      style={{ display: dataUser.success ? "block" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );

  const signUpForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange}
          name="name"
          type="text"
          value={dataUser.name}
          className={errors.name ? "form-control is-invalid" : "form-control"}
        />
        {errors.name ? (
          <div className="invalid-feedback">{errors.name}</div>
        ) : (
          ""
        )}
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange}
          name="email"
          type="text"
          value={dataUser.email}
          className={errors.email ? "form-control is-invalid" : "form-control"}
        />
        {errors.email ? (
          <div className="invalid-feedback">{errors.email}</div>
        ) : (
          ""
        )}
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange}
          name="password"
          type="password"
          value={dataUser.password}
          className={
            errors.password ? "form-control is-invalid" : "form-control"
          }
        />
        {errors.password ? (
          <div className="invalid-feedback">{errors.password}</div>
        ) : (
          ""
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
  return (
    <Layout
      title="Signup"
      description="Signup to Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {signUpForm()}
      {showSuccess()}
      {JSON.stringify(dataUser)}
      {JSON.stringify(errors)}
    </Layout>
  );
};

export default Signup;
