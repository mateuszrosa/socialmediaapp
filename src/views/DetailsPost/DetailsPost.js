import React, { useState, useEffect } from 'react';
import {fetchPosts, addComment } from 'actions';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from "formik";
import Post from 'components/Post/Post';
import Comment from 'components/Comment/Comment'
import face from 'assets/male.svg';
import comment from 'assets/comment-blog.svg';
import heart from 'assets/heart-thin.svg';
import blackheart from 'assets/heart-black.svg';
import bin from 'assets/bin.svg';
import close from 'assets/close-fat.svg'
import styles from './DetailsPost.module.scss';

const DetailsPost = (props) => {

    const dispatch = useDispatch()
    const { post = [], userId} =
        useSelector(state => ({
            post: state.post,
            userId: state.userId,
        }));

    const formik = useFormik({
        initialValues: {
            comment: "",
        },

        onSubmit: ({ comment }) => {
            if (comment) {
                dispatch(addComment(comment, id, userId, login))
                dispatch(fetchPosts())
            }
        }
    });

    const { login, date, text, likes, likedBy = [], _id: id, comments =[] } = post;

    return (
        <div className={styles.container}>
             <div className={styles.window}>
             <Post text={text} login={login} key={id} id={id} likes={likes} likedBy={likedBy} date={date} detailPost/>
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
                        {comments.map(({date,id,login,text,userId}) => <Post
                            text={text}
                            date={date} 
                            login={login} 
                            key={id}
                            commentPost
                        />)}
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default DetailsPost;