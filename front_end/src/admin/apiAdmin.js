import axios from "axios";

export const createCategory = name => {
  //   console.log(name);
  return axios.post("/api/category/create_category", name);
};
