import React, { useState, useEffect } from 'react';
import Post from 'components/Post/Post';
import NewPostBar from 'components/NewPostBar/NewPostBar';
import ReactTooltip from 'react-tooltip';
import { fetchUserProfile, fetchUsersPosts, addToFriends as addToFriendsAction } from 'actions';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import addFriend from 'assets/add.svg';
import message from 'assets/message.svg'
import styles from './Profile.module.scss';

const Profile = (props) => {

    const dispatch = useDispatch();
    let userId = props.match.params.id;
    const { user = [], profileUser = [], posts = [] } = useSelector(({ userReducer, testReducer }) => ({
        user: userReducer.user,
        profileUser: userReducer.profileUser,
        posts: testReducer.posts
    }));
    const [openMessage, setOpen] = useState(false);
    const sendMessage = (e) => {
        setOpen(!openMessage)
    }

    useEffect(() => {
        dispatch(fetchUserProfile(userId))
        dispatch(fetchUsersPosts(userId))
    }, [userId])

    const addToFriends = () => {
        if (!profileUser.friends.includes(user.userId)) {
            dispatch(addToFriendsAction(user.userId, profileUser._id))
        }
    }

    const { login, date, email, friends = [] } = profileUser;

    return (
        <div className={styles.container}>
            {openMessage && <NewPostBar to={profileUser.login} message hideBar={sendMessage} />}
            <div className={styles.window}>
                <div className={styles.profile}>
                    <div className={styles.img}></div>
                    <div className={styles.info}>
                        <h1>{login}</h1>
                        <span>{date}</span>
                        <h3>{email}</h3>
                        <p>Friends: <span>{friends.length}</span></p>
                    </div>
                    {user.login !== login &&
                        <>
                            <ReactTooltip />
                            <img
                                data-tip="add to friends"
                                className={friends.includes(user.userId) ? styles.friends : null}
                                onClick={addToFriends}
                                src={addFriend}
                                alt=""
                            />
                        </>}
                    {friends.includes(user.userId) &&
                        <>
                            <ReactTooltip />
                            <img
                                data-tip="send message"
                                onClick={sendMessage}
                                src={message}
                                alt=""
                            />
                        </>}
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
