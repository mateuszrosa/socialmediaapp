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
export const ADD_LIKE_REQUEST = "ADD_LIKE_REQUEST";
export const ADD_LIKE_SUCCESS = "ADD_LIKE_SUCCESS";
export const ADD_LIKE_FAILURE = "ADD_LIKE_FAILURE";


export const register = (login, password) => (dispatch) => {
  const params = new URLSearchParams({
    login,
    password,
  });
  dispatch({ type: REGISTER_REQUEST });
  return axios
    .post(`http://localhost:3500/register/?${params}`)
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
    .post(`http://localhost:3500/login/?${params}`)
    .then((payload) => {
      dispatch({ type: LOGIN_SUCCES, payload });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: LOGIN_FAILURE });
    });
};

export const logout = (userId) => (dispatch) => {
  return dispatch({ type: LOGOUT, payload: { userId } });
};

export const addPost = (text) => (dispatch, getState) => {
  dispatch({type: ADD_POST_REQUEST})
  return axios
    .post(`http://localhost:3500/post/?`, {
      userId: getState().userId,
      login: getState().login,
      text,
      likes: 0
    })
    .then((payload) => {
      return dispatch({type: ADD_POST_SUCCESS, payload})
    })
    .catch((err) => {
      console.log(err);
      return dispatch({type: ADD_POST_FAILURE})
    });
}

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

export const addLikes = (id) => dispatch => {
  const params = new URLSearchParams({
    id
  });
  dispatch({type: ADD_LIKE_REQUEST});
  return axios
    .post(`http://localhost:3500/like/?${params}`)
    .then((payload) => {
      return dispatch({type: ADD_LIKE_SUCCESS, payload})
    })
    .catch(err => console.log(err))
}