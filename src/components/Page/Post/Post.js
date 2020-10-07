import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLikes, removePost } from 'actions'
import heart from 'assets/heart-thin.svg';
import blackheart from 'assets/heart-black.svg';
import comment from 'assets/comment-blog.svg';
import bin from 'assets/bin.svg';
import arrows from 'assets/expand.svg';
import edit from 'assets/edit.svg';
import styles from './Post.module.scss';

const Post = ({ text, login, id, likes, addLikes, userId, likedBy, date, user, removePost }) => {
    const [isOpened, setOpened] = useState(false);

    const openPost = () => {
        setOpened(true);
    }

    if (isOpened) {
        return <Redirect to={`post/details${id}`} />;
    }

    return (
        <>
            <div className={styles.post}>
                <div className={styles.img}></div>
                <div className={styles.body}>
                    <div className={styles.text}>
                        <img onClick={openPost} src={arrows} alt="" />
                        <h3>{login}</h3>
                        <span>{date}</span>
                        <p>{text}</p>
                    </div>
                    <div className={styles.interactions}>
                        <button>
                            {likedBy.includes(userId) ?
                                <img src={blackheart} alt="" />
                                :
                                <img onClick={(e) => addLikes(id, userId)} src={heart} alt="" />}
                        </button>
                        <span>{likes} Likes</span>
                        <button>
                            <img src={comment} alt="" />
                        </button>
                        <span>Comments</span>
                        {user === login && <button className={styles.actions}><img src={edit} alt="" /></button>}
                        {user === login && <button className={styles.actions}><img onClick={() => removePost(id)} src={bin} alt="" /></button>}
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStatetoProps = ({ posts, userId, login }) => ({
    posts,
    userId,
    user: login
});

const mapDispatchToState = dispatch => ({
    addLikes: (id, userId) => dispatch(addLikes(id, userId)),
    removePost: (id) => dispatch(removePost(id))
})

export default connect(mapStatetoProps, mapDispatchToState)(Post);