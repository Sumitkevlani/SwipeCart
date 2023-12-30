import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, CLEAR_ERRORS } from '../constants/forgotPasswordConstants.js';

import axios from 'axios';

const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        const config = { headers: { "Content-type": "application/json" }, withCredentials: true };
        const { data } = await axios.post(
            `/api/user/forgot-password`,
            email,
            config
        );
        // console.log(data);
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
    }
    catch (error) {
        console.log("here", error);
        dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error });
    }
};

const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        const config = { headers: { "Content-type": "application/json" }, withCredentials: true };
        const { data } = await axios.put(
            `/api/user/password/reset/${token}`,
            passwords,
            config
        );
        // console.log(data);
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    }
    catch (error) {
        console.log("here", error);
        dispatch({ type: RESET_PASSWORD_FAILURE, payload: error.response.data.message });
    }
};

const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export { forgotPassword, resetPassword, clearErrors };