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
          <form action="">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Write here"
            />
            <input type="submit" value="Search" />
          </form>
          <img src={logo} alt="" />
        </header>
        <div className={styles.window}>
          <div className={styles.text}>
            <h1>Welcome to SocialMediaApp</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur voluptatibus omnis alias sunt. Blanditiis enim esse
              dignissimos iure officia veritatis nulla alias nostrum reiciendis.
              Nemo ducimus error consequatur ab consectetur?
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
              numquam minima ea consectetur earum quas ex incidunt aperiam
              ratione sequi minus, non doloremque deleniti ullam quo. Tenetur
              consequatur molestias rerum?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
