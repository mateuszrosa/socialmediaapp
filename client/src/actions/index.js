import axios from "axios";

//USER ACTIONS
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCES = "REGISTER_SUCCES";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCES = "LOGIN_SUCCES";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export const ADD_FRIEND_REQUEST = "ADD_FRIEND_REQUEST";
export const ADD_FRIEND_SUCCESS = "ADD_FRIEND_SUCCESS";
export const ADD_FRIEND_FAILURE = "ADD_FRIEND_FAILURE";
export const REMOVE_FRIEND_REQUEST = "REMOVE_FRIEND_REQUEST";
export const REMOVE_FRIEND_SUCCESS = "REMOVE_FRIEND_SUCCESS";
export const REMOVE_FRIEND_FAILURE = "REMOVE_FRIEND_FAILURE";

//POST ACTIONS
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
export const FETCH_USER_POSTS_REQUEST = "FETCH_USER_POSTS_REQUEST";
export const FETCH_USER_POSTS_SUCCESS = "FETCH_USER_POSTS_SUCCESS";
export const FETCH_USER_POSTS_FAILURE = "FETCH_USER_POSTS_FAILURE";

//MESSAGE ACTIONS
export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST";
export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";
export const REMOVE_MESSAGE_REQUEST = "REMOVE_MESSAGE_REQUEST";
export const REMOVE_MESSAGE_SUCCESS = "REMOVE_MESSAGE_SUCCESS";
export const REMOVE_MESSAGE_FAILURE = "REMOVE_MESSAGE_FAILURE";
export const FETCH_MESSAGES_REQUEST = "FETCH_MESSAGES_REQUEST";
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS";
export const FETCH_MESSAGES_FAILURE = "FETCH_MESSAGES_FAILURE";

///////////////
//USER ACTION//
///////////////

//REGISTER
export const register = (login, password, email) => (dispatch) => {
  const date = new Date();
  dispatch({ type: REGISTER_REQUEST });
  return axios
    .post(`https://socialmediaapp-backend.herokuapp.com/register/?`,{
      login,
      password,
      email,
      friends: [],
      inbox: [],
      sent:[],
      date: `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
    })
    .then((payload) => {
      dispatch({ type: REGISTER_SUCCES, payload });
    })
    .catch(({response}) => {
      dispatch({ type: REGISTER_FAILURE, response });
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
    .post(`https://socialmediaapp-backend.herokuapp.com/user/login/?${params}`)
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
    .get(`https://socialmediaapp-backend.herokuapp.com/users`)
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
    .get(`https://socialmediaapp-backend.herokuapp.com/?${params}`)
    .then(payload => {
      return dispatch({type: FETCH_USER_SUCCESS, payload})
    })
    .catch(err => console.log(err))
}

//ADD TO FRIENDS
export const addToFriends = (userId, friendId) => dispatch => {
  const params = new URLSearchParams({
    userId,
    friendId
  });
  dispatch({type: ADD_FRIEND_REQUEST})
  return axios
    .put(`https://socialmediaapp-backend.herokuapp.com/?${params}`)
    .then(payload => {
      return dispatch({type: ADD_FRIEND_SUCCESS, payload})
    })
    .catch(err => console.log(err))
}

//REMOVE FROM FRIENDS

export const removeFromFriends = (userId, friendId) => dispatch => {
  const params = new URLSearchParams({
    userId,
    friendId
  });
  dispatch({type: REMOVE_FRIEND_REQUEST})
  return axios
    .put(`https://socialmediaapp-backend.herokuapp.com/?${params}`)
    .then(payload => {
      return dispatch({type: REMOVE_FRIEND_SUCCESS, payload})
    })
    .catch(err => console.log(err))
}

////////////
//MESSAGES//
////////////

//SEND MESSAGE
export const sendMessage = (senderId, senderName, text, to) => dispatch => {
  const date = new Date();
  const params = new URLSearchParams({
    senderId,
    senderName,
    text,
    to,
    date: `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  });
  dispatch({type: SEND_MESSAGE_REQUEST})
  return axios
    .post(`https://socialmediaapp-backend.herokuapp.com/?${params}`)
    .then(payload => {
      return dispatch({type: SEND_MESSAGE_SUCCESS, payload})
    })
    .catch(err => console.log(err))
}

export const deleteMessage = (id, user, box) => dispatch => {
  const params = new URLSearchParams({
    id,
    login: user,
    box
  });
  dispatch({type: REMOVE_MESSAGE_REQUEST});
  return axios
    .delete(`https://socialmediaapp-backend.herokuapp.com/?${params}`)
    .then(payload => {
      return dispatch({type: REMOVE_MESSAGE_SUCCESS, payload})
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
    .get(`https://socialmediaapp-backend.herokuapp.com/posts`)
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
    .get(`https://socialmediaapp-backend.herokuapp.com/post/?${params}`)
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
    .post(`https://socialmediaapp-backend.herokuapp.com/post/?`, {
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
    .put(`https://socialmediaapp-backend.herokuapp.com/post/like/?${params}`)
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
    .put(`https://socialmediaapp-backend.herokuapp.com/post/edit/?${params}`)
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
    .delete(`https://socialmediaapp-backend.herokuapp.com/post/?${params}`)
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
    .put(`https://socialmediaapp-backend.herokuapp.com/post/comment/?${params}`)
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
    .get(`https://socialmediaapp-backend.herokuapp.com/posts/user/?${params}`)
    .then(payload => {
      return dispatch({type: FETCH_USER_POSTS_SUCCESS, payload})
    })
    .catch(err => console.log(err))
}