import React from "react";
import styles from "./Page.module.scss";
import logo from "../../assets/logo.png";

const Page = () => {
  return (
    <div className={styles.main}>
      <div className={styles.window}>
        <div className={styles.text}>
          <h1>Welcome to SocialMediaApp</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            voluptatibus omnis alias sunt. Blanditiis enim esse dignissimos iure
            officia veritatis nulla alias nostrum reiciendis. Nemo ducimus error
            consequatur ab consectetur?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
            numquam minima ea consectetur earum quas ex incidunt aperiam ratione
            sequi minus, non doloremque deleniti ullam quo. Tenetur consequatur
            molestias rerum?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
