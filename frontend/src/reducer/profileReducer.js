import { UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_RESET, UPDATE_PROFILE_FAILURE, CLEAR_ERRORS } from '../constants/profileConstants.js';

const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true
            };
        case UPDATE_PROFILE_RESET:
            return {
                ...state,
                isUpdated: false
            };
        case UPDATE_PROFILE_FAILURE:
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

export { profileReducer };