import axios from "axios";
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


export const register = (login, password) => (dispatch) => {
  const params = new URLSearchParams({
    login,
    password,
  });
  dispatch({ type: REGISTER_REQUEST });
  return axios
    .post(`http://localhost:3500/user/register/?${params}`)
    .then((payload) => {
      console.log(payload);
      dispatch({ type: REGISTER_SUCCES, payload });
    })
    .catch((err) => {
      console.log(err.response);
      
      dispatch({ type: REGISTER_FAILURE });
    });
};

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

export const logout = (userId,login) => (dispatch) => {
  return dispatch({ type: LOGOUT, payload: { userId,login } });
};

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

export const addPost = (text) => (dispatch, getState) => {
  const date = new Date();
  dispatch({type: ADD_POST_REQUEST})
  return axios
    .post(`http://localhost:3500/post/?`, {
      userId: getState().userId,
      login: getState().login,
      text,
      likes: 0,
      likedBy: [],
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

export const addLikes = (id,userId) => dispatch => {
  const params = new URLSearchParams({
    id,
    userId
  });
  dispatch({type: ADD_LIKE_REQUEST});
  return axios
    .put(`http://localhost:3500/post/?${params}`)
    .then((payload) => {
      return dispatch({type: ADD_LIKE_SUCCESS, payload})
    })
    .catch(err => console.log(err))
}

export const removePost = (id) => dispatch => {
  const params = new URLSearchParams({
    id,
  });
  dispatch({type: REMOVE_POST_REQUEST});
  return axios
    .delete(`http://localhost:3500/post/?${id}`)
    .then((payload) => {
      return dispatch({type: REMOVE_POST_SUCCESS, payload})
    })
    .catch(err => console.log(err))
}