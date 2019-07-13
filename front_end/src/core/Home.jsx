import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import Search from "./Search";
import { getProductByQuery } from "./apiCore";

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
      <Search />
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productByArrival &&
          productByArrival.map((product, i) => (
            <div key={i} className="col-4 mb-3">
              <Card product={product} />
            </div>
          ))}
      </div>
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productBySell &&
          productBySell.map((product, i) => (
            <div key={i} className="col-4 mb-3">
              <Card product={product} />
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default Home;
