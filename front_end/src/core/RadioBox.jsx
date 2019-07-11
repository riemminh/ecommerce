import React, { useState, useEffect, Fragment } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  const handleChange = e => {
    e.persist();
    handleFilters(e.target.value, "price");
  };
  return (
    <Fragment>
      {prices &&
        prices.map((p, i) => (
          <div key={i}>
            <input
              onChange={handleChange}
              id={p._id}
              value={p._id}
              type="radio"
              className="mr-2 ml-4"
              name={"price"}
            />
            <label htmlFor={p._id} className="form-check-label">
              {p.name}
            </label>
          </div>
        ))}
    </Fragment>
  );
};

export default RadioBox;
