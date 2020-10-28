import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { register as registerAuth, login as loginAuth } from "actions";
import { useFormik } from "formik";
import { Link, Redirect } from "react-router-dom";
import styles from "./UserPages.module.scss";

const UserPage = ({ isLogged }) => {

  const dispatch = useDispatch();
  const { userId } = useSelector(state => ({
    userId: state.user.userId
  }))

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      email: ""
    },
    onSubmit: ({ login, password, email }) => {
      isLogged ? dispatch(loginAuth(login, password)) : dispatch(registerAuth(login, password, email));
    },
  });
  if (userId) {
    return <Redirect to="/" />;
  }
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
          {!isLogged &&
            <>
              <label htmlFor="email">E-mail</label>
              <input
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                name="email"
                id="email"
              />
            </>}
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

export default UserPage;
