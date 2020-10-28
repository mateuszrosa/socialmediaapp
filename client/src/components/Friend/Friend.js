import React, { useState, useEffect } from 'react';
import NewPostBar from 'components/NewPostBar/NewPostBar';
import ReactTooltip from 'react-tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFriends } from 'actions';
import { Link } from 'react-router-dom';
import styles from './Friend.module.scss';
import message from 'assets/message.svg';
import close from 'assets/close-fat.svg';

const Friend = ({ userId }) => {

    const dispatch = useDispatch()

    const { users = [], user } = useSelector(state => ({
        users: state.users,
        user: state.user
    }))

    const [friend, setFriend] = useState([]);
    const [openMessage, setOpen] = useState(false);

    useEffect(() => {
        let user = users.filter(user => user._id === userId);
        setFriend(...user)
    }, [])

    const sendMessage = () => {
        setOpen(!openMessage)
    }

    const remove = () => {
        dispatch(removeFromFriends(user.userId, friend._id))
    }

    const { login, email, date, friends = [] } = friend;

    return (
        <>
            {openMessage && <NewPostBar message to={login} hideBar={sendMessage} />}
            <ReactTooltip />
            <div className={styles.card}>
                <div className={styles.container}>
                    <div className={styles.img}></div>
                    <div className={styles.text}>
                        <h1><Link to={`profile/${userId}`}>{login}</Link></h1>
                        <h3>{email}</h3>
                        <span>{date}</span>
                        <span>Friends: {friends.length}</span>
                    </div>
                </div>
                <div className={styles.interactions}>
                    <img data-tip="send message" onClick={sendMessage} src={message} alt="" />
                    <img data-tip="remove from friends" onClick={remove} src={close} alt="" />
                </div>
            </div>
        </>
    );
}

export default Friend;