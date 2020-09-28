import React from 'react';
import styles from './Post.module.scss'

const Post = ({text, login}) => {
    return ( 
        <div className={styles.post}>
            <div className={styles.img}></div>
            <div className={styles.text}>
                <h1>{login}</h1>
                <span>date</span>
                <p>{text}</p>
            </div>
        </div>
     );
}
 
export default Post;