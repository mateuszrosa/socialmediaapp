import {
    REGISTER_REQUEST,
    REGISTER_SUCCES,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCES,
    LOGIN_FAILURE,
    LOGOUT,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    // FETCH_USERS_FAILURE,
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    // FETCH_USER_FAILURE,
    ADD_FRIEND_REQUEST,
    ADD_FRIEND_SUCCESS,
    // ADD_FRIEND_FAILURE,
    REMOVE_FRIEND_REQUEST,
    REMOVE_FRIEND_SUCCESS,
    // REMOVE_FRIEND_FAILURE,
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    // SEND_MESSAGE_FAILURE,
    REMOVE_MESSAGE_REQUEST,
    REMOVE_MESSAGE_SUCCESS,
    // REMOVE_MESSAGE_FAILURE
} from 'actions';

const initialState = {
    user: {}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return state;
        }
        case LOGIN_SUCCES: {
            delete state.error;
            return {
                ...state,
                user: {
                    userId: action.payload.data._id,
                    login: action.payload.data.login,
                    email: action.payload.data.email,
                    friends: action.payload.data.friends,
                    inbox: action.payload.data.inbox,
                    sent: action.payload.data.sent
                }
            };
        }
        case LOGIN_FAILURE: {
            return {
                ...state,
                error: action.error
            }
        }

        //REGISTER
        case REGISTER_REQUEST: {
            return;
        }
        case REGISTER_SUCCES: {
            delete state.error;
            return {
                ...state,
                user: {
                    userId: action.payload.data._id,
                    login: action.payload.data.login,
                    date: action.payload.data.date,
                }
            }
        }
        case REGISTER_FAILURE: {
            return {
                ...state,
                error: action.error
            }
        }

        //LOGOUT
        case LOGOUT: {
            state.user = {};
            delete state.users;
            delete state.posts;
            delete state.post;
            delete state.error;
            return { ...state };
        }

        //FETCHING USERS
        case FETCH_USERS_REQUEST: {
            return state;
        }
        case FETCH_USERS_SUCCESS: {
            return {
                ...state,
                users: action.payload.data
            }
        }

        //FETCHING USER
        case FETCH_USER_REQUEST: {
            return state;
        }
        case FETCH_USER_SUCCESS: {
            return {
                ...state,
                profileUser: {
                    _id: action.payload.data._id,
                    login: action.payload.data.login,
                    email: action.payload.data.email,
                    friends: action.payload.data.friends,
                    inbox: action.payload.data.inbox,
                    sent: action.payload.data.sent
                }
            }
        }

        //ADD TO FRIENDS
        case ADD_FRIEND_REQUEST: {
            return state;
        }
        case ADD_FRIEND_SUCCESS: {
            console.log(action.payload.data)
            let index1 = state.users.findIndex(user => user._id === action.payload.data.user._id);
            state.users[index1] = action.payload.data.user;
            let index2 = state.users.findIndex(user => user._id === action.payload.data.friendUser._id);
            state.users[index2] = action.payload.data.friendUser;
            return {
                ...state,
                profileUser: {
                    ...action.payload.data.friendUser
                },
                user: {
                    userId: action.payload.data.user._id,
                    login: action.payload.data.user.login,
                    email: action.payload.data.user.email,
                    friends: action.payload.data.user.friends,
                    inbox: action.payload.data.user.inbox,
                    sent: action.payload.data.user.sent
                }
            }
        }

        case REMOVE_FRIEND_REQUEST: {
            return state;
        }
        case REMOVE_FRIEND_SUCCESS: {
            let index1 = state.users.findIndex(user => user._id === action.payload.data.user._id);
            state.users[index1] = action.payload.data.user;
            let index2 = state.users.findIndex(user => user._id === action.payload.data.friendUser._id);
            state.users[index2] = action.payload.data.friendUser;
            return {
                ...state,
                user: {
                    userId: action.payload.data.user._id,
                    login: action.payload.data.user.login,
                    email: action.payload.data.user.email,
                    friends: action.payload.data.user.friends,
                    inbox: action.payload.data.user.inbox,
                    sent: action.payload.data.user.sent
                }
            }
        }//SEND MESSAGE
        case SEND_MESSAGE_REQUEST: {
            return state;
        }
        case SEND_MESSAGE_SUCCESS: {
            return {
                ...state,
                user: {
                    userId: action.payload.data._id,
                    login: action.payload.data.login,
                    email: action.payload.data.email,
                    friends: action.payload.data.friends,
                    inbox: action.payload.data.inbox,
                    sent: action.payload.data.sent
                }
            }
        }

        case REMOVE_MESSAGE_REQUEST: {
            return state;
        }
        case REMOVE_MESSAGE_SUCCESS: {
            return {
                ...state,
                user: {
                    userId: action.payload.data._id,
                    login: action.payload.data.login,
                    email: action.payload.data.email,
                    friends: action.payload.data.friends,
                    inbox: action.payload.data.inbox,
                    sent: action.payload.data.sent
                }
            }
        }

        default:
            return state;
    }
}

export default userReducer;