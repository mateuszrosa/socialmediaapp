import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { register as registerAuth, login as loginAuth } from "actions";
import { useFormik } from "formik";
import { Link, Redirect } from "react-router-dom";
import styles from "./UserPages.module.scss";

const UserPage = ({ isLogged }) => {

  const dispatch = useDispatch();
  const { userId, error } = useSelector(state => ({
    userId: state.user.userId,
    error: state.error
  }));

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      email: ""
    },
    onSubmit: ({ login, password, email }, { resetForm }) => {
      isLogged ? dispatch(loginAuth(login, password)) : dispatch(registerAuth(login, password, email));
      resetForm()
    },
  });
  if (userId) {
    return <Redirect to="/" />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        {isLogged ? <h1>Just Log In</h1> : <h1>Register</h1>}
        {error && <h3>{error}</h3>}
        <form onSubmit={formik.handleSubmit}>
          {isLogged ?
            <label htmlFor="login">Login</label>
            :
            <label className={formik.errors.login && styles.error} htmlFor="login">
              {formik.errors.login ? formik.errors.login : "Login"}
            </label>}
          <input
            onChange={formik.handleChange}
            value={formik.values.login}
            type="text"
            name="login"
            id="login"
            autoComplete="off"
          />
          {!isLogged &&
            <>
              {isLogged ?
                <label htmlFor="email">Email</label>
                :
                <label className={formik.errors.email && styles.error} htmlFor="email">
                  {formik.errors.email ? formik.errors.email : "Email"}
                </label>}
              <input
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                name="email"
                id="email"
                autoComplete="off"
              />
            </>}
          <label className={formik.errors.password && styles.error} htmlFor="password">
            {formik.errors.password ? formik.errors.password : "Password"}
          </label>
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
