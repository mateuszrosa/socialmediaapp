import React from "react";
import logo from "../assets/logo.png";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <ul>
          <li>
            <a href="">home</a>
          </li>
          <li>
            <a href="">profile</a>
          </li>
          <li>
            <a href="">friends</a>
          </li>
          <li>
            <a href="">log out</a>
          </li>
        </ul>
      </div>
      <div className={styles.main}>
        <header>
          <img src={logo} alt="" />
          <form action="">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Write here"
            />
            <input type="submit" value="Search" />
          </form>
        </header>
      </div>
    </div>
  );
};

export default MainPage;
