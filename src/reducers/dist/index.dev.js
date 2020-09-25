"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _actions = require("actions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  userId: "5f634e3c79e20f40e8e7530f"
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
          userId: action.payload.data.userId
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
        return _objectSpread({}, state, {
          posts: [state, action.payload.data]
        });
      }

    case _actions.ADD_POST_FAILURE:
      {
        return {
          state: state
        };
      }

    default:
      return state;
  }
};

var _default = rootReducer;
exports["default"] = _default;