import React from 'react';
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import {deleteMessage} from 'actions';
import styles from './Message.module.scss';
import close from 'assets/close-fat.svg';
import message from 'assets/message.svg';

const Message = ({id, sendMessage, senderId, senderName, date, text, inbox}) => {

    const dispatch = useDispatch();

    const remove = () => {

        // dispatch(deleteMessage(id))
    }

    return ( 
    <div className={styles.message}>
        <img onClick={remove} src={close} alt="" />
        <img onClick={sendMessage} src={message} alt="" />
        <div className={styles.image}></div>
        <div className={styles.text}>
            <h3>From: <Link to={`profile/${senderId}`}>{senderName}</Link></h3>
            <span>{date}</span>
            <p>{text}</p>
        </div>
    </div> );
}
 
export default Message;