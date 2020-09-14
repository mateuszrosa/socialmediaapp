import React from "react";
import "./index.css";
import { Provider } from "react-redux";
import store from "store";
import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import Page from "views/Page/Page";
import LoginPage from "views/UserPage/LoginPage";
import RegisterPage from "views/UserPage/RegisterPage";
import Profile from "views/Profile/Profile";
import Friends from "views/Friends/Friends";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Root() {
  return (
    <Provider store={store}>
      <Router>
        <Sidebar />
        <Header />
        <Switch>
          <Route exact path="/">
            <Page />
          </Route>{" "}
          <Route path="/profile">
            <Profile />
          </Route>{" "}
          <Route path="/friends">
            <Friends />
          </Route>{" "}
          <Route path="/login">
            <LoginPage />
          </Route>{" "}
          <Route path="/register">
            <RegisterPage />
          </Route>{" "}
        </Switch>{" "}
      </Router>
    </Provider>
  );
}

export default Root;
