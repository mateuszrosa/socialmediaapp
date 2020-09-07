import React from "react";
import styles from "./UserPages.module.scss";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1>Register</h1>
        <form action="">
          <label htmlFor="login">Login</label>
          <input type="text" name="login" id="login" />
          <label htmlFor="email">E-mail</label>
          <input type="email" name="email" id="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
          <input type="button" value="Register" />
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
