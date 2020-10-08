import React, { useState, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, fetchPost, addLikes as addLikesAction, removePost as removePostAction, addComment } from 'actions';
import heart from 'assets/heart-thin.svg';
import blackheart from 'assets/heart-black.svg';
import comment from 'assets/comment-blog.svg';
import bin from 'assets/bin.svg';
import arrows from 'assets/expand.svg';
import edit from 'assets/edit.svg';
import close from 'assets/close-fat.svg'
import styles from './Post.module.scss';

const Post = (props) => {
    const {date, id, likedBy, likes, login, posts, text, detailPost } = props;
    const [isOpened, setOpened] = useState(false);
    const [isClosed, setClosed] = useState(false);
    const dispatch = useDispatch();
    const { post = [], userId, user } =
        useSelector(state => ({
            post: state.post,
            userId: state.userId,
            user: state.login
        }));
    useEffect(() => {
        if(detailPost) {
            dispatch(fetchPost(props.match.params.id));
        }
    }, []);

    const openPost = () => {
        setOpened(true);
    }

    const closePost = () => {
        setClosed(true);
    }

    const addLikes = () => {
        dispatch(addLikesAction(id, userId))
    }

    const removePost = () => {
        dispatch(removePostAction(id));
        setClosed(true);
    }

    if (isOpened) {
        return <Redirect to={`post/details${id}`} />;
    } else if (isClosed) {
        return <Redirect to="/" />
    }

    return (
        <>
            <div className={styles.post}>
                <div className={styles.img}></div>
                <div className={styles.body}>
                    <div className={styles.text}>
                        {detailPost ? 
                            <img src={close} onClick={closePost}alt="" />
                            :
                            <img src={arrows} onClick={openPost} alt="" />
                        }
                        <h3>{login}</h3>
                        <span>{date}</span>
                        <p>{text}</p>
                    </div>
                    <div className={styles.interactions}>
                        <button>
                            {likedBy.includes(userId) ?
                                <img src={blackheart} alt="" />
                                :
                                <img onClick={addLikes} src={heart} alt="" />}
                        </button>
                        <span>{likes} Likes</span>
                        <button>
                            <img src={comment} alt="" />
                        </button>
                        <span>Comments</span>
                        {user === login && <button className={styles.actions}><img src={edit} alt="" /></button>}
                        {user === login && <button className={styles.actions}><img onClick={removePost} src={bin} alt="" /></button>}
                    </div> 
                </div>
            </div>
        </>
    );
}

export default withRouter(Post);