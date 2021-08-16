import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import testReducer from './test.reducer';

export default combineReducers(
    {
        testReducer,
        userReducer,
    }
);