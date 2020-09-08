import React from "react";
import Sidebar from "./Sidebar";
import Page from "./Page";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

function Root() {
  return (
    <div className="container">
      <Sidebar />
      <Page />
    </div>
  );
}

export default Root;
