import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { createCategory } from "./apiAdmin";
import { Authenticate } from "../auth/index";

const AddCategory = () => {
  const [nameCategory, setNameCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const { name } = Authenticate();
  const handleChange = e => {
    e.persist();
    setNameCategory(e.target.value);
    setSuccess(false);
    setErrors({});
  };

  const handleSubmit = e => {
    e.preventDefault();
    const dataCategory = {
      name: nameCategory
    };
    createCategory(dataCategory)
      .then(res => {
        setNameCategory(res.data.name);
        setSuccess(true);
        setErrors({});
      })
      .catch(err => {
        setErrors(err.response.data);
      });
  };
  const newCategoryFom = (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          autoFocus
          className={errors.name ? "form-control is-invalid" : "form-control"}
        />
        {errors.name ? (
          <div className="invalid-feedback">{errors.name}</div>
        ) : (
          ""
        )}
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );
  const showSuccess = (
    <h3 className="text-success">{nameCategory} is created</h3>
  );
  const goBack = (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );
  return (
    <Layout
      title="Add a new category"
      description={`G'day ${name}, ready to add a new category?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {success ? showSuccess : ""}
          {newCategoryFom}
          {goBack}
          {JSON.stringify(nameCategory)}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
