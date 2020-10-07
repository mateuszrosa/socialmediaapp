import React, { useState, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { fetchPosts, fetchPost, addLikes, removePost, addComment } from 'actions';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from "formik";
import face from 'assets/male.svg';
import comment from 'assets/comment-blog.svg';
import heart from 'assets/heart-thin.svg';
import blackheart from 'assets/heart-black.svg';
import bin from 'assets/bin.svg';
import close from 'assets/close-fat.svg'
import styles from './DetailsPost.module.scss';

const DetailsPost = (props) => {

    const dispatch = useDispatch()
    const { post = [], userId, user } =
        useSelector(state => ({
            post: state.post,
            userId: state.userId,
            user: state.login
        }));
    useEffect(() => {
        const id = props.match.params.id;
        dispatch(fetchPost(id));
        dispatch(fetchPosts());
    }, []);
    const { login, date, text, likedBy = [], _id: id } = post;
    const [removed, setRemoved] = useState(false);

    const toRemovePost = () => {
        dispatch(removePost(id))
        setRemoved(true);
    }

    const toClosePost = () => {
        setRemoved(true);
    }

    const isLiked = () => {
        dispatch(addLikes(id, userId))
    }

    const formik = useFormik({
        initialValues: {
            comment: "",
        },

        onSubmit: ({ comment }) => {
            if (comment) {
                dispatch(addComment(comment, id, userId, login))
            }
        }
    });

    if (removed) {
        return <Redirect to="/" />
    }

    return (
        <div className={styles.container}>
            <div className={styles.window}>
                <div className={styles.user}>
                    <div className={styles.image}>
                        <img src={face} alt="" />
                    </div>
                    <div className={styles.userinfo}>
                        <div className={styles.text}>
                            <img onClick={toClosePost} src={close} alt="" />
                            <h1>{login}</h1>
                            <span>{date}</span>
                            <p>{text}</p>
                        </div>
                        <div className={styles.interactions}>
                            <button>
                                {likedBy.includes(userId) ?
                                    <img src={blackheart} alt="" />
                                    :
                                    <img onClick={() => isLiked()} src={heart} alt="" />}
                            </button>
                            <span>{post.likes} Likes</span>
                            <button>
                                <img src={comment} alt="" />
                            </button>
                            <span>Comments</span>
                            {user === login && <button><img onClick={toRemovePost} src={bin} alt="" /></button>}
                        </div>
                    </div>
                </div>
                <div className={styles.comments}>
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="comment">Write your comment</label>
                        <input
                            onChange={formik.handleChange}
                            value={formik.values.comment}
                            type="text"
                            name="comment"
                            id="comment"
                        />
                        <input type="submit" value="Send" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withRouter(DetailsPost);