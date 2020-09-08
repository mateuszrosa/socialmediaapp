import React from "react";
import logo from "../assets/logo.png";
import styles from "./Sidebar.module.scss";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Router>
      <div className={styles.menu}>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/profile">profile</Link>
          </li>
          <li>
            <Link to="/friends">friends</Link>
          </li>
          <li>
            <Link to="/logout">log out</Link>
          </li>
        </ul>
      </div>
    </Router>
  );
};

export default Sidebar;
