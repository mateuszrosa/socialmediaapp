import {
  REGISTER_REQUEST,
  REGISTER_SUCCES,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCES,
  LOGIN_FAILURE,
  LOGOUT,
} from "actions";

const initialState = {
  notes: ["1", "2", "3"],
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
      return console.log("fail");
    }
    case LOGOUT: {
      delete state.userId;
      return { ...state };
    }
    default:
      return state;
  }
};

export default rootReducer;
