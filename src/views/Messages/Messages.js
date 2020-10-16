import React, { useState } from 'react';
import NewPostBar from 'components/NewPostBar/NewPostBar';
import styles from './Messages.module.scss';
import close from 'assets/close-fat.svg';
import message from 'assets/message.svg';

const Messages = () => {

    const [openMessage, setOpen] = useState(false);

    const sendMessage = (e) => {
        setOpen(!openMessage)
    }

    return (
        <div className={styles.container}>
            <div className={styles.window}>
                <h1>Messages</h1>
                <div className={styles.message}>
                    <img src={close} alt="" />
                    <img onClick={sendMessage} src={message} alt="" />
                    <div className={styles.image}></div>
                    <div className={styles.text}>
                        <h3>Nick</h3>
                        <span>data</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex id dolore tenetur earum, provident vel nesciunt odit expnam quod?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid praesentiibusdam.</p>
                    </div>
                </div>
                {openMessage && <NewPostBar message hideBar={sendMessage} />}
            </div>
            <div onClick={sendMessage} className={styles.circle}></div>
        </div>
    );
}

export default Messages;