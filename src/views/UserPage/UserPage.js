import React from "react";
import { connect } from "react-redux";
import { register as registerAuth } from "actions";
import { login as loginAuth } from "actions";
import { Link } from "react-router-dom";
import styles from "./UserPages.module.scss";
import { useFormik } from "formik";

const UserPage = ({ isLogged, loginAuth }) => {
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      registerLogin: "",
      registerPassword: "",
    },
    onSubmit: ({ login, password }) => {
      loginAuth(login, password);
    },
  });
  return (
    <div className={styles.container}>
      {isLogged && (
        <div className={styles.login}>
          <h1>Just Log In</h1>
          <form
            onSubmit={formik.handleSubmit}
            // action="http://localhost:3500/login" method="post"
          >
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
            <input type="submit" value="Log In" />
            <Link to="/register">I want my account!</Link>
          </form>
        </div>
      )}
      {!isLogged && (
        <div className={styles.login}>
          <h1>Register</h1>
          <form
            onSubmit={formik.handleSubmit}
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   register(login.value, password.value);
            //   login.value = "";
            //   password.value = "";
            // }}
          >
            <label htmlFor="login">Login</label>
            <input
              // ref={(node) => (login = node)}
              onChange={formik.handleChange}
              value={formik.values.registerLogin}
              type="text"
              name="login"
              id="login"
            />
            <label htmlFor="password">Password</label>
            <input
              // ref={(node) => (password = node)}
              onChange={formik.handleChange}
              value={formik.values.registerPassword}
              type="password"
              name="password"
              id="password"
            />
            <input type="submit" value="Register" />
          </form>
        </div>
      )}
    </div>
  );
};

const mapDispatchToState = (dispatch) => ({
  loginAuth: (login, password) => {
    dispatch(loginAuth(login, password));
  },
});

export default connect(null, mapDispatchToState)(UserPage);
