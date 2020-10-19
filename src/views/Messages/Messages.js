import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import Message from 'components/Message/Message';
import NewPostBar from 'components/NewPostBar/NewPostBar';
import styles from './Messages.module.scss';
import close from 'assets/close-fat.svg';
import message from 'assets/message.svg';

const Messages = () => {

    const {messages} = useSelector(state => ({
        messages: state.user.messages
    }))

    const [openMessage, setOpen] = useState(false);
    const sendMessage = (e) => {
        setOpen(!openMessage)
    }

    return (
        <div className={styles.container}>
            {openMessage && <NewPostBar message hideBar={sendMessage} />}
            <div className={styles.window}>
                <h1>Messages</h1>
                {messages.map(({senderId,senderName,text,date}) => {
                    return <Message
                                key={text}
                                senderId={senderId}
                                senderName={senderName}
                                text={text}
                                date={date}
                            />
                })}
            </div>
            <div onClick={sendMessage} className={styles.circle}></div>
        </div>
    );
}

export default Messages;