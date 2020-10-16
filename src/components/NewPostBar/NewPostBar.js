import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from 'components/NewPostBar/NewPostBar.module.scss';
import close from 'assets/close-fat.svg';
import { useFormik } from "formik";
import {addPost as addPostAction, editPost as editPostAction} from 'actions'

const NewPostBar = ({hideBar, id, edit, post, message}) => {
    const dispatch = useDispatch();

    const [valid, setValid] = useState(false) 

    const formik = useFormik({
        initialValues: {
            text: "",
        },

    onSubmit: ({text}) => {
        if(text) {
            edit ? dispatch(editPostAction(id, text)) :dispatch(addPostAction(text))
        hideBar()
        } else {
            setValid(true)
        }
    }
    });
    
    return ( 
        <div className={styles.bar}>
            <img onClick={hideBar} src={close} alt=""/>
            {post && <h1>Create post</h1>}
            {edit && <h1>Edit post</h1>}
            {message && <h1>Send message</h1>}
            {valid && <p>You can't send empty post!</p>}
            <form onSubmit={formik.handleSubmit}>
                <textarea 
                    onChange={formik.handleChange}
                    value={formik.values.text}
                    name="text" 
                    id="text" 
                    cols="25" 
                    rows="5">
                </textarea>
            <input type="submit" value="Post"/>
            </form>
        </div>
     );
}

export default NewPostBar;