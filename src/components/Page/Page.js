import React, {useState} from "react";
import styles from "./Page.module.scss";
import NewPostBar from 'components/NewPostBar/NewPostBar';

const Page = () => {

  const [isVisible, setVisible] = useState(false);

  const handlePostBar = () => {
    setVisible(!isVisible)
  }

  return (
    <div className={styles.main}>
      <div className={styles.window}>
        <div className={styles.form}>
          <input type="text" name="" id="" value="What you think about?" />
          <input onClick={handlePostBar} type="submit" value="Post it"/>
        </div>
        {isVisible && <NewPostBar click={handlePostBar}/>}
      </div>
    </div>
  );
};

export default Page;
