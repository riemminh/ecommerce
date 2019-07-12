import axios from "axios";

// get product by query
export const getProductByQuery = sortBy => {
  return axios.get(
    `/api/product/list_product?sortBy=${sortBy}&order=desc&limit=4`
  );
};

// get list categories
export const getCategories = () => {
  return axios.get("/api/category/list_category");
};

// get product by search
export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters
  };
  return axios.post("/api/product/list_by_search", data);
};
