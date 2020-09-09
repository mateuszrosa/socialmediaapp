import React from "react";
import "./index.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Page from "../Page/Page";
import LoginPage from "../UserPage/LoginPage";
import Profile from "../Profile/Profile";
import Friends from "../Friends/Friends";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Root() {
  return (
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
        <Route path="/friends">
          <Friends />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default Root;
