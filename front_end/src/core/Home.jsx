import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getProductByQuery } from "../admin/apiAdmin";

const Home = () => {
  const [productBySell, setProductBySell] = useState();
  const [productByArrival, setProductByArrival] = useState();
  const queryProductBySell = () => {
    getProductByQuery("sold")
      .then(res => {
        setProductBySell(res.data);
      })
      .catch(err => console.log(err));
  };
  const queryProductByArrival = () => {
    getProductByQuery("createdAt")
      .then(res => {
        setProductByArrival(res.data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    queryProductBySell();
    queryProductByArrival();
  }, []);
  return (
    <Layout
      title="Home Page"
      description="Node React E-commerce App"
      className="container-fluid"
    >
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productByArrival &&
          productByArrival.map((product, i) => (
            <Card key={i} product={product} />
          ))}
      </div>
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productBySell &&
          productBySell.map((product, i) => <Card key={i} product={product} />)}
      </div>
    </Layout>
  );
};

export default Home;
