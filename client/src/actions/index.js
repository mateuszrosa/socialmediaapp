import axios from "axios";
import { getDate } from "helpers";

//USER ACTIONS
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCES = "REGISTER_SUCCES";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCES = "LOGIN_SUCCES";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_USER = "LOGOUT";
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
export const REMOVE_COMMENT_REQUEST = "REMOVE_COMMENT_REQUEST";
export const REMOVE_COMMENT_SUCCESS = "REMOVE_COMMENT_SUCCESS";
export const REMOVE_COMMENT_FAILURE = "REMOVE_COMMENT_FAILURE";
export const EDIT_COMMENT_REQUEST = "EDIT_COMMENT_REQUEST";
export const EDIT_COMMENT_SUCCESS = "EDIT_COMMENT_SUCCESS";
export const EDIT_COMMENT_FAILURE = "EDIT_COMMENT_FAILURE";
export const EDIT_POST_REQUEST = "EDIT_POST_REQUEST";
export const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS";
export const EDIT_POST_FAILURE = "EDIT_POST_FAILURE";
export const FETCH_USER_POSTS_REQUEST = "FETCH_USER_POSTS_REQUEST";
export const FETCH_USER_POSTS_SUCCESS = "FETCH_USER_POSTS_SUCCESS";
export const FETCH_USER_POSTS_FAILURE = "FETCH_USER_POSTS_FAILURE";
export const LOGOUT_POSTS = 'LOGOUT_POSTS';

//MESSAGE ACTIONS
export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST";
export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";
export const REMOVE_MESSAGE_REQUEST = "REMOVE_MESSAGE_REQUEST";
export const REMOVE_MESSAGE_SUCCESS = "REMOVE_MESSAGE_SUCCESS";
export const REMOVE_MESSAGE_FAILURE = "REMOVE_MESSAGE_FAILURE";

///////////////
//USER ACTIONS/
///////////////

//REGISTER
export const register = (login, password, email) => (dispatch) => {
  const date = new Date();
  dispatch({ type: REGISTER_REQUEST });
  return axios
    .post(`http://localhost:3500/user/register/?`, {
      login,
      password,
      email,
      friends: [],
      inbox: [],
      sent: [],
      date: getDate(date)
    })
    .then((payload) => {
      dispatch({ type: REGISTER_SUCCES, payload });
    })
    .catch(({ response }) => {
      dispatch({ type: REGISTER_FAILURE, error: response.data });
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
    .get(`http://localhost:3500/user/login/?${params}`)
    .then((payload) => {
      return dispatch({ type: LOGIN_SUCCES, payload });
    })
    .catch(({ response }) => {
      return dispatch({ type: LOGIN_FAILURE, error: response.data });
    });
};

//LOGOUT
export const logout = () => (dispatch) => {
  return dispatch({ type: LOGOUT_USER });
};

//FETCH ALL USERS
export const fetchUsers = () => dispatch => {
  dispatch({ type: FETCH_USERS_REQUEST });
  return axios
    .get(`http://localhost:3500/users`)
    .then(payload => {
      return dispatch({ type: FETCH_USERS_SUCCESS, payload })
    })
    .catch(({ response }) => {
      return dispatch({ type: FETCH_USERS_FAILURE, error: response.data });
    });
}

//FETCH SINGLE USER
export const fetchUserProfile = userId => dispatch => {
  const params = new URLSearchParams({
    userId
  });
  dispatch({ type: FETCH_USER_REQUEST });
  return axios
    .get(`http://localhost:3500/user/?${params}`)
    .then(payload => {
      return dispatch({ type: FETCH_USER_SUCCESS, payload })
    })
    .catch(({ response }) => {
      return dispatch({ type: FETCH_USER_FAILURE, error: response.data });
    });
}

//ADD TO FRIENDS
export const addToFriends = (userId, friendId) => dispatch => {
  const params = new URLSearchParams({
    userId,
    friendId
  });
  dispatch({ type: ADD_FRIEND_REQUEST })
  return axios
    .put(`http://localhost:3500/user/friend/?${params}`)
    .then(payload => {
      return dispatch({ type: ADD_FRIEND_SUCCESS, payload })
    })
    .catch(({ response }) => {
      return dispatch({ type: ADD_FRIEND_FAILURE, error: response.data });
    });

}

//REMOVE FROM FRIENDS

export const removeFromFriends = (userId, friendId) => dispatch => {
  const params = new URLSearchParams({
    userId,
    friendId
  });
  dispatch({ type: REMOVE_FRIEND_REQUEST })
  return axios
    .put(`http://localhost:3500/user/friend/remove/?${params}`)
    .then(payload => {
      return dispatch({ type: REMOVE_FRIEND_SUCCESS, payload })
    })
    .catch(({ response }) => {
      return dispatch({ type: REMOVE_FRIEND_FAILURE, error: response.data });
    });
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
    date: getDate(date)
  });
  dispatch({ type: SEND_MESSAGE_REQUEST })
  return axios
    .post(`http://localhost:3500/messages/?${params}`)
    .then(payload => {
      return dispatch({ type: SEND_MESSAGE_SUCCESS, payload })
    })
    .catch(({ response }) => {
      return dispatch({ type: SEND_MESSAGE_FAILURE, error: response.data });
    });
}

export const deleteMessage = (id, user, box) => dispatch => {
  const params = new URLSearchParams({
    id,
    login: user,
    box
  });
  dispatch({ type: REMOVE_MESSAGE_REQUEST });
  return axios
    .delete(`http://localhost:3500/messages/?${params}`)
    .then(payload => {
      return dispatch({ type: REMOVE_MESSAGE_SUCCESS, payload })
    })
    .catch(({ response }) => {
      return dispatch({ type: REMOVE_MESSAGE_FAILURE, error: response.data });
    });
}

