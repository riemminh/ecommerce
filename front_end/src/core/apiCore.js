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

// get prouct by search text
export const getFilterBySearchText = dataSearch => {
  return axios.post("/api/product/search_text", dataSearch);
};

// get product by Id
export const getProductById = productId => {
  return axios.get(`/api/product/${productId}`);
};

// get product by rellated
export const getProductByRelated = (productId, categoryId) => {
  return axios.get(`/api/product/related_product/${productId}/${categoryId}`);
};

// get client token
export const getClientToken = () => {
  return axios.get("/api/braintree/getToken");
};
// process payment
export const processPayment = paymentData => {
  return axios.post("/api/braintree/payment", paymentData);
};
