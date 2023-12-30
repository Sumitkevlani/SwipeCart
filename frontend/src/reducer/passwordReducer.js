import { UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_RESET, UPDATE_PASSWORD_FAILURE, CLEAR_ERRORS } from '../constants/passwordConstants.js';

const passwordReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true
            };
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                isUpdated: false
            };
        case UPDATE_PASSWORD_FAILURE:
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

export { passwordReducer };