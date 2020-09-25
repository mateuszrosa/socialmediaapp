import React from 'react';
import { connect } from "react-redux";
import styles from 'components/NewPostBar/NewPostBar.module.scss';
import close from 'assets/close-fat.svg';
import { useFormik } from "formik";
import {addPost as addPostAuth} from 'actions'

const NewPostBar = ({hideBar, addPost, userId}) => {

    const formik = useFormik({
        initialValues: {
            text: "",
        },

    onSubmit: ({text}) => {
        addPost(userId, text)
        hideBar()
    }
    });
    return ( 
        <div className={styles.bar}>
            <img onClick={hideBar} src={close} alt=""/>
            <h1>Create Post</h1>    
            <form onSubmit={formik.handleSubmit}>
                <textarea 
            onChange={formik.handleChange}
            value={formik.values.text}
            name="text" 
            id="text" 
            cols="25" 
            rows="5"></textarea>
            <input type="submit" value="Post"/>
            </form>
        </div>
     );
}

const mapDispatchToState = (dispatch) => ({
    addPost: (userId, text) => dispatch(addPostAuth(userId,text))
  });
  
  const mapToStateProps = ({ userId }) => ({
    userId,
  });

export default connect(mapToStateProps, mapDispatchToState)(NewPostBar);