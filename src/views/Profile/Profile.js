import React, { useEffect } from 'react';
import Post from 'components/Post/Post';
import { fetchUserProfile } from 'actions';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import addFriend from 'assets/add.svg';
import styles from './Profile.module.scss';

const Profile = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserProfile(props.match.params.id))
    }, [])


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

export default withRouter(Profile);
