import axios from "axios";

export const signup = userData => {
  return axios.post("/api/users/register", userData);
};
export const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};
export const singin = userData => {
  return axios.post("/api/users/login", userData);
};
