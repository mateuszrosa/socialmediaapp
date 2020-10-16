import React from "react";
import styles from "./Sidebar.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to={`/profile/${userId}`}>profile</Link>
        </li>
        <li>
          <Link to="/friends">friends</Link>
        </li>
        <li>
          <Link to="/messages">messages</Link>
        </li>
        <li>
          {userId ? (
            <Link onClick={() => dispatch(logout(userId, login))} to="/">
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

// const mapDispatchToProps = (dispatch) => ({
//   logout: (userId, login) => {
//     dispatch(logout(userId,login));
//   },
// });

// const mapToStateProps = ({ userId = null, login }) => {
//   return { userId,login };
// };

export default Sidebar;
