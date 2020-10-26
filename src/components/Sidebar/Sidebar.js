import React from "react";
import styles from "./Sidebar.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "actions";

const Sidebar = () => {

  const dispatch = useDispatch();
  const { userId, login } = useSelector(state => ({
    userId: state.user.userId,
    login: state.user.login
  }))

  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <NavLink exact activeClassName={styles.active} to="/">home</NavLink>
        </li>
        <li>
          <NavLink exact activeClassName={styles.active} to={`/profile/${userId}`}>profile</NavLink>
        </li>
        <li>
          <NavLink exact activeClassName={styles.active} to="/friends">friends</NavLink>
        </li>
        <li>
          <NavLink exact activeClassName={styles.active} to="/messages">messages</NavLink>
        </li>
        <li>
          {userId ? (
            <NavLink onClick={() => dispatch(logout(userId, login))} to="/">
              log Out
            </NavLink>
          ) : (
              <NavLink to="/login">log In</NavLink>
            )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
