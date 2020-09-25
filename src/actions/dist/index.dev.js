"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPost = exports.logout = exports.login = exports.register = exports.ADD_POST_FAILURE = exports.ADD_POST_SUCCESS = exports.ADD_POST_REQUEST = exports.LOGOUT = exports.LOGIN_FAILURE = exports.LOGIN_SUCCES = exports.LOGIN_REQUEST = exports.REGISTER_FAILURE = exports.REGISTER_SUCCES = exports.REGISTER_REQUEST = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var REGISTER_REQUEST = "REGISTER_REQUEST";
exports.REGISTER_REQUEST = REGISTER_REQUEST;
var REGISTER_SUCCES = "REGISTER_SUCCES";
exports.REGISTER_SUCCES = REGISTER_SUCCES;
var REGISTER_FAILURE = "REGISTER_FAILURE";
exports.REGISTER_FAILURE = REGISTER_FAILURE;
var LOGIN_REQUEST = "LOGIN_REQUEST";
exports.LOGIN_REQUEST = LOGIN_REQUEST;
var LOGIN_SUCCES = "LOGIN_SUCCES";
exports.LOGIN_SUCCES = LOGIN_SUCCES;
var LOGIN_FAILURE = "LOGIN_FAILURE";
exports.LOGIN_FAILURE = LOGIN_FAILURE;
var LOGOUT = "LOGOUT";
exports.LOGOUT = LOGOUT;
var ADD_POST_REQUEST = "ADD_POST_REQUEST";
exports.ADD_POST_REQUEST = ADD_POST_REQUEST;
var ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
exports.ADD_POST_SUCCESS = ADD_POST_SUCCESS;
var ADD_POST_FAILURE = "ADD_POST_FAILURE";
exports.ADD_POST_FAILURE = ADD_POST_FAILURE;

var register = function register(login, password) {
  return function (dispatch) {
    var params = new URLSearchParams({
      login: login,
      password: password
    });
    dispatch({
      type: REGISTER_REQUEST
    });
    return _axios["default"].post("http://localhost:3500/register/?".concat(params)).then(function (payload) {
      console.log(payload);
      dispatch({
        type: REGISTER_SUCCES,
        payload: payload
      });
    })["catch"](function (err) {
      console.log(err.response);
      dispatch({
        type: REGISTER_FAILURE
      });
    });
  };
};

exports.register = register;

var login = function login(_login, password) {
  return function (dispatch) {
    var params = new URLSearchParams({
      login: _login,
      password: password
    });
    dispatch({
      type: LOGIN_REQUEST
    });
    return _axios["default"].post("http://localhost:3500/login/?".concat(params)).then(function (payload) {
      dispatch({
        type: LOGIN_SUCCES,
        payload: payload
      });
    })["catch"](function (err) {
      console.log(err);
      dispatch({
        type: LOGIN_FAILURE
      });
    });
  };
};

exports.login = login;

var logout = function logout(userId) {
  return function (dispatch) {
    return dispatch({
      type: LOGOUT,
      payload: {
        userId: userId
      }
    });
  };
};

exports.logout = logout;

var addPost = function addPost(userId, text) {
  return function (dispatch) {
    dispatch({
      type: ADD_POST_REQUEST
    });
    return _axios["default"].post("http://localhost:3500/post/?", {
      userId: userId,
      text: text
    }).then(function (payload) {
      console.log(payload);
      return dispatch({
        type: ADD_POST_SUCCESS,
        payload: payload
      });
    })["catch"](function (err) {
      console.log(err);
      return dispatch({
        type: ADD_POST_FAILURE
      });
    });
  };
};

exports.addPost = addPost;