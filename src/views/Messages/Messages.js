import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Message from 'components/Message/Message';
import NewPostBar from 'components/NewPostBar/NewPostBar';
import styles from './Messages.module.scss';

const Messages = () => {

    const { inbox = [], sent = []
    } = useSelector(state => ({
            inbox: state.user.inbox,
            sent: state.user.sent
        })
    );


    const [openMessage, setOpen] = useState(false);
    const [box, setWhichBox] = useState(false);
    const [sender, setSender] = useState("");

    const sendMessage = (senderName) => {
        setOpen(!openMessage)
        typeof senderName === "string" && setSender(senderName)
    }

    const changeBox = e => {
        if(e.target.textContent === "Inbox") {
            setWhichBox(false)
        } else {
            setWhichBox(true)
        }
    }

    return (
        <div className={styles.container}>
            {openMessage && <NewPostBar to={sender} message hideBar={sendMessage} />}
            <div className={styles.window}>
                <h1>Messages</h1>
                <button onClick={changeBox}>Inbox</button>
                <button onClick={changeBox}>Sent</button>
                {box ? 
                sent.map(({ senderId, senderName, text, date, id }) => {
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
                }):
                inbox.map(({ senderId, senderName, text, date, id }) => {
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