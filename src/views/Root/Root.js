import React, { Component } from "react";
import "./index.css";
import { Provider } from "react-redux";
import store from "store";
import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import Page from "components/Page/Page";
import UserPage from "views/UserPage/UserPage";
import Profile from "components/Profile/Profile";
import Friends from "components/Friends/Friends";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class Root extends Component {
  state = {
    isLogged: false,
  };
  render() {
    const { isLogged } = this.state;
    return (
      <Provider store={store}>
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
              <UserPage isLogged={!isLogged} />
            </Route>
            <Route path="/register">
              <UserPage isLogged={isLogged} />
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default Root;
