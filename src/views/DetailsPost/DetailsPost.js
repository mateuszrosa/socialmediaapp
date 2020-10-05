import React from 'react';
import styles from './DetailsPost.module.scss'

const DetailsPost = () => {
    return ( 
        <div className={styles.container}>
            <div className={styles.window}>
                <h1>Author</h1>
                <p>Text</p>
            </div>
        </div>
     );
}
 
export default DetailsPost;