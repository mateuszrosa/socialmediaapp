import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from "./Page.module.scss";
import NewPostBar from 'components/NewPostBar/NewPostBar';
import Post from 'components/Page/Post/Post'
import {fetchPosts as fetchPostsAuth} from 'actions'

const Page = ({userId, fetchPosts, posts}) => {

  useEffect(() => {
    fetchPosts();
  })

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
          {posts.map(({text, login, _id: id, likes}) => <Post text={text} login={login} key={id} id={id} likes={likes} />)}
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

Page.propTypes = {
  posts: PropTypes.array.isRequired,
}

Page.defaultProps = {
  posts: []
}

const mapStateToProps = ({userId, posts}) => ({
  userId,
  posts
})

const mapDispatchToState = (dispatch) => ({
  fetchPosts: () => dispatch(fetchPostsAuth())
});

export default connect(mapStateToProps, mapDispatchToState)(Page);
