import React from 'react';
import {connect} from 'react-redux';
import {addLikes} from 'actions'
import heart from 'assets/heart-thin.svg';
import blackheart from 'assets/heart-black.svg';
import comment from 'assets/comment-blog.svg';
import styles from './Post.module.scss'

const Post = ({text, login, id, likes, addLikes, userId, likedBy}) => {
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
                    <button>
                        {likedBy.includes(userId) ? 
                        <img src={blackheart} alt=""/> 
                        : 
                        <img onClick={(e) => addLikes(id, userId)} src={heart} alt=""/>}
                    </button>
                    <span>{likes} Likes</span>
                    <button>
                        <img src={comment} alt=""/>
                    </button>
                    <span>Comments</span>
                </div>
            </div>
        </div>
     );
}

const mapStatetoProps = ({posts, userId}) => ({
    posts,
    userId
});

const mapDispatchToState = dispatch  => ({
    addLikes: (id, userId) => dispatch(addLikes(id, userId))
})

export default connect(mapStatetoProps,mapDispatchToState)(Post);