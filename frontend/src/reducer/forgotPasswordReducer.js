import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, CLEAR_ERRORS } from '../constants/forgotPasswordConstants.js';

const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            };
        case FORGOT_PASSWORD_FAILURE:
        case RESET_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export { forgotPasswordReducer };