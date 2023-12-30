import { UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE, CLEAR_ERRORS } from '../constants/passwordConstants.js';

import axios from 'axios';

const updatePassword = (userData) => async (dispatch) => {
    try {
        console.log(userData);
        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        const config = { headers: { "Content-type": "application/json" }, withCredentials: true };
        const { data } = await axios.put(
            `http://127.0.0.1:5000/api/user/update-password`,
            userData,
            config
        );
        console.log(data);
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
    }
    catch (error) {
        console.log("here", error);
        dispatch({ type: UPDATE_PASSWORD_FAILURE, payload: error });
    }
};

const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export { updatePassword, clearErrors };