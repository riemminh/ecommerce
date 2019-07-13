import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import { getFilteredProducts } from "./apiCore";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
  const [limit, setLimit] = useState(4);
  const [skip, setSkip] = useState(0);
  const [testSkip, setTestSkip] = useState(0);
  const [resultFilter, setResultFilter] = useState([]);
  const [size, setSize] = useState();

  useEffect(() => {
    getFilteredProducts(skip, limit, myFilters.filters)
      .then(res => {
        setResultFilter(res.data.products);
        setSize(res.data.size);
      })
      .catch(err => console.log(err));
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    getProductByfilter(myFilters);
    setMyFilters(newFilters);
  };

  const getProductByfilter = myFilters => {
    getFilteredProducts(skip, limit, myFilters.filters)
      .then(res => {
        setResultFilter(res.data.products);
        setSize(res.data.size);
        setTestSkip(0);
      })
      .catch(err => console.log(err));
  };

  const loadMore = () => {
    let toSkip = testSkip + limit;

    getFilteredProducts(toSkip, limit, myFilters.filters)
      .then(res => {
        setResultFilter([...resultFilter, ...res.data.products]);
        setSize(res.data.size);
        setTestSkip(toSkip);
      })
      .catch(err => console.log(err));
    console.log(toSkip);
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
          <div>
            <RadioBox prices={prices} handleFilters={handleFilters} />
          </div>
          <div />
        </div>

        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          {/* {JSON.stringify(myFilters)} */}
          {/* {JSON.stringify(resultFilter)} */}
          <div className="row">
            {resultFilter &&
              resultFilter.map((product, i) => (
                <div key={i} className="col-4 mb-3">
                  <Card product={product} />
                </div>
              ))}
          </div>
          <hr />
          {size && size >= limit ? (
            <button onClick={() => loadMore()} className="btn btn-info">
              Loar More
            </button>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
