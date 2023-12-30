import {
    STRIPE_KEY_REQUEST,
    STRIPE_KEY_SUCCESS,
    STRIPE_KEY_FAILURE,
    CLEAR_ERRORS
} from '../constants/stripeKeyConstants.js';

import axios from 'axios';

const generateStripeKey = () => async (dispatch) => {
    
    dispatch({ type: STRIPE_KEY_REQUEST });

    try {
        const config = { withCredentials: true };
        const { data } = await axios.get('/api/payment/stripeapikey', config);
        
        console.log(data);
        dispatch({
            type: STRIPE_KEY_SUCCESS,
            payload: data.stripeApiKey
        });
    } catch (error) {
        dispatch({
            type: STRIPE_KEY_FAILURE,
            payload: error
        });
    }
};

const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};


export { generateStripeKey, clearErrors };       