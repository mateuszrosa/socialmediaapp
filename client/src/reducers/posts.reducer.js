import {
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    FETCH_POST_REQUEST,
    FETCH_POST_SUCCESS,
    FETCH_POST_FAILURE,
    ADD_LIKE_REQUEST,
    ADD_LIKE_SUCCESS,
    ADD_LIKE_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_FAILURE,
    EDIT_POST_REQUEST,
    EDIT_POST_SUCCESS,
    EDIT_POST_FAILURE,
    FETCH_USER_POSTS_REQUEST,
    FETCH_USER_POSTS_SUCCESS,
    FETCH_USER_POSTS_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    REMOVE_COMMENT_REQUEST,
    REMOVE_COMMENT_SUCCESS,
    REMOVE_COMMENT_FAILURE,
    EDIT_COMMENT_REQUEST,
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_FAILURE,
} from 'actions';

const initialState = {};

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        //FETCH POSTS
        case FETCH_POSTS_REQUEST: {
            return state
        }
        case FETCH_POSTS_SUCCESS: {
            return {
                ...state,
                posts: [...action.payload.data.reverse()]
            }
        }
        case FETCH_POSTS_FAILURE: {
            return {
                ...state,
                error: action.error
            }
        }

        //FETCH POST
        case FETCH_POST_REQUEST: {
            return state;
        }
        case FETCH_POST_SUCCESS: {
            return {
                ...state,
                post: action.payload.data
            }
        }
        case FETCH_POST_FAILURE: {
            return {
                ...state,
                error: action.error
            }
        }

        //FETCH USER'S POSTS
        case FETCH_USER_POSTS_REQUEST: {
            return state;
        }
        case FETCH_USER_POSTS_SUCCESS: {
            return {
                ...state,
                posts: action.payload.data.reverse()
            }
        }
        case FETCH_USER_POSTS_FAILURE: {
            return {
                ...state,
                error: action.error
            }
        }

        //ADD POST
        case ADD_POST_REQUEST: {
            return state;
        }
        case ADD_POST_SUCCESS: {
            return {
                ...state,
                posts: [action.payload.data, ...state.posts],
            };
        }
        case ADD_POST_FAILURE: {
            return {
                ...state,
                error: { message: "Cannot add post" }
            };
        }

        //REMOVE POST
        case REMOVE_POST_REQUEST: {
            return state;
        }
        case REMOVE_POST_SUCCESS: {
            return {
                ...state,
                posts: [...state.posts.filter(post => post._id !== action.payload.data._id)]
            }
        }
        case REMOVE_POST_FAILURE: {
            return {
                ...state,
                error: action.error
            };
        }

        //ADD LIKE TO POST
        case ADD_LIKE_REQUEST: {
            return state;
        }
        case ADD_LIKE_SUCCESS: {
            let index = state.posts.findIndex(
                (post) => post._id === action.payload.data._id
            );
            state.post = action.payload.data;
            state.posts[index] = action.payload.data;
            console.log(state.posts);
            return {
                ...state
            }
        }
        case ADD_LIKE_FAILURE: {
            return {
                ...state,
                error: action.error
            }
        }

        //EDIT POST
        case EDIT_POST_REQUEST: {
            return state;
        }
        case EDIT_POST_SUCCESS: {
            let index = state.posts.findIndex(post => post._id === action.payload.data._id);
            state.post = action.payload.data;
            state.posts[index] = action.payload.data;
            return state;
        }
        case EDIT_POST_FAILURE: {
            return {
                ...state,
                error: action.error
            }
        }

        //ADD COMMENT TO POST
        case ADD_COMMENT_REQUEST: {
            return state;
        }
        case ADD_COMMENT_SUCCESS: {
            let index = state.posts.findIndex(post => post._id === action.payload.data._id);
            state.post = action.payload.data;
            state.posts[index] = action.payload.data;
            return state;
        }
        case ADD_COMMENT_FAILURE: {
            return {
                ...state,
                error: action.error
            }
        }

        //REMOVE COMMENT
        case REMOVE_COMMENT_REQUEST: {
            return state
        }
        case REMOVE_COMMENT_SUCCESS: {
            let index = state.posts.findIndex(post => post._id === action.payload.data._id);
            state.posts[index] = action.payload.data;
            state.post = action.payload.data;
            return state;
        }
        case REMOVE_COMMENT_FAILURE: {
            return {
                ...state,
                error: action.error
            }
        }

        //EDIT COMMENT
        case EDIT_COMMENT_REQUEST: {
            return state
        }
        case EDIT_COMMENT_SUCCESS: {
            let index = state.posts.findIndex(post => post._id === action.payload.data._id);
            state.post = action.payload.data;
            state.posts[index] = action.payload.data;
            return state;
        }
        case EDIT_COMMENT_FAILURE: {
            return {
                ...state,
                error: action.error
            }
        }
        default:
            return state;
    }
}