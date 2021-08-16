import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { useSelector, useDispatch } from 'react-redux';
import styles from 'components/NewPostBar/NewPostBar.module.scss';
import close from 'assets/close-fat.svg';
import { useFormik } from "formik";
import { addPost as addPostAction, editPost as editPostAction, editComment as editCommentAction, sendMessage } from 'actions';

const NewPostBar = ({ hideBar, id, commentId, edit, comment, post, message, to }) => {


    const dispatch = useDispatch();
    const [valid, setValid] = useState(false);
    const { senderId, senderName } = useSelector(({ userReducer }) => ({
        senderId: userReducer.user.userId,
        senderName: userReducer.user.login
    }));

    const formik = useFormik({
        initialValues: {
            text: "",
            to: to,
        },

        onSubmit: ({ text, to }) => {
            if (text) {
                if (message) {
                    dispatch(sendMessage(senderId, senderName, text, to));
                } else {
                    if (edit) {
                        dispatch(editPostAction(id, text))
                    } else if (comment) {
                        dispatch(editCommentAction(id, commentId, text));
                    } else {
                        dispatch(addPostAction(text));
                    }
                }
                hideBar()
            } else {
                setValid(true)
            }
        }
    });

    return (
        <div className={styles.bar}>
            <ReactTooltip />
            <img data-tip="close" onClick={hideBar} src={close} alt="" />
            {post && <h1>Create post</h1>}
            {edit && <h1>Edit post</h1>}
            {comment && <h1>Edit comment</h1>}
            {message && <h1>Send message</h1>}
            {valid && <p>You can't send empty post!</p>}
            <form onSubmit={formik.handleSubmit}>
                {message &&
                    <>
                        <label>To:</label>
                        <input
                            onChange={formik.handleChange}
                            value={formik.values.to}
                            type="text"
                            name="to"
                            id="to"
                            placeholder="Write login"
                        />
                    </>
                }
                <textarea
                    placeholder={message ? "Write your message" : "Write your text"}
                    onChange={formik.handleChange}
                    value={formik.values.text}
                    name="text"
                    id="text"
                    cols="25"
                    rows="5">
                </textarea>
                <input type="submit" value={message ? "Send" : "Post"} />
            </form>
        </div>
    );
}

export default NewPostBar;