import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from 'components/NewPostBar/NewPostBar.module.scss';
import close from 'assets/close-fat.svg';
import { useFormik } from "formik";
import {fetchPost as fetchPostAction,addPost as addPostAction, editPost as editPostAction} from 'actions'

const NewPostBar = ({hideBar, edit, id}) => {
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
            {edit ? <h1>Edit Post</h1> : <h1>Create Post</h1>}
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