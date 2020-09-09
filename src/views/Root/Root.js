import React from "react";
import "./index.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Page from "../Page/Page";
import LoginPage from "../UserPage/LoginPage";
import RegisterPage from "../UserPage/RegisterPage";
import Profile from "../Profile/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Root() {
  return (
    <div className="container">
      <Router>
        <Sidebar />
        <Header />
        <Switch>
          <Route exact path="/">
            <Page />
          </Route>
          <Route path="/profile">
            <Profile />
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
