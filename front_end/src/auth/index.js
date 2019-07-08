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

export const Authenticate = () => {
  if (localStorage.userToken) {
    return JSON.parse(localStorage.getItem("userToken"));
  } else {
    return { isAuthenticated: false };
  }
};

export const signout = history => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userToken");
  setAuthToken(false);
  history.push("/");
};
