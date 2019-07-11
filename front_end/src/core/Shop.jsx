import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }

    setMyFilters(newFilters);
  };

  const handlePrice = value => {
    const data = prices;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
        // key nay la chi so index cua mang
      }
    }
    return array;
  };
  return (
    <Layout
      title="Shop Page"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by categories</h4>

          <ul>
            <Checkbox handleFilters={handleFilters} />
          </ul>

          <h4>Filter by price range</h4>
          <RadioBox prices={prices} handleFilters={handleFilters} />
          <div />
        </div>

        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          {JSON.stringify(myFilters)}
          <div className="row" />
          <hr />
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
