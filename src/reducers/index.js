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
  FETCH_POSTS_FAILURE
} from "actions";

const initialState = {
  userId: "5f634e3c79e20f40e8e7530f"
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return;
    }
    case LOGIN_REQUEST: {
      return state;
    }
    case LOGIN_SUCCES: {
      return { ...state, userId: action.payload.data.userId };
    }
    case LOGIN_FAILURE: {
      return state
    }
    case LOGOUT: {
      delete state.userId;
      return { ...state };
    }
    case ADD_POST_REQUEST:{
      return state;
    }
    case ADD_POST_SUCCESS:{
      return {
        ...state,
        posts:  [state, action.payload.data]
      }
    }
    case ADD_POST_FAILURE: {
      return state;
    }
    case FETCH_POSTS_REQUEST: {
      return state;
    }
    case FETCH_POSTS_SUCCESS: {
      return {
        ...state,
        posts: [...action.payload.data]
      }
    }
    default:
      return state;
  }
};

export default rootReducer;
