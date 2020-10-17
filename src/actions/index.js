import axios from "axios";
import { get } from "mongoose";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCES = "REGISTER_SUCCES";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCES = "LOGIN_SUCCES";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
export const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";
export const FETCH_POST_REQUEST = "FETCH_POST_REQUEST";
export const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
export const FETCH_POST_FAILURE = "FETCH_POST_FAILURE";
export const ADD_LIKE_REQUEST = "ADD_LIKE_REQUEST";
export const ADD_LIKE_SUCCESS = "ADD_LIKE_SUCCESS";
export const ADD_LIKE_FAILURE = "ADD_LIKE_FAILURE";
export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";
export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";
export const EDIT_POST_REQUEST = "EDIT_POST_REQUEST";
export const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS";
export const EDIT_POST_FAILURE = "EDIT_POST_FAILURE";
export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const FETCH_USER_POSTS_REQUEST = "FETCH_USER_POSTS_REQUEST";
export const FETCH_USER_POSTS_SUCCESS = "FETCH_USER_POSTS_SUCCESS";
export const FETCH_USER_POSTS_FAILURE = "FETCH_USER_POSTS_FAILURE";
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export const ADD_FRIEND_REQUEST = "ADD_FRIEND_REQUEST";
export const ADD_FRIEND_SUCCESS = "ADD_FRIEND_SUCCESS";
export const ADD_FRIEND_FAILURE = "ADD_FRIEND_FAILURE";


//USER ACTION

//REGISTER
export const register = (login, password, email) => (dispatch) => {
  const date = new Date();
  dispatch({ type: REGISTER_REQUEST });
  return axios
    .post(`http://localhost:3500/user/register/?`,{
      login,
      password,
      email,
      friends: [],
      date: `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
    })
    .then((payload) => {
      dispatch({ type: REGISTER_SUCCES, payload });
    })
    .catch((err) => {
      console.log(err.response);
      
      dispatch({ type: REGISTER_FAILURE });
    });
};

//LOGGING
export const login = (login, password) => (dispatch) => {
  const params = new URLSearchParams({
    login,
    password,
  });
  dispatch({ type: LOGIN_REQUEST });
  return axios
    .post(`http://localhost:3500/user/login/?${params}`)
    .then((payload) => {
      dispatch({ type: LOGIN_SUCCES, payload });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: LOGIN_FAILURE });
    });
};

//LOGOUT
export const logout = (userId,login) => (dispatch) => {
  return dispatch({ type: LOGOUT, payload: { userId,login } });
};

//FETCH ALL USERS
export const fetchUsers = () => dispatch => {
  dispatch({type: FETCH_USERS_REQUEST});
  return axios
    .get(`http://localhost:3500/users`)
    .then(payload => {
      return dispatch({type: FETCH_USERS_SUCCESS, payload})
    })
    .catch(err => console.log(err))
}

//FETCH SINGLE USER
export const fetchUserProfile = userId => dispatch => {
  const params = new URLSearchParams({
    userId
  });
  dispatch({type: FETCH_USER_REQUEST});
  return axios
    .get(`http://localhost:3500/user/?${params}`)
    .then(payload => {
      return dispatch({type: FETCH_USER_SUCCESS, payload})
    })
    .catch(err => console.log(err))
}

//ADD TO FRIENDS
export const addToFriends = (userId, friendId) => dispatch => {
  console.log(userId, friendId)
  const params = new URLSearchParams({
    userId,
    friendId
  });
  dispatch({type: ADD_FRIEND_REQUEST})
  return axios
    .put(`http://localhost:3500/user/friend/?${params}`)
    .then(payload => {
      return dispatch({type: ADD_FRIEND_SUCCESS, payload})
    })
    .catch(err => console.log(err))
}

/////////////////
//POSTS ACTIONS//
/////////////////

//FETCH ALL POSTS
export const fetchPosts = () => (dispatch) => {
  dispatch({type: FETCH_POSTS_REQUEST})
  return axios
    .get(`http://localhost:3500/posts`)
    .then((payload) => {
      return dispatch({type: FETCH_POSTS_SUCCESS, payload})
    })
    .catch(err=> {
       console.log(err)})
}

//FETCH SINGLE POST BY ID
export const fetchPost = id => dispatch => {
  const params = new URLSearchParams({
    id,
  });
  dispatch({type: FETCH_POST_REQUEST})
  return axios
    .get(`http://localhost:3500/post/?${params}`)
    .then((payload) => {
      return dispatch({type: FETCH_POST_SUCCESS, payload})
    })
    .catch(err => console.log(err))
}

//ADD NEW POST
export const addPost = (text) => (dispatch, getState) => {
  const date = new Date();
  dispatch({type: ADD_POST_REQUEST})
  return axios
    .post(`http://localhost:3500/post/?`, {
      userId: getState().user.userId,
      login: getState().user.login,
      text,
      likes: 0,
      likedBy: [],
      comments: [],
      date: `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
    })
    .then((payload) => {
      return dispatch({type: ADD_POST_SUCCESS, payload})
    })
    .catch((err) => {
      console.log(err);
      return dispatch({type: ADD_POST_FAILURE})
    });
}

//ADD LIKE TO POST
export const addLikes = (id,userId) => dispatch => {
  const params = new URLSearchParams({
    id,
    userId
  });
  dispatch({type: ADD_LIKE_REQUEST});
  return axios
    .put(`http://localhost:3500/post/like/?${params}`)
    .then((payload) => {
      return dispatch({type: ADD_LIKE_SUCCESS, payload})
    })
    .catch(err => console.log(err))
}

//EDIT POST
export const editPost = (id, text) => dispatch => {
  const params = new URLSearchParams({
    id,
    text
  });
  dispatch({type: EDIT_POST_REQUEST});
  return axios
    .put(`http://localhost:3500/post/edit/?${params}`)
    .then(payload => {
      return dispatch({type: EDIT_POST_SUCCESS, payload});
    })
    .catch(err => console.log(err))
}

//REMOVE POST
export const removePost = (id) => dispatch => {
  const params = new URLSearchParams({
    id,
  });
  dispatch({type: REMOVE_POST_REQUEST});
  return axios
    .delete(`http://localhost:3500/post/?${params}`)
    .then((payload) => {
      return dispatch({type: REMOVE_POST_SUCCESS, payload})
    })
    .catch(err => console.log(err))
}

//ADD COMMENT TO POST
export const addComment = (text,id, userId, login) => dispatch => {
  const date = new Date();
  const params = new URLSearchParams({
   text,
   id,
   userId, 
   login,
   date: `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  });
  dispatch({type: ADD_COMMENT_REQUEST});
  return axios
    .put(`http://localhost:3500/post/comment/?${params}`)
    .then(payload => {
      return dispatch({type: ADD_COMMENT_SUCCESS, payload});
    })
    .catch(err => console.log(err))
}

//FETCH ALL POSTS ADDED BY SINGLE USER
export const fetchUsersPosts = userId => dispatch => {
  const params = new URLSearchParams({
    userId
  });
  dispatch({type: FETCH_USER_POSTS_REQUEST})
  return axios
    .get(`http://localhost:3500/posts/user/?${params}`)
    .then(payload => {
      return dispatch({type: FETCH_USER_POSTS_SUCCESS, payload})
    })
    .catch(err => console.log(err))
}