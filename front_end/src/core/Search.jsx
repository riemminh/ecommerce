import React, { useState, useEffect, Fragment } from "react";
import Card from "./Card";
import { getCategories, getFilterBySearchText } from "./apiCore";

const Search = () => {
  const [categories, setCategories] = useState("");
  const [results, setResults] = useState([]);
  const [size, setSize] = useState(0);
  const [dataSearch, setDataSearch] = useState({
    textsearch: "",
    category: "",
    searched: false
  });

  const init = () => {
    getCategories()
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = e => {
    e.persist();
    setDataSearch({
      ...dataSearch,
      [e.target.name]: e.target.value,
      searched: false
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    getFilterBySearchText(dataSearch)
      .then(res => {
        setSize(res.data.size);
        setDataSearch({ ...dataSearch, searched: true });
        setResults(res.data.products);
      })
      .catch(err => console.log(err));
  };

  const searchForm = (
    <form onSubmit={handleSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select
              onChange={handleChange}
              name="category"
              className="btn mr-2"
            >
              <option value="">All</option>
              {categories &&
                categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <input
            onChange={handleChange}
            name="textsearch"
            type="search"
            className="form-control"
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );
  const searchedProducts = (
    <div>
      <h2 className="mt-4 mb-4">
        {dataSearch.searched && (
          <Fragment>
            {size > 0 ? `Found ${size} products` : "No products found"}
          </Fragment>
        )}
      </h2>
      <div className="row">
        {results.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div className="row">
      <div className="container mb-3">{searchForm}</div>
      <div className="container-fluid mb-3">{searchedProducts}</div>
      {JSON.stringify(dataSearch)}
    </div>
  );
};

export default Search;
