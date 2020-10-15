import React, { useEffect } from 'react';
import Post from 'components/Post/Post';
import { fetchUserProfile, fetchUsersPosts } from 'actions';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import addFriend from 'assets/add.svg';
import styles from './Profile.module.scss';

const Profile = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserProfile(props.match.params.id))
        dispatch(fetchUsersPosts(props.match.params.id))
    }, [])

    const {user, posts=[]} = useSelector(state => ({
        user: state.user,
        posts: state.posts
    }));



    return (
        <div className={styles.container}>
            <div className={styles.window}>
                <div className={styles.profile}>
                    <div className={styles.img}></div>
                    <div className={styles.info}>
                        <h1>{user.login}</h1>
                        <span>{user.date}</span>
                        <h3>{user.email}</h3>
                    </div>
                    <img src={addFriend} alt="" />
                </div>
                <div className={styles.posts}>
                {posts.map(({text, login, _id: id, likes, likedBy, date, comments}) => 
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
                    />)}
            </div>
            </div>
        </div>
    );
}

export default withRouter(Profile);
