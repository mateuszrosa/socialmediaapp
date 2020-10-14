import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux';
import styles from "./Page.module.scss";
import NewPostBar from 'components/NewPostBar/NewPostBar';
import Post from 'components/Post/Post';
import {fetchPosts, fetchUsers} from 'actions'

const Page = () => {

  const {userId, posts = []} =
    useSelector(state => ({
      userId: state.user.userId,
      posts: state.posts,
    }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers())
  },[]);

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
        <div className={styles.posts}>
          {posts.map(({text, login, _id: id, likes, likedBy, date, comments, userId}) => 
          <Post 
            text={text} 
            login={login} 
            key={id} 
            id={id} 
            likes={likes} 
            likedBy={likedBy} 
            date={date} 
            posts={posts}
            comments={comments}
            userId={userId}
          />)}
        </div>
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

export default Page;
