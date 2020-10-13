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
  FETCH_USER_POSTS_FAILURE
} from "actions";

const initialState = {
  user: {
    userId: "5f8588c7dab6c229dc034650",
    login: "parik"
  }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST: {
      return state
    }
    case FETCH_POSTS_SUCCESS: {
      return {
        ...state,
        posts: [...action.payload.data]
      }
    }
    case FETCH_USER_POSTS_REQUEST: {
      return state;
    }
    case FETCH_USER_POSTS_SUCCESS: {
      return {
        ...state,
        posts: action.payload.data
      }
    }
    case FETCH_POST_REQUEST: {
      return state;
    }
    case FETCH_POST_SUCCESS: {
      return {
        ...state,
        post: action.payload.data
      }
    }
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
    case LOGIN_REQUEST: {
      return state;
    }
    case LOGIN_SUCCES: {
      return {
         ...state, 
         user: {
          userId: action.payload.data.userId,
          login: action.payload.data.login
        }
      };
    }
    case LOGIN_FAILURE: {
      return state
    }
    case LOGOUT: {
      delete state.user.userId;
      delete state.user.login;
      return { ...state };
    }
    case FETCH_USER_REQUEST: {
      return state;
    }
    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        user: {
          userId: action.payload.data._id,
          date: action.payload.data.date,
          email: action.payload.data.email,
          login: action.payload.data.login,
        }
      }
    }
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
    case REMOVE_POST_REQUEST: {
      return state;
    }
    case REMOVE_POST_SUCCESS: {
      return {
        ...state,
        posts: [...state.posts.filter(post => post._id !== action.payload.data._id)]
      }
    }
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
    case EDIT_POST_REQUEST: {
      return state;
    }
    case EDIT_POST_SUCCESS: {
      let index = state.posts.findIndex(post => post._id === action.payload.data._id);
      state.post = action.payload.data;
      state.posts[index] = action.payload.data;
      return state;
    }
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
