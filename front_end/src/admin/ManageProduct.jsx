import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { getListProducts, deleteProductById } from "./apiAdmin";

const ManageProduct = () => {
  let ignore = false;
  const [products, setProducts] = useState([]);
  const handleGetProducts = () => {
    getListProducts()
      .then(result => {
        if (ignore === false) {
          setProducts(result.data);
        }
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    handleGetProducts();
    return () => (ignore = true);
  }, []);

  const handleDeleteProduct = productId => {
    deleteProductById(productId)
      .then(() => {
        handleGetProducts();
      })
      .catch(err => console.log(err));
  };
  return (
    <Layout
      title="Manage Products"
      description="Perform CRUD on products"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total {products.length} products</h2>
          <hr />
          <ul className="list-group">
            {products.map((p, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{p.name}</strong>
                <Link to={`/admin/product/update/${p._id}`}>
                  <span className="badge badge-warning badge-pill">Update</span>
                </Link>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteProduct(p._id)}
                  className="badge badge-danger badge-pill"
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default ManageProduct;
