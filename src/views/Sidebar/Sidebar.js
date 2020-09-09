import React from "react";
import styles from "./Sidebar.module.scss";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Sidebar = () => {
  return (
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
          <Link to="/logout">Log In</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
