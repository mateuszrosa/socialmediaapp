import axios from "axios";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCES = "REGISTER_SUCCES";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCES = "LOGIN_SUCCES";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

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
      console.log(err);
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
