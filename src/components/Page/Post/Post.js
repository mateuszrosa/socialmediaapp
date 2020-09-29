import React from 'react';
import {connect} from 'react-redux';
import {addLikes} from 'actions'
import heart from 'assets/heart-thin.svg';
import blackheart from 'assets/heart-black.svg';
import comment from 'assets/comment-blog.svg';
import styles from './Post.module.scss'

const Post = ({text, login, id, likes, addLikes}) => {
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
                    <img onClick={() => addLikes(id)} src={heart} alt=""/>
                    <span>{likes} Likes</span>
                    <img src={comment} alt=""/>
                    <span>Comments</span>
                </div>
            </div>
        </div>
     );
}

const mapStatetoProps = ({posts}) => ({
    posts
});

const mapDispatchToState = dispatch  => ({
    addLikes: (id) => dispatch(addLikes(id))
})

export default connect(mapStatetoProps,mapDispatchToState)(Post);