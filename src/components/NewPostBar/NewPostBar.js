import React from 'react';
import styles from 'components/NewPostBar/NewPostBar.module.scss';
import close from 'assets/close-fat.svg';

const NewPostBar = ({click}) => {
    return ( 
        <div className={styles.bar}>
            <img onClick={click} src={close} alt=""/>
            <h1>Create Post</h1>    
            <form action="">
                <textarea name="" id="" cols="25" rows="5" value="What you think about?"></textarea>
                <input type="submit" value="Post"/>
            </form>
        </div>
     );
}
 
export default NewPostBar;