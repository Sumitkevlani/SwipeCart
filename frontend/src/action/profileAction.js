import { UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE, CLEAR_ERRORS } from '../constants/profileConstants.js';

import axios from 'axios';

const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const config = { headers: { "Content-type": "multipart/form-data;boundary=<calculated when request is sent>" }, withCredentials: true };
        const { data } = await axios.put(
            `/api/user/update-profile`,
            userData,
            config
        );
        console.log(data);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.user });
    }
    catch (error) {
        console.log("here", error);
        dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error });
    }
};

const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export { updateProfile, clearErrors };