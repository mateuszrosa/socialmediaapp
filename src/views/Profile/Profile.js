import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from 'components/Post/Post'
import styles from './Profile.module.scss'

const Profile = () => {
    return (
        <div className={styles.container}>
            <div className={styles.window}>
                <div className={styles.profile}>
                    <div className={styles.img}></div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
