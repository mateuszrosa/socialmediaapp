import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
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
        typeof senderName === "string" ? setSender(senderName) : setSender("");
    }

    const changeBox = e => {
        document.querySelectorAll('button').forEach(btn => {
            btn.style.textDecoration = "none";
            btn.style.fontWeight = "400";
        });
        if(e.target.textContent === "Inbox") {
            e.target.style.textDecoration = "underline";
            e.target.style.fontWeight = "800";
            setWhichBox(false)
        } else {
            setWhichBox(true);
            e.target.style.textDecoration = "underline";
            e.target.style.fontWeight = "800";
        }
    }

    return (
        <div className={styles.container}>
            <ReactTooltip />
            {openMessage && <NewPostBar to={sender} message hideBar={sendMessage} />}
            <div className={styles.window}>
                <h1>Messages</h1>
                <button onClick={changeBox}>Inbox</button>
                <button onClick={changeBox}>Sent</button>
                {box ? 
                sent.map(({ senderId, senderName, text, date, id, to }) => {
                    return <Message
                        id={id}
                        key={id}
                        senderId={senderId}
                        senderName={senderName}
                        text={text}
                        date={date}
                        sendMessage={sendMessage}
                        to={to}
                        sent
                    />
                }):
                inbox.map(({ senderId, senderName, text, date, id, to }) => {
                    return <Message
                        id={id}
                        key={id}
                        senderId={senderId}
                        senderName={senderName}
                        text={text}
                        date={date}
                        sendMessage={sendMessage}
                        to={to}
                    />
                })}
            </div>
            <div data-tip="write message" onClick={sendMessage} className={styles.circle}></div>
        </div>
    );
}

export default Messages;