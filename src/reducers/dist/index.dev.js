"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _actions = require("actions");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  userId: "5f634e3c79e20f40e8e7530f",
  login: "Parik"
};

var rootReducer = function rootReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions.REGISTER_REQUEST:
      {
        return;
      }

    case _actions.LOGIN_REQUEST:
      {
        return state;
      }

    case _actions.LOGIN_SUCCES:
      {
        return _objectSpread({}, state, {
          userId: action.payload.data.userId,
          login: action.payload.data.login
        });
      }

    case _actions.LOGIN_FAILURE:
      {
        return state;
      }

    case _actions.LOGOUT:
      {
        delete state.userId;
        return _objectSpread({}, state);
      }

    case _actions.ADD_POST_REQUEST:
      {
        return state;
      }

    case _actions.ADD_POST_SUCCESS:
      {
        console.log(state);
        return _objectSpread({}, state, {
          posts: [].concat(_toConsumableArray(state.posts), [action.payload.data])
        });
      }

    case _actions.ADD_POST_FAILURE:
      {
        return state;
      }

    case _actions.FETCH_POSTS_REQUEST:
      {
        return state;
      }

    case _actions.FETCH_POSTS_SUCCESS:
      {
        return _objectSpread({}, state, {
          posts: _toConsumableArray(action.payload.data)
        });
      }

    default:
      return state;
  }
};

var _default = rootReducer;
exports["default"] = _default;