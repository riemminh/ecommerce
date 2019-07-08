import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import Menu from "./core/Menu";
import RouterApp from "./Router";

const App = () => (
  <Router>
    <Menu />
    <RouterApp />
  </Router>
);

export default App;
