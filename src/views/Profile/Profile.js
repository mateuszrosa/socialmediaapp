import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import addFriend from 'assets/add.svg';
import Post from 'components/Post/Post';
import styles from './Profile.module.scss';

const Profile = () => {
    return (
        <div className={styles.container}>
            <div className={styles.window}>
                <div className={styles.profile}>
                    <div className={styles.img}></div>
                    <div className={styles.info}>
                        <h1>Imię i naziwsko</h1>
                        <span>data zalozenia konta</span>
                        <h3>adres email</h3>
                    </div>
                    <img src={addFriend} alt="" />
                </div>
                <div className={styles.posts}>
                    posty
            </div>
            </div>
        </div>
    );
}

export default Profile;
