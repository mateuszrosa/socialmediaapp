import React, { useState, useEffect } from 'react';
import NewPostBar from 'components/NewPostBar/NewPostBar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Friend.module.scss';
import message from 'assets/message.svg';

const Friend = ({ userId }) => {

    const { users = [] } = useSelector(state => ({
        users: state.users
    }))

    const [user, setUser] = useState([]);
    const [openMessage, setOpen] = useState(false);

    useEffect(() => {
        let user = users.filter(user => user._id === userId);
        setUser(...user)
    }, [])

    const sendMessage = (e) => {
        setOpen(!openMessage)
    }

    const { login, email, date, friends = [] } = user;

    return (
        <>
            {openMessage && <NewPostBar message to={login} hideBar={sendMessage} />}
            <div className={styles.card}>
                <div className={styles.img}></div>
                <h1><Link to={`profile/${userId}`}>{login}</Link></h1>
                <h2>{email}</h2>
                <span>{date}</span>
                <span>Friends: {friends.length}</span>
                <img onClick={sendMessage} src={message} alt="" />
            </div>
        </>
    );
}

export default Friend;