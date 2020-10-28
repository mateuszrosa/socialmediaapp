import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import styles from "./Page.module.scss";
import NewPostBar from 'components/NewPostBar/NewPostBar';
import Post from 'components/Post/Post';
import {fetchPosts, fetchUsers} from 'actions'
import { Redirect } from "react-router-dom";

const Page = () => {

  const {userId, posts = []} =
    useSelector(state => ({
      userId: state.user.userId,
      posts: state.posts,
    }));

  const dispatch = useDispatch();

  useEffect(() => {
    if(userId) {
      dispatch(fetchPosts());
      dispatch(fetchUsers())
    }
  },[]);

  const [isVisible, setVisible] = useState(false);

  const handlePostBar = () => {
    if(userId) {
    setVisible(!isVisible)
    } else {
      console.log('You must log in');
    }
  }

  if(!userId) {
   return <Redirect to="/login" />
  }

  return (
      <div className={styles.window}>
        {!userId && <Redirect to="/login" />}
        <div className={styles.form}>
          <input onClick={handlePostBar} readOnly type="text" name="" id="" value="What you think about?" />
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
        {isVisible && <NewPostBar post hideBar={handlePostBar}/>}
      </div>
  );
};

export default Page;