/////////////////
//POSTS ACTIONS//
/////////////////

//FETCH ALL POSTS
export const fetchPosts = () => (dispatch) => {
  dispatch({ type: FETCH_POSTS_REQUEST })
  return axios
    .get(`http://localhost:3500/posts`)
    .then((payload) => {
      return dispatch({ type: FETCH_POSTS_SUCCESS, payload })
    })
    .catch(({ response }) => {
      return dispatch({ type: FETCH_POSTS_FAILURE, error: response.data });
    });
}

//FETCH SINGLE POST BY ID
export const fetchPost = id => dispatch => {
  const params = new URLSearchParams({
    id,
  });
  dispatch({ type: FETCH_POST_REQUEST })
  return axios
    .get(`http://localhost:3500/post/?${params}`)
    .then((payload) => {
      return dispatch({ type: FETCH_POST_SUCCESS, payload })
    })
    .catch(({ response }) => {
      return dispatch({ type: FETCH_POST_FAILURE, error: response.data });
    });
}

//ADD NEW POST
export const addPost = (text) => (dispatch, getState) => {
  const date = new Date();
  dispatch({ type: ADD_POST_REQUEST })
  return axios
    .post(`http://localhost:3500/post/?`, {
      userId: getState().userReducer.user.userId,
      login: getState().userReducer.user.login,
      text,
      likes: 0,
      likedBy: [],
      comments: [],
      date: getDate(date)
    })
    .then((payload) => {
      return dispatch({ type: ADD_POST_SUCCESS, payload })
    })
    .catch(({ response }) => {
      return dispatch({ type: ADD_POST_FAILURE, error: response.data });
    });
}

//ADD LIKE TO POST
export const addLikes = (id, userId) => dispatch => {
  const params = new URLSearchParams({
    id,
    userId
  });
  dispatch({ type: ADD_LIKE_REQUEST });
  return axios
    .put(`http://localhost:3500/post/like/?${params}`)
    .then((payload) => {
      return dispatch({ type: ADD_LIKE_SUCCESS, payload })
    })
    .catch(({ response }) => {
      return dispatch({ type: ADD_LIKE_FAILURE, error: response.data });
    });
}

//EDIT POST
export const editPost = (id, text) => dispatch => {
  const params = new URLSearchParams({
    id,
    text
  });
  dispatch({ type: EDIT_POST_REQUEST });
  return axios
    .put(`http://localhost:3500/post/edit/?${params}`)
    .then(payload => {
      return dispatch({ type: EDIT_POST_SUCCESS, payload });
    })
    .catch(({ response }) => {
      return dispatch({ type: EDIT_POST_FAILURE, error: response.data });
    });
}

//REMOVE POST
export const removePost = (id) => dispatch => {
  const params = new URLSearchParams({
    id,
  });
  dispatch({ type: REMOVE_POST_REQUEST });
  return axios
    .delete(`http://localhost:3500/post/?${params}`)
    .then((payload) => {
      return dispatch({ type: REMOVE_POST_SUCCESS, payload })
    })
    .catch(({ response }) => {
      return dispatch({ type: REMOVE_POST_FAILURE, error: response.data });
    });
}

//ADD COMMENT TO POST
export const addComment = (text, id, userId, login) => dispatch => {
  const date = new Date();
  const params = new URLSearchParams({
    text,
    id,
    userId,
    login,
    date: getDate(date)
  });
  dispatch({ type: ADD_COMMENT_REQUEST });
  return axios
    .put(`http://localhost:3500/post/comment/?${params}`)
    .then(payload => {
      return dispatch({ type: ADD_COMMENT_SUCCESS, payload });
    })
    .catch(({ response }) => {
      return dispatch({ type: ADD_COMMENT_FAILURE, error: response.data });
    });
}

//REMOVE COMMENT 
export const removeComment = (id, commentId) => dispatch => {
  const params = new URLSearchParams({
    id,
    commentId
  });
  dispatch({ type: REMOVE_COMMENT_REQUEST });
  return axios
    .delete(`http://localhost:3500/post/comment/delete/?${params}`)
    .then(payload => {
      return dispatch({ type: REMOVE_COMMENT_SUCCESS, payload });
    })
    .catch(({ response }) => {
      return dispatch({ type: REMOVE_COMMENT_FAILURE, error: response.data });
    });
}

//EDIT COMMENT
export const editComment = (id, commentId, text) => dispatch => {
  const date = new Date();
  const params = new URLSearchParams({
    id,
    commentId,
    text,
    date: getDate(date)
  });
  dispatch({ type: EDIT_COMMENT_REQUEST });
  return axios
    .put(`http://localhost:3500/post/comment/edit/?${params}`)
    .then(payload => {
      return dispatch({ type: EDIT_COMMENT_SUCCESS, payload });
    })
    .catch(({ response }) => {
      return dispatch({ type: EDIT_COMMENT_FAILURE, error: response.data });
    });
}

//FETCH ALL POSTS ADDED BY SINGLE USER
export const fetchUsersPosts = userId => dispatch => {
  const params = new URLSearchParams({
    userId
  });
  dispatch({ type: FETCH_USER_POSTS_REQUEST })
  return axios
    .get(`http://localhost:3500/posts/user/?${params}`)
    .then(payload => {
      return dispatch({ type: FETCH_USER_POSTS_SUCCESS, payload })
    })
    .catch(({ response }) => {
      return dispatch({ type: FETCH_USER_POSTS_FAILURE, error: response.data });
    });
}