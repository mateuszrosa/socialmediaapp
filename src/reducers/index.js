import {
  REGISTER_REQUEST,
  REGISTER_SUCCES,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCES,
  LOGIN_FAILURE,
  LOGOUT,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  ADD_LIKE_REQUEST,
  ADD_LIKE_SUCCESS,
  ADD_LIKE_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER_POSTS_REQUEST,
  FETCH_USER_POSTS_SUCCESS,
  FETCH_USER_POSTS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_FRIEND_REQUEST,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_FAILURE,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
} from "actions";
import { FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS } from "../actions";

const initialState = {
  user: {
    // userId: "5f8d5dc1def6f818b9b29611",
    // login: "parik"
  }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    ////////////////
    //USER ACTIONS//
    ////////////////

    //LOGGING
    case LOGIN_REQUEST: {
      return state;
    }
    case LOGIN_SUCCES: {
      return {
         ...state, 
         user: {
          userId: action.payload.data._id,
          login: action.payload.data.login,
          email: action.payload.data.email,
          friends: action.payload.data.friends,
        }
      };
    }
    case LOGIN_FAILURE: {
      return state
    }

    //REGISTER
    case REGISTER_REQUEST: {
      return;
    }
    case REGISTER_SUCCES: {
      return {
        ...state,
        user: {
          userId: action.payload.data._id,
          login: action.payload.data.login,
          date: action.payload.data.date,
        }
      }
    }

    //LOGOUT
    case LOGOUT: {
      delete state.user.userId;
      delete state.user.login;
      return { ...state };
    }

    //FETCHING USERS
    case FETCH_USERS_REQUEST: {
      return state;
    }
    case FETCH_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload.data
      }
    }

    //FETCHING USER
    case FETCH_USER_REQUEST: {
      return state;
    }
    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        profileUser: {
          ...action.payload.data
        }
      }
    }

    //ADD TO FRIENDS
    case ADD_FRIEND_REQUEST: {
      return state;
    }
    case ADD_FRIEND_SUCCESS: {
      let index1 = state.users.findIndex(user => user._id === action.payload.data.user._id);
      state.users[index1] = action.payload.data.user;
      let index2 = state.users.findIndex(user => user._id === action.payload.data.friendUser._id);
      state.users.[index2] = action.payload.data.friendUser
      return {
        ...state,
        profileUser: {
          ...action.payload.data.user
        },
      }
    }

    ////////////
    //MESSAGES//
    ////////////

    //SEND MESSAGE
    case SEND_MESSAGE_REQUEST: {
      return state;
    }
    case SEND_MESSAGE_SUCCESS: {
        return {
          ...state,
          messages: [...state.messages, action.payload.data]
        }
    }

    case FETCH_MESSAGES_REQUEST: {
      return state;
    }
    case FETCH_MESSAGES_SUCCESS: {
      return {
        ...state,
        messages: action.payload.data
      }
    }

    /////////////////
    //POSTS ACTIONS//
    /////////////////

    //FETCH POSTS
    case FETCH_POSTS_REQUEST: {
      return state
    }
    case FETCH_POSTS_SUCCESS: {
      return {
        ...state,
        posts: [...action.payload.data]
      }
    }

    //FETCH POST
    case FETCH_POST_REQUEST: {
      return state;
    }
    case FETCH_POST_SUCCESS: {
      return {
        ...state,
        post: action.payload.data
      }
    }

    //FETCH USER'S POSTS
    case FETCH_USER_POSTS_REQUEST: {
      return state;
    }
    case FETCH_USER_POSTS_SUCCESS: {
      return {
        ...state,
        posts: action.payload.data
      }
    }

    //ADD POST
    case ADD_POST_REQUEST:{
      return state;
    }
    case ADD_POST_SUCCESS:{
      return {
        ...state,
        posts: [...state.posts, action.payload.data],
      };
    }
    case ADD_POST_FAILURE: {
      return state;
    }

    //REMOVE POST
    case REMOVE_POST_REQUEST: {
      return state;
    }
    case REMOVE_POST_SUCCESS: {
      return {
        ...state,
        posts: [...state.posts.filter(post => post._id !== action.payload.data._id)]
      }
    }

    //ADD LIKE TO POST
    case ADD_LIKE_REQUEST: {
      return state;
    }
    case ADD_LIKE_SUCCESS: {
      let index = state.posts.findIndex(
        (post) => post._id === action.payload.data._id
      );
      state.post = action.payload.data;
      state.posts[index] = action.payload.data;
      return {
        ...state
      }
    }

    //EDIT POST
    case EDIT_POST_REQUEST: {
      return state;
    }
    case EDIT_POST_SUCCESS: {
      let index = state.posts.findIndex(post => post._id === action.payload.data._id);
      state.post = action.payload.data;
      state.posts[index] = action.payload.data;
      return state;
    }

    //ADD COMMENT TO POST
    case ADD_COMMENT_REQUEST: {
      return state;
    }
    case ADD_COMMENT_SUCCESS: {
      let index = state.posts.findIndex(post => post._id === action.payload.data._id);
      state.post = action.payload.data;
      state.posts[index] = action.payload.data;
      return state;
    }
    default:
      return state;
  }
};

export default rootReducer;
