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

// get product by query
export const getProductByQuery = sortBy => {
  return axios.get(
    `/api/product/list_product?sortBy=${sortBy}&order=desc&limit=4`
  );
};
