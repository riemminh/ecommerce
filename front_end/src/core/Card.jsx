import React from "react";
import { Link } from "react-router-dom";

const Card = ({ product }) => {
  console.log(process.env);
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header">{product && product.name}</div>
        <div className="card-body">
          <div className="product-img">
            <img
              src={
                product
                  ? `/api/product/images?path=${product && product.photo.path}`
                  : ""
              }
              alt={product && product.name}
              className="mb-3"
              alt="no-image"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          </div>
          <p>{product && product.description}</p>
          <p>${product && product.price}</p>
          <Link to="/">
            <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
              View Product
            </button>
          </Link>
          <button className="btn btn-outline-warning mt-2 mb-2">
            Add to card
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
