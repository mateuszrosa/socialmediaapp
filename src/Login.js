import React from "react";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1>Just Log In</h1>
        <form action="">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
          <input type="submit" value="LogIn" />
        </form>
      </div>
    </div>
  );
};

export default Login;
