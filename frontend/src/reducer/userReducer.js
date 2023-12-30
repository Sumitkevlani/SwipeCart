import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, LOGOUT_FAILURE, LOGOUT_SUCCESS, CLEAR_ERRORS } from "../constants/userConstant.js";

const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loading: true,
                // isAuthenticated: false
            };
        case REGISTER_REQUEST:
            return {
                loading: true,
                // isAuthenticated: false
            };
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                // isAuthenticated: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case LOAD_USER_FAILURE:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};


export { userReducer };