import {
    STRIPE_KEY_REQUEST, 
    STRIPE_KEY_SUCCESS, 
    STRIPE_KEY_FAILURE, 
    CLEAR_ERRORS
} from '../constants/stripeKeyConstants.js';

const stripeKeyReducer = (state = {}, action) => {
    switch (action.type) {
        case STRIPE_KEY_REQUEST:
            return {
                ...state,
                loading: true
            };
        case STRIPE_KEY_SUCCESS:
            return {
                ...state,
                loading: false,
                stripeApiKey: action.payload
            };
        case STRIPE_KEY_FAILURE:
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



export { stripeKeyReducer };