import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { addToCart, removeItemCart } from "./cartHelper";

const Card = ({
  product,
  showViewProduct = true,
  showAddToCartButton = true,
  showRemoveProductButton = false,
  cartUpdate = false
}) => {
  const [count, setCount] = useState(1);
  const handleChange = productId => e => {
    e.persist();
    console.log(count);
    console.log(productId);
  };
  const showStock =
    product.quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock</span>
    );

  const showRemoveButton = showRemoveProductButton && (
    <button
      onClick={() => removeItemCart(product._id)}
      className="btn btn-outline-danger mt-2 mb-2"
    >
      Remove Product
    </button>
  );

  const showCartUpdateOptions = cartUpdate && (
    <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Adjust Quantity</span>
        </div>
        <input
          value={count}
          onChange={handleChange(product._id)}
          type="number"
          className="form-control"
        />
      </div>
    </div>
  );

  return (
    <div className="card">
      <div className="card-header name">{product && product.name}</div>
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
        <p className="lead mt-2">{product.description.substring(0, 100)}</p>
        <p className="black-10">${product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">
          Added on {moment(product.createdAt).fromNow()}
        </p>
        {showStock}
        <br />
        {showViewProduct ? (
          <Link to={`/product/${product._id}`}>
            <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
              View Product
            </button>
          </Link>
        ) : (
          ""
        )}

        {showAddToCartButton && (
          <button
            onClick={() => addToCart(product)}
            className="btn btn-outline-warning mt-2 mb-2"
          >
            Add to card
          </button>
        )}
        {showRemoveButton}
        {showCartUpdateOptions}
      </div>
    </div>
  );
};

export default Card;
