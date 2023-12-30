import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    MY_ORDERS_FAILURE,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    ORDER_DETAIL_FAILURE,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    CLEAR_ERRORS
} from '../constants/orderConstants.js';

import axios from 'axios';

const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });

        const config = { headers: { "Content-type": "application/json" }, withCredentials: true };

        const { data } = await axios.post(
            `/api/order/create-order`,
            order,
            config
        );
        localStorage.setItem("cartItems",[]);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

    } catch (error) {
        console.log(error.response.data.message);
        dispatch({ type: CREATE_ORDER_FAILURE, error: error })
    }
};

const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });

        const config = { withCredentials: true };

        const { data } = await axios.get(
            `/api/order/get-my-orders`,  
            config
        );
        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });

    } catch (error) {
        console.log(error);
        dispatch({ type: MY_ORDERS_FAILURE, error: error })
    }
};

const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAIL_REQUEST });

        const config = { withCredentials: true };

        const { data } = await axios.get(
            `/api/order/get-single-order/${id}`,
            config
        );
        console.log(data);
        dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data.order });

    } catch (error) {
        console.log(error);
        dispatch({ type: ORDER_DETAIL_FAILURE, error: error });
    }
};

const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export { createOrder, myOrders, getOrderDetails, clearErrors };