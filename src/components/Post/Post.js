import React, { useState, useEffect } from 'react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPost, addLikes as addLikesAction, removePost as removePostAction } from 'actions';
import NewPostBar from 'components/NewPostBar/NewPostBar'
import heart from 'assets/heart-thin.svg';
import blackheart from 'assets/heart-black.svg';
import comment from 'assets/comment-blog.svg';
import bin from 'assets/bin.svg';
import arrows from 'assets/expand.svg';
import edit from 'assets/edit.svg';
import close from 'assets/close-fat.svg'
import styles from './Post.module.scss';

const Post = (props) => {

    const { date, id, likedBy = [], likes, login, text, detailPost, comments=[], commentPost, userId } = props;
    const [isOpened, setOpened] = useState(false);
    const [isClosed, setClosed] = useState(false);
    const[isEdited, setEdited] = useState(false);
    const dispatch = useDispatch();
    
    const { post = [], user } =
        useSelector(state => ({
            post: state.post,
            user: state.user.login
        }));

    useEffect(() => {
        if (detailPost && (id !== props.match.params.id || post.length === 0)) {
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

    const editPost = () => {
        setEdited(!isEdited);
    }

    const removePost = () => {
        dispatch(removePostAction(id));
        setClosed(true);
    }

    if (isOpened) {
        return <Redirect to={`post/details/${id}`} />;
    } else if (isClosed) {
        return <Redirect to="/" />
    }

    return (
        <>
           {isEdited && <NewPostBar id={id} hideBar={editPost} edit/>}
            <div className={styles.post}>
                <div className={styles.img}></div>
                {commentPost ?
                    <div className={styles.body}>
                        <div className={styles.commentText}>
                            <h3>{login}</h3>
                            <span>{date}</span>
                            <p>{text}</p>
                        </div>
                    </div>
                    :
                    <div className={styles.body}>
                        <div className={styles.text}>
                            {detailPost ?
                                <img src={close} onClick={closePost} alt="" />
                                :
                                <img src={arrows} onClick={openPost} alt="" />
                            }
                            <h3><Link to={`profile/${userId}`}>{login}</Link></h3>
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
                            <span>{comments.length} Comments</span>
                            {user === login && 
                                <button className={styles.actions}>
                                    <img onClick={editPost} src={edit} alt="" />
                                </button>}
                            {user === login && 
                            <button className={styles.actions}>
                                <img onClick={removePost} src={bin} alt="" />
                            </button>}
                        </div>
                    </div>}
            </div>
        </>
    );
}

export default withRouter(Post);