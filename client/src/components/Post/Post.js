import React, { useState, useEffect } from 'react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPost, addLikes as addLikesAction, removePost as removePostAction, removeComment as removeCommentAction } from 'actions';
import { useLastLocation } from 'react-router-last-location';
import { NewPostBar } from 'components/NewPostBar/NewPostBar'
import ReactTooltip from 'react-tooltip';
import heart from 'assets/heart-thin.svg';
import blackheart from 'assets/heart-black.svg';
import comment from 'assets/comment-blog.svg';
import bin from 'assets/bin.svg';
import arrows from 'assets/expand.svg';
import edit from 'assets/edit.svg';
import close from 'assets/close-fat.svg'
import styles from './Post.module.scss';

export const Post = withRouter((props) => {

    const lastLocation = useLastLocation();
    const { date, id, likedBy = [], likes, login, text, detailPost, comments = [], commentId, commentPost, userId } = props;
    const [isClosed, setClosed] = useState(false);
    const [isEdited, setEdited] = useState(false);
    const [isEditedComment, setEditedComment] = useState(false);
    const dispatch = useDispatch();

    const { post = [], user, loggedUserId } =
        useSelector(({ userReducer, postsReducer }) => ({
            post: postsReducer.post,
            user: userReducer.user.login,
            loggedUserId: userReducer.user.userId
        }));

    useEffect(() => {
        if (detailPost && (id !== props.match.params.id || post.length === 0)) {
            dispatch(fetchPost(props.match.params.id));
        }
    }, []);

    const addLikes = () => {
        dispatch(addLikesAction(id, loggedUserId))
    }

    const editPost = () => {
        setEdited(!isEdited);
    }

    const editComment = () => {
        setEditedComment(!isEditedComment);
    }

    const removePost = () => {
        dispatch(removePostAction(id));
        if (detailPost) {
            setClosed(true)
        }
    }

    const removeComment = () => {
        dispatch(removeCommentAction(id, commentId));
    }

    if (isClosed) {
        return <Redirect to={lastLocation.pathname} />
    }

    const previous = lastLocation ? lastLocation.pathname : "/";

    return (
        <>
            {isEdited && <NewPostBar id={id} hideBar={editPost} edit />}
            {isEditedComment && <NewPostBar id={id} commentId={commentId} hideBar={editComment} comment />}
            <div className={styles.post}>
                <ReactTooltip />
                <div className={styles.img}></div>
                {commentPost ?
                    <div className={styles.body}>
                        <div className={styles.commentText}>
                            <h3>{login}</h3>
                            <span>{date}</span>
                            <p>{text}</p>
                            {(user === login || user === post.login) &&
                                <img onClick={removeComment} data-tip="close" src={close} alt="" />}
                            {user === login &&
                                <img data-tip="edit" onClick={editComment} src={edit} alt="" />}
                        </div>
                    </div>
                    :
                    <div className={styles.body}>
                        <div className={styles.text}>
                            {detailPost ?
                                <Link to={previous}>
                                    <img data-tip="close" src={close} alt="" />
                                </Link>
                                :
                                <Link to={`/post/details/${id}`}>
                                    <img data-tip="expand" src={arrows} alt="" />
                                </Link>
                            }
                            <h3><Link data-tip="open profile" to={`/profile/${userId}`}>{login}</Link></h3>
                            <span>{date}</span>
                            <p>{text}</p>
                        </div>
                        <div className={styles.interactions}>
                            <button>
                                {
                                    likedBy.includes(loggedUserId) ?
                                        <img data-tip="liked" src={blackheart} alt="" />
                                        :
                                        <img data-tip="add like" onClick={addLikes} src={heart} alt="" />
                                }
                            </button>
                            <span>{likes} Likes</span>
                            <button>
                                <img src={comment} alt="" />
                            </button>
                            <span>{comments.length} Comments</span>
                            {user === login &&
                                <button className={styles.actions}>
                                    <img data-tip="edit" onClick={editPost} src={edit} alt="" />
                                </button>}
                            {user === login &&
                                <button className={styles.actions}>
                                    <img data-tip="remove" onClick={removePost} src={bin} alt="" />
                                </button>}
                        </div>
                    </div>}
            </div>
        </>
    );
});