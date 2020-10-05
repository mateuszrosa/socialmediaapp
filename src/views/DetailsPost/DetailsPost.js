import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import styles from './DetailsPost.module.scss';
import axios from 'axios'

const DetailsPost = (props) => {
    const id = props.match.params.id;

    const [post, setPost] = useState({})

    useEffect(() => {
    const params = new URLSearchParams({
    id
  });
    axios.get(`http://localhost:3500/post/?${params}`)
    .then((payload) => {
        setPost(payload.data)
        console.log(payload.data);
    })
    .catch(err => console.log(err))
},[])


    return ( 
        <div className={styles.container}>
            <div className={styles.window}>
                <h1>{post.login}</h1>
                <p>{post.text}</p>
            </div>
        </div>
     );
}
 
export default withRouter(DetailsPost);