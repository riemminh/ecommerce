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

// get list order
export const getListOrder = () => {
  return axios.get("/api/order/list_order");
};

// get status order
export const getStatusOrders = () => {
  return axios.get("/api/order/get_status_value");
};

// update status order
export const updateStatusOrder = ops => {
  return axios.put("/api/order/update_status", ops);
};

// get list product
export const getListProducts = sortBy => {
  return axios.get(`/api/product/list_product?limit=undefined`);
};

// delete product by id
export const deleteProductById = productId => {
  return axios.delete(`/api/product/delete_product/${productId}`);
};

// get product by id
export const getproductById = productId => {
  return axios.get(`/api/product/${productId}`);
};

// update product by id

export const updateProductById = (productId, newData) => {
  return axios.put(`/api/product/update_product/${productId}`, newData);
};
