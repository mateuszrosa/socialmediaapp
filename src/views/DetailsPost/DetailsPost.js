import React from 'react';
import {withRouter} from 'react-router-dom'
import styles from './DetailsPost.module.scss'

const DetailsPost = (props) => {
console.log(props.match.params.id);

    return ( 
        <div className={styles.container}>
            <div className={styles.window}>
                <h1>Author</h1>
                <p>Text</p>
            </div>
        </div>
     );
}
 
export default withRouter(DetailsPost);