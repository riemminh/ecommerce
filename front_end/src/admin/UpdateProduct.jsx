import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import {
  createProductFun,
  getCategories,
  getproductById,
  updateProductById
} from "./apiAdmin";
import { Authenticate } from "../auth/index";

const UpdateProduct = ({ match, history }) => {
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
    formData: new FormData()
  });
  const {
    name,
    description,
    price,
    category,
    categories,
    quantity,
    loading,
    createdProduct,
    formData,
    shipping
  } = values;
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const init = async () => {
    let cate = await getCategories()
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
    await getproductById(match.params.productId).then(product => {
      setValues({
        ...values,
        categories: cate,
        name: product.data.name,
        description: product.data.name,
        price: product.data.price,
        category: product.data.category,
        shipping: product.data.shipping,
        quantity: product.data.quantity
      });
      formData.set("name", product.data.name);
      formData.set("description", product.data.description);
      formData.set("category", product.data.category._id);
      formData.set("price", product.data.price);
    });
  };
  useEffect(() => {
    init();
  }, []);
  let user;
  user = Authenticate();

  const handleChange = e => {
    e.persist();
    const value =
      e.target.name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(e.target.name, value);
    setValues({ ...values, [e.target.name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateProductById(match.params.productId, formData)
      .then(jax => {
        history.push("/shop");
      })
      .catch(err => console.log(err));
  };
  const newPostForm = (
    <form id="myform" onSubmit={handleSubmit} className="mb-3">
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={name}
          className={errors.name ? "form-control is-invalid" : "form-control"}
        />
        {errors.name ? (
          <div className="invalid-feedback">{errors.name}</div>
        ) : (
          ""
        )}
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange}
          name="description"
          value={description}
          className={
            errors.description ? "form-control is-invalid" : "form-control"
          }
        />
        {errors.description ? (
          <div className="invalid-feedback">{errors.description}</div>
        ) : (
          ""
        )}
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange}
          name="price"
          value={price}
          type="number"
          className={errors.price ? "form-control is-invalid" : "form-control"}
        />
        {errors.price ? (
          <div className="invalid-feedback">{errors.price}</div>
        ) : (
          ""
        )}
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select
          onChange={handleChange}
          value={category._id}
          className={
            errors.category ? "form-control is-invalid" : "form-control"
          }
          name="category"
        >
          {" "}
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option value={c._id} key={i}>
                {c.name}
              </option>
            ))}
        </select>
        {errors.category ? (
          <div className="invalid-feedback">{errors.category}</div>
        ) : (
          ""
        )}
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select
          onChange={handleChange}
          name="shipping"
          className="form-control"
          value={shipping ? 1 : 0}
        >
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          value={quantity}
          onChange={handleChange}
          name="quantity"
          type="number"
          className="form-control"
        />
      </div>

      <button className="btn btn-outline-primary">Update Product</button>
    </form>
  );
  const showSuccess = (
    <div className="alert alert-info">
      <h2>{createdProduct} is created!</h2>
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
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
