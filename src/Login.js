import React from "react";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1>Just Log In</h1>
        <form action="">
          <label htmlFor="login">Login</label>
          <input type="text" name="login" id="login" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
          <input type="submit" value="Log In" />
          <input type="button" value="Register" />
        </form>
      </div>
    </div>
  );
};

export default Login;
