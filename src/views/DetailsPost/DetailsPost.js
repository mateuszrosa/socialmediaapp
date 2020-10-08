import React, { useState, useEffect } from 'react';
import {addComment } from 'actions';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from "formik";
import Post from 'components/Post/Post';
import face from 'assets/male.svg';
import comment from 'assets/comment-blog.svg';
import heart from 'assets/heart-thin.svg';
import blackheart from 'assets/heart-black.svg';
import bin from 'assets/bin.svg';
import close from 'assets/close-fat.svg'
import styles from './DetailsPost.module.scss';

const DetailsPost = (props) => {

    console.log(props.siema)

    const dispatch = useDispatch()
    const { post = [], userId, user } =
        useSelector(state => ({
            post: state.post,
            userId: state.userId,
            user: state.login
        }));

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

    const { login, date, text, likedBy = [], _id: id } = post;

    return (
        <div className={styles.container}>
             <div className={styles.window}>
             <Post text={text} login={login} key={id} id={id} likedBy={likedBy} date={date} detailPost/>
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
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default DetailsPost;