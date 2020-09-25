import React, {useState} from "react";
import {connect} from 'react-redux';
import styles from "./Page.module.scss";
import NewPostBar from 'components/NewPostBar/NewPostBar';

const Page = ({userId}) => {

  const [isVisible, setVisible] = useState(false);

  const handlePostBar = () => {
    if(userId) {
    setVisible(!isVisible)
    } else {
      console.log('You must log in');
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.window}>
        {userId ? 
        (<><div className={styles.form}>
          <input readOnly type="text" name="" id="" value="What you think about?" />
          <input onClick={handlePostBar} type="submit" value="Post it"/>
        </div>
        <div className={styles.posts}>posty</div>
        </>
        ) 
        : 
        (<div className={styles.text}>
          <h1> Welcome to SocialMediaApp </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.Consequatur
            voluptatibus omnis alias sunt.Blanditiis enim esse dignissimos iure
            officia veritatis nulla alias nostrum reiciendis.Nemo ducimus error
            consequatur ab consectetur ?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.Quisquam
            numquam minima ea consectetur earum quas ex incidunt aperiam ratione
            sequi minus, non doloremque deleniti ullam quo.Tenetur consequatur
            molestias rerum ?
          </p>
        </div>)}
        {isVisible && <NewPostBar hideBar={handlePostBar}/>}
      </div>
    </div>
  );
};

const mapToStateProps = ({userId}) => ({
  userId,
})

export default connect(mapToStateProps)(Page);
