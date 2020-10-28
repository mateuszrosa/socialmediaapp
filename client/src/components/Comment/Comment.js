import React from 'react';
import styles from './Comment.module.scss';
import face from 'assets/male.svg';

const Comment = () => {
    return (
        <div className={styles.comment}>
            <div className={styles.image}>
                <img src={face} alt="" />
            </div>
            <div className={styles.textBox}></div>
        </div>
    );
}

export default Comment;