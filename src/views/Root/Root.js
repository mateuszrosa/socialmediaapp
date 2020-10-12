import React from "react";
import "./index.css";
import { Provider } from "react-redux";
import store from "store";
import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import Page from "components/Page/Page";
import UserPage from "views/UserPage/UserPage";
import Profile from "views/Profile/Profile";
import Friends from "components/Friends/Friends";
import DetailsPost from 'views/DetailsPost/DetailsPost'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Root = () => {
  let isLogged = false;

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
          <Route exact path="/post/details:id">
            <DetailsPost />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default Root;
