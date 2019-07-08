import React, { useState } from "react";
import Layout from "../core/Layout";
import { singin, setAuthToken } from "../auth/index";
import jwt_decode from "jwt-decode";

const Signin = ({ history }) => {
  const [errors, setErrors] = useState({});
  const [dataUser, setDataUser] = useState({
    password: "123123",
    email: "riem@test.com"
  });
  const handleOnChange = e => {
    e.persist();
    setDataUser(values => ({ ...values, [e.target.name]: e.target.value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    singin(dataUser)
      .then(res => {
        // save to localStorage
        const { token } = res.data;
        // Set token to ls
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // save User localStorage
        localStorage.setItem(
          "userToken",
          JSON.stringify({ ...decoded, isAuthenticated: true })
        );
        console.log(decoded);
        history.push("/");
      })
      .catch(err => setErrors(err.response.data));
  };
  const signInForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          name="email"
          value={dataUser.email}
          type="text"
          onChange={handleOnChange}
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
          value={dataUser.password}
          type="password"
          name="password"
          onChange={handleOnChange}
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
      title="Signin"
      description="Signin to Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {signInForm()}
      {JSON.stringify(dataUser)}
      {JSON.stringify(errors)}
    </Layout>
  );
};

export default Signin;
