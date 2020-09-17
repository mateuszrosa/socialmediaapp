import {
  REGISTER_REQUEST,
  REGISTER_SUCCES,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCES,
  LOGIN_FAILURE,
} from "actions";

const initialState = {};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return;
    }
    case LOGIN_REQUEST: {
      return;
    }
    case LOGIN_SUCCES: {
      return console.log(action.payload.data.userId);
    }
    case LOGIN_FAILURE: {
      return console.log("fail");
    }
    default:
      return state;
  }
};

export default rootReducer;
