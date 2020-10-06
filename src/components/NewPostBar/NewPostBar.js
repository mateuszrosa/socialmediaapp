import React, {useState} from 'react';
import { connect } from "react-redux";
import styles from 'components/NewPostBar/NewPostBar.module.scss';
import close from 'assets/close-fat.svg';
import { useFormik } from "formik";
import {addPost as addPostAuth} from 'actions'

const NewPostBar = ({hideBar, addPost}) => {

    const [valid, setValid] = useState(false) 

    const formik = useFormik({
        initialValues: {
            text: "",
        },

    onSubmit: ({text}) => {
        if(text) {
        addPost(text)
        hideBar()
        } else {
            setValid(true)
        }

    }
    });
    return ( 
        <div className={styles.bar}>
            <img onClick={hideBar} src={close} alt=""/>
            <h1>Create Post</h1>
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

const mapDispatchToState = (dispatch) => ({
    addPost: ( text) => dispatch(addPostAuth(text))
  });
  
  const mapToStateProps = ({ userId }) => ({
    userId,
  });

export default connect(mapToStateProps, mapDispatchToState)(NewPostBar);