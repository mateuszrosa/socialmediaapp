import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteMessage} from 'actions';
import {Link} from 'react-router-dom';
import styles from './Message.module.scss';
import close from 'assets/close-fat.svg';
import message from 'assets/message.svg';

const Message = ({id, sendMessage, senderId, senderName, date, text, to, sent}) => {


    const dispatch = useDispatch()
    const remove = () => {
        let box;
        if(sent) {
            console.log('sent');
            dispatch(deleteMessage(id, senderName, box="sent"))
        } else {
            console.log('inbox');
            dispatch(deleteMessage(id, to, box="inbox"))
        }
    }

    return ( 
    <div className={styles.message}>
        <img onClick={remove} src={close} alt="" />
        {!sent && <img onClick={() => sendMessage(senderName)} src={message} alt="" />}
        <div className={styles.image}></div>
        <div className={styles.text}>
            <h3>From: <Link to={`profile/${senderId}`}>{senderName}</Link></h3>
            <span>{date}</span>
            <p>{text}</p>
        </div>
    </div> );
}
 
export default Message;