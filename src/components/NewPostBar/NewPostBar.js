import React from 'react';
import styles from 'components/NewPostBar/NewPostBar.module.scss';
import close from 'assets/close-fat.svg';
import { useFormik } from "formik";

const NewPostBar = ({click}) => {

    const formik = useFormik({
        initialValues: {
            text: "",
        },

    onSubmit: ({text}) => {
        console.log(text);
        click()
    }
    });
    return ( 
        <div className={styles.bar}>
            <img onClick={click} src={close} alt=""/>
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
 
export default NewPostBar;