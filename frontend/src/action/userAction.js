import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, LOGOUT_FAILURE, LOGOUT_SUCCESS, CLEAR_ERRORS } from "../constants/userConstant.js";

import axios from 'axios';

const login = (email, password) => async (dispatch) => {
    try{
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: {"Content-Type": "application/json"}, withCredentials: true };

        const response = await axios.post(
            `/api/user/login`,
            { email, password },
            config
        );
        const {data} = response;
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    }
    catch(error){
        dispatch({ type: LOGIN_FAILURE, payload: error });
    }
};

const register = (userData) => async (dispatch) => {
    try{
        dispatch({ type: REGISTER_REQUEST });
        const config = { headers: { "Content-type":"multipart/form-data;boundary=<calculated when request is sent>"} };
        const {data} = await axios.post(
            `/api/user/register`,
            userData,
            config
        );
        console.log(data);
        dispatch({ type: REGISTER_SUCCESS, payload: data.user });
    }
    catch(error){
        console.log("here",error);
        dispatch({ type: REGISTER_FAILURE, payload: error });
    }
};

const loadUser = () => async (dispatch) => {
    try {
        const config = { withCredentials: true };
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get(
            `/api/user/profile`,
            config
        );

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    }
    catch (error) {
        dispatch({ type: LOAD_USER_FAILURE });
    }
};

const logout = () => async (dispatch) => {
    try {
        const config = { withCredentials: true };
        await axios.get(
            `/api/user/logout`,
            config
        ); 
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        console.log(error);
        dispatch({type: LOGOUT_FAILURE, payload: error})
    }
};

const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export { login, register, loadUser, logout, clearErrors };