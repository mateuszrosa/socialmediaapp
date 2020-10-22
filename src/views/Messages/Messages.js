import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages } from 'actions'
import Message from 'components/Message/Message';
import NewPostBar from 'components/NewPostBar/NewPostBar';
import styles from './Messages.module.scss';

const Messages = () => {

    const dispatch = useDispatch();

    const [openMessage, setOpen] = useState(false);
    const [box, setWhichBox] = useState([]);

    const { user, inbox = [], sent = []
    } = useSelector(state => ({
            user: state.user,
            inbox: state.user.inbox,
            sent: state.user.sent
        })
    );

    useEffect(() => {
        setWhichBox(inbox);
    }, [])

    const sendMessage = (e) => {
        setOpen(!openMessage)
    }

    const changeBox = e => {
        if(e.target.textContent === "Inbox") {
            setWhichBox(inbox)
        } else {
            setWhichBox(sent)
        }
    }

    return (
        <div className={styles.container}>
            {openMessage && <NewPostBar message hideBar={sendMessage} />}
            <div className={styles.window}>
                <h1>Messages</h1>
                <button onClick={changeBox}>Inbox</button>
                <button onClick={changeBox}>Sent</button>
                {box.map(({ senderId, senderName, text, date, id }) => {
                    return <Message
                        id={id}
                        key={id}
                        senderId={senderId}
                        senderName={senderName}
                        text={text}
                        date={date}
                        sendMessage={sendMessage}
                        inbox={inbox && true}
                    />
                })}
            </div>
            <div onClick={sendMessage} className={styles.circle}></div>
        </div>
    );
}

export default Messages;