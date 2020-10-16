import React, { useEffect } from 'react';
import Post from 'components/Post/Post';
import { fetchUserProfile, fetchUsersPosts } from 'actions';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import addFriend from 'assets/add.svg';
import styles from './Profile.module.scss';

const Profile = (props) => {

    const userId = props.match.params.id

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserProfile(userId))
        dispatch(fetchUsersPosts(userId))
    }, [])

    const {user=[], posts=[]} = useSelector(state => ({
        user: state.profileUser,
        posts: state.posts
    }));

    const addToFriends = () => {
        console.log('object')
    }



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
                    <img onClick={addToFriends} src={addFriend} alt="" />
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
                        userId={userId}
                    />)}
            </div>
            </div>
        </div>
    );
}

export default withRouter(Profile);
