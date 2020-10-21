import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages } from 'actions'
import Message from 'components/Message/Message';
import NewPostBar from 'components/NewPostBar/NewPostBar';
import styles from './Messages.module.scss';

const Messages = () => {

    const dispatch = useDispatch();
    const { user, messages = []
    } = useSelector(state => ({
        user: state.user,
        messages: state.messages || []
    }))

    useEffect(() => {
        dispatch(fetchMessages(user.login));
        setWhichBox(messages.filter(message => message.to === user.login))
    }, [])

    const [openMessage, setOpen] = useState(false);
    const [box, setWhichBox] = useState([]);

    const sendMessage = (e) => {
        setOpen(!openMessage)
    }
    const setBox = (e) => {
        let box;
        if (e.target.textContent === "Inbox") {
            box = messages.filter(message => message.to === user.login);
        } else {
            box = messages.filter(message => message.senderName === user.login);
        }
        setWhichBox(box)
    }

    // const inbox = messages.filter(message => message.to === user.login);
    // const sentBox = messages.filter(message => message.senderName === user.login);

    return (
        <div className={styles.container}>
            {openMessage && <NewPostBar message hideBar={sendMessage} />}
            <div className={styles.window}>
                <h1>Messages</h1>
                <button onClick={setBox} >Inbox</button>
                <button onClick={setBox} >Sent</button>
                {box.map(({ senderId, senderName, text, date, _id }) => {
                    return <Message
                        id={_id}
                        key={_id}
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