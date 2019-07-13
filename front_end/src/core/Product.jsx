import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getProductById, getProductByRelated } from "./apiCore";

const Product = ({ match }) => {
  const [product, setProduct] = useState([]);
  const [productRelated, setProductRelated] = useState([]);

  const init = () => {
    getProductById(match.params.id)
      .then(res => {
        setProduct(res.data);

        getProductByRelated(res.data._id, res.data.category._id)
          .then(related => {
            setProductRelated(related.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    init();
  }, [match]);
  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProduct={false} />
          )}
        </div>

        <div className="col-4">
          <h4>Related products</h4>
          {productRelated.map((p, i) => (
            <div key={i} className="mb-3">
              <Card product={p} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
