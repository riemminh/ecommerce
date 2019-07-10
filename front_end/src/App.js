import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import Menu from "./core/Menu";
import RouterApp from "./Router";
import { setAuthToken, Authenticate } from "./auth/index";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  // Check for expired token
  const currentTime = Date.now() / 1000;
  const { exp } = Authenticate();
  if (exp < currentTime) {
    // Logout user
    // Clear current Profile
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userToken");
    // Redirect to login
    window.location.href = "/signin";
  }
}

const App = () => (
  <Router>
    <Menu />
    <RouterApp />
  </Router>
);

export default App;
