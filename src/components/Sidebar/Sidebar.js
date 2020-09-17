import React from "react";
import { connect } from "react-redux";
import styles from "./Sidebar.module.scss";
import { Link } from "react-router-dom";

const Sidebar = ({ userId }) => {
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
          {userId ? (
            <Link to="/logout">log Out</Link>
          ) : (
            <Link to="/login">log In</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

const mapToStateProps = ({ userId }) => ({
  userId,
});

export default connect(mapToStateProps)(Sidebar);
