import axios from "axios";

export const createCategory = name => {
  //   console.log(name);
  return axios.post("/api/category/create_category", name);
};

// get list categories
export const getCategories = () => {
  return axios.get("/api/category/list_category");
};

// create new product
export const createProductFun = dataProduct => {
  return axios.post("/api/product/create_product", dataProduct);
};
