import React from "react";
import { connect } from "react-redux";
import { register as registerAuth } from "actions";
import { useFormik } from "formik";
import { login as loginAuth } from "actions";
import { Link, Redirect } from "react-router-dom";
import styles from "./UserPages.module.scss";

const UserPage = ({ isLogged, loginAuth, registerAuth, userId }) => {
  if (userId) {
    return <Redirect to="/" />;
  }
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    onSubmit: ({ login, password }) => {
      isLogged ? loginAuth(login, password) : registerAuth(login, password);
    },
  });
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        {isLogged ? <h1>Just Log In</h1> : <h1>Register</h1>}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="login">Login</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.login}
            type="text"
            name="login"
            id="login"
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            name="password"
            id="password"
          />
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
  registerAuth: (login, password) => {
    dispatch(registerAuth(login, password));
  },
});

const mapToStateProps = ({ userId }) => ({
  userId,
});

export default connect(mapToStateProps, mapDispatchToState)(UserPage);
