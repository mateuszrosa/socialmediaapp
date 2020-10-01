import React from "react";
import styles from "./Sidebar.module.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "actions";

const Sidebar = ({ userId,login, logout }) => {
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
            <Link onClick={() => logout(userId,login)} to="/">
              log Out
            </Link>
          ) : (
            <Link to="/login">log In</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logout: (userId, login) => {
    dispatch(logout(userId,login));
  },
});

const mapToStateProps = ({ userId = null, login }) => {
  return { userId,login };
};

export default connect(mapToStateProps, mapDispatchToProps)(Sidebar);
