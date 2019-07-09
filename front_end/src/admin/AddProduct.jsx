import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import {} from "./apiAdmin";
import { Authenticate } from "../auth/index";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: ""
  });
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values;
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  let user;
  user = Authenticate();
  const handleChange = e => {
    e.persist();
    const value = name === "photo" ? e.target.files[0] : eval.target.value;
  };
  const newPostForm = (
    <form className="mb-3">
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input type="file" name="photo" accept="image/*" />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input type="text" name="name" className="form-control" />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea name="description" className="form-control" />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input name="price" type="number" className="form-control" />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select className="form-control" name="category">
          <option>Please select</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select name="shipping" className="form-control">
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input name="quantity" type="number" className="form-control" />
      </div>

      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  );
  const showSuccess = (
    <div
      className="alert alert-info"
      // style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`Name product`} is created!</h2>
    </div>
  );

  const showLoading = (
    <div className="alert alert-success">
      <h2>Loading...</h2>
    </div>
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
      title="Add a new product"
      description={`G'day ${user.name}, ready to add a new product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {loading ? showLoading : ""}
          {success ? showSuccess : ""}
          {newPostForm}
          {goBack}
          {JSON.stringify(values.formData)}
          <br />
          {JSON.stringify(values.photo)}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
