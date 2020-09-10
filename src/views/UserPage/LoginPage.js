import React, { Component } from "react";
import styles from "./UserPages.module.scss";
import axios from "axios";

class LoginPage extends Component {
  state = {};

  sendForm(e) {
    e.preventDefault();
    const login = e.target.login.value;
    const password = e.target.password.value;

    const params = new URLSearchParams({
      login,
      password,
    });

    const url = "http://localhost:3500/?" + params;

    axios
      .post(url)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    e.target.reset();
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.login}>
          <h1>Just Log In</h1>
          <form onSubmit={(e) => this.sendForm(e)}>
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
  }
}

// const LoginPage = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.login}>
//         <h1>Just Log In</h1>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault;
//           }}
//         >
//           <label htmlFor="login">Login</label>
//           <input type="text" name="login" id="login" />
//           <label htmlFor="password">Password</label>
//           <input type="password" name="password" id="password" />
//           <input type="submit" value="Log In" />
//           <input type="button" value="Register" />
//         </form>
//       </div>
//     </div>
//   );
// };

export default LoginPage;
