import React, { useEffect } from 'react';
import Post from 'components/Post/Post';
import { fetchUserProfile, fetchUsersPosts, addToFriends as addToFriendsAction } from 'actions';
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

    const { user = [], profileUser = [], posts = [] } = useSelector(state => ({
        user: state.user,
        profileUser: state.profileUser,
        posts: state.posts
    }));

    const addToFriends = () => {
        if (!profileUser.friends.includes(user.userId)) {
            dispatch(addToFriendsAction(profileUser._id, user.userId))
        }
    }

    const { login, date, email, friends = [] } = profileUser;

    return (
        <div className={styles.container}>
            <div className={styles.window}>
                <div className={styles.profile}>
                    <div className={styles.img}></div>
                    <div className={styles.info}>
                        <h1>{login}</h1>
                        <span>{date}</span>
                        <h3>{email}</h3>
                        <p>Friends: <span>{friends.length}</span></p>
                    </div>
                    {user.login !== login && <img className={friends.includes(user.userId) ? styles.friends : null} onClick={addToFriends} src={addFriend} alt="" />}
                </div>
                <div className={styles.posts}>
                    {posts.map(({ text, login, _id: id, likes, likedBy, date, comments }) =>
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
