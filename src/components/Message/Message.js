import React from 'react';
import {useDispatch} from 'react-redux';
import {removeMessage} from 'actions';
import styles from './Message.module.scss';
import close from 'assets/close-fat.svg';
import message from 'assets/message.svg';

const Message = ({id, sendMessage, senderName, date, text}) => {

    const dispatch = useDispatch();


    return ( 
    <div className={styles.message}>
        <img src={close} alt="" />
        <img onClick={sendMessage} src={message} alt="" />
        <div className={styles.image}></div>
        <div className={styles.text}>
            <h3>{senderName}</h3>
            <span>{date}</span>
            <p>{text}</p>
        </div>
    </div> );
}
 
export default Message;