import React from 'react';
import styles from './Post.module.scss'

const Post = ({text, login}) => {
    return ( 
        <div className={styles.post}>
            <div className={styles.img}></div>
            <div className={styles.body}>
                <div className={styles.text}>
                    <h3>{login}</h3>
                    <span>date</span>
                    <p>{text}</p>
                </div>
                <div className={styles.interactions}>
                    <button>Like</button>
                    <button>Comments</button>
                </div>
            </div>
        </div>
     );
}
 
export default Post;