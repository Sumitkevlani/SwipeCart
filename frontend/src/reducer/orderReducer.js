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

const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            };
        case CREATE_ORDER_FAILURE:
            return {
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

const myOrdersReducer = (state = [], action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            };
        case MY_ORDERS_FAILURE:
            return {
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

const orderDetailReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAIL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ORDER_DETAIL_SUCCESS:
            return {
                loading: false,
                order: action.payload
            };
        case ORDER_DETAIL_FAILURE:
            return {
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

export { newOrderReducer, myOrdersReducer, orderDetailReducer };