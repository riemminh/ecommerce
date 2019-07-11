import React, { useState, useEffect, Fragment } from "react";
import { getCategories } from "../admin/apiAdmin";

const Checkbox = ({ handleFilters }) => {
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    getCategories()
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleToggle = e => {
    e.persist();
    // tra ve -1 neu khong co neu co tra ve dung vi tri cua no trong mang
    const currentCategory = checked.indexOf(e.target.value);
    const checkedCategory = e.target.value;
    let newCheckedCategory = checked;
    if (currentCategory === -1) {
      newCheckedCategory.push(checkedCategory);
    } else {
      newCheckedCategory.splice(currentCategory, 1);
    }
    setChecked(newCheckedCategory);
    handleFilters(checked, "category");
  };

  return (
    <Fragment>
      {categories &&
        categories.map((c, i) => (
          <li key={i} className="list-unstyled">
            <input
              onChange={handleToggle}
              id={c._id}
              value={c._id}
              type="checkbox"
              className="form-check-input"
            />
            <label htmlFor={c._id} className="form-check-label">
              {c.name}
            </label>
          </li>
        ))}
    </Fragment>
  );
};

export default Checkbox;
