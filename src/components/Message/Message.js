import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Message.module.scss';
import close from 'assets/close-fat.svg';
import message from 'assets/message.svg';

const Message = ({id, sendMessage, senderId, senderName, date, text}) => {

    return ( 
    <div className={styles.message}>
        <img src={close} alt="" />
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