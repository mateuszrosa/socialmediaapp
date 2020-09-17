import React from "react";
import { connect } from "react-redux";
import { register as registerAuth } from "actions";
import { login as loginAuth } from "actions";
import { Link, Redirect } from "react-router-dom";
import styles from "./UserPages.module.scss";

const UserPage = ({ isLogged, loginAuth, userId }) => {
  if (userId) {
    return <Redirect to="/" />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1>Just Log In</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginAuth("mateusz.rosa", "123");
          }}
        >
          <label htmlFor="login">Login</label>
          <input type="text" name="login" id="login" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
          {isLogged ? (
            <input type="submit" value="Log In" />
          ) : (
            <input type="submit" value="Register" />
          )}
          {isLogged ? <Link to="/register">I want my account!</Link> : null}
        </form>
      </div>
    </div>
  );
};

const mapDispatchToState = (dispatch) => ({
  loginAuth: (login, password) => {
    dispatch(loginAuth(login, password));
  },
});

const mapToStateProps = ({ userId }) => ({
  userId,
});

export default connect(mapToStateProps, mapDispatchToState)(UserPage);
