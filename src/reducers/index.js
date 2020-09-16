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
    default:
      return state;
  }
};

export default rootReducer;
