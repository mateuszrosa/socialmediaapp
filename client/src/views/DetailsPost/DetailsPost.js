import React from 'react';
import {fetchPosts, addComment } from 'actions';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from "formik";
import Post from 'components/Post/Post';
import styles from './DetailsPost.module.scss';

const DetailsPost = (props) => {

    const dispatch = useDispatch()
    const { post = [], userId, user} =
        useSelector(state => ({
            post: state.post,
            userId: state.user.userId,
            user: state.user.login
        }));

    const formik = useFormik({
        initialValues: {
            comment: "",
        },

        onSubmit: ({ comment }) => {
            if (comment) {
                dispatch(addComment(comment, id, userId, user));
                dispatch(fetchPosts());
                formik.resetForm();
            }
        }
    });

    const { login, date, text, likes, likedBy = [], _id: id, comments =[] } = post;

    return (
        <div className={styles.container}>
             <div className={styles.window}>
             <Post 
                text={text} 
                login={login} 
                key={id} 
                id={id} 
                likes={likes} 
                likedBy={likedBy} 
                date={date}  
                comments={comments} 
                detailPost
            />
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
                    <div className={styles.commentsList}>
                        {comments.map(({date,id: commentId,login,text,userId}) => <Post
                            text={text}
                            date={date} 
                            login={login} 
                            key={commentId}
                            commentId={commentId}
                            id={id}
                            commentPost
                        />)}
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default DetailsPost;