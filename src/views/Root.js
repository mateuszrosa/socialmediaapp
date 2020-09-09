import React from "react";
import Sidebar from "./Sidebar";
import Page from "./Page";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

function Root() {
  return (
    <div className="container">
      <Router>
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Page />
          </Route>
          <Route path="/logout">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Root;
