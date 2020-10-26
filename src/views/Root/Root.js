import React from "react";
import {useSelector} from 'react-redux';
import "./index.css";
import { Provider } from "react-redux";
import { LastLocationProvider } from 'react-router-last-location';
import store from "store";
import Sidebar from "components/Sidebar/Sidebar";
import Header from "components/Header/Header";
import Page from "views/Page/Page";
import UserPage from "views/UserPage/UserPage";
import Profile from "views/Profile/Profile";
import Friends from "views/Friends/Friends";
import Messages from 'views/Messages/Messages';
import DetailsPost from 'views/DetailsPost/DetailsPost'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Root = () => {
  let isLogged = false;

  return ( 
    <Provider store={store}>
      <Router>
        <LastLocationProvider>
        <Sidebar />
        <Header />
        <Switch>
          <Route exact path="/">
            <Page />
          </Route>
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
          <Route path="/friends">
            <Friends />
          </Route>
          <Route path="/messages">
            <Messages />
          </Route>
          <Route path="/login">
            <UserPage isLogged={!isLogged} />
          </Route>
          <Route path="/register">
            <UserPage isLogged={isLogged} />
          </Route>
          <Route exact path="/post/details/:id">
            <DetailsPost />
          </Route>
        </Switch>
        </LastLocationProvider>
      </Router>
    </Provider>
  );
}

export default Root;
