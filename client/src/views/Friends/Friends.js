import React from 'react';
import { useSelector } from 'react-redux'
import { Friend } from 'components/Friend/Friend';
import styles from "./Friends.module.scss";

export const Friends = () => {

  const { friends = [] } = useSelector(({ userReducer }) => ({
    friends: userReducer.user.friends,
  }));

  return (
    <div className={styles.container}>
      {friends.map(friend => <Friend key={friend} userId={friend} />)}
    </div>
  );
};