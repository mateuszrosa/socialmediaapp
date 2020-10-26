import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Friend.module.scss';
import message from 'assets/message.svg';

const Friend = ({ userId }) => {

    const { users = [] } = useSelector(state => ({
        users: state.users
    }))

    const [user, setUser] = useState([]);

    useEffect(() => {
        let user = users.filter(user => user._id === userId);
        setUser(...user)
    }, [])

    return (
        <div className={styles.card}>
            <div className={styles.img}></div>
            <h1><Link to={`profile/${userId}`}>{user.login}</Link></h1>
            <h2>{user.email}</h2>
            <img src={message} alt="" />
        </div>
    );
}

export default Friend;