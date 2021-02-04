import React, { useState, useEffect } from 'react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPost, addLikes as addLikesAction, removePost as removePostAction } from 'actions';
import { useLastLocation } from 'react-router-last-location';
import NewPostBar from 'components/NewPostBar/NewPostBar'
import ReactTooltip from 'react-tooltip';
import heart from 'assets/heart-thin.svg';
import blackheart from 'assets/heart-black.svg';
import comment from 'assets/comment-blog.svg';
import bin from 'assets/bin.svg';
import arrows from 'assets/expand.svg';
import edit from 'assets/edit.svg';
import close from 'assets/close-fat.svg'
import styles from './Post.module.scss';

const Post = (props) => {

    const lastLocation = useLastLocation();
    const { date, id, likedBy = [], likes, login, text, detailPost, comments=[], commentPost, userId } = props;
    const [isOpened, setOpened] = useState(false);
    const [isClosed, setClosed] = useState(false);
    const[isEdited, setEdited] = useState(false);
    const dispatch = useDispatch();
    const { post = [], user, loggedUserId } =
        useSelector(state => ({
            post: state.post,
            user: state.user.login,
            loggedUserId: state.user.userId
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
        dispatch(addLikesAction(id, loggedUserId))
    }

    const editPost = () => {
        setEdited(!isEdited);
    }

    const removePost = () => {
        dispatch(removePostAction(id));
        if(detailPost) {
            setClosed(true)
        }
    }

    if (isOpened) {
       return <Redirect to={`/post/details/${id}`} />;
    } else if (isClosed) {
      return <Redirect to={lastLocation.pathname} />
    }

    return (
        <>
           {isEdited && <NewPostBar id={id} hideBar={editPost} edit/>}
            <div className={styles.post}>
                <ReactTooltip />
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
                                <img data-tip="close" src={close} onClick={closePost} alt="" />
                                :
                                <img data-tip="expand" src={arrows} onClick={openPost} alt="" />
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
}

export default withRouter(Post);