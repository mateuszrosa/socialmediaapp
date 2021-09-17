import React from 'react';
import ReactTooltip from 'react-tooltip';
import { useDispatch } from 'react-redux';
import { deleteMessage } from 'actions';
import { Link } from 'react-router-dom';
import styles from './Message.module.scss';
import close from 'assets/close-fat.svg';
import message from 'assets/message.svg';

export const Message = ({ id, sendMessage, senderId, senderName, date, text, to, sent }) => {


    const dispatch = useDispatch()
    const remove = () => {
        let box;
        if (sent) {
            box = "sent";
            dispatch(deleteMessage(id, senderName, box))
        } else {
            box = "inbox"
            dispatch(deleteMessage(id, to, box))
        }
    }

    return (
        <div className={styles.message}>
            <ReactTooltip />
            <img data-tip="remove message" onClick={remove} src={close} alt="" />
            {!sent && <img data-tip="respond" onClick={() => sendMessage(senderName)} src={message} alt="" />}
            <div className={styles.image}></div>
            <div className={styles.text}>
                {sent
                    ?
                    <h3>To: <span>{to}</span></h3>
                    :
                    <h3>From: <Link to={`profile/${senderId}`}>{senderName}</Link></h3>}
                <span>{date}</span>
                <p>{text}</p>
            </div>
        </div>);
}