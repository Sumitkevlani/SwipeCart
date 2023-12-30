import {
    ALL_PRODUCT_FAILURE,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAILURE,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    ADMIN_PRODUCT_FAILURE,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    NEW_REVIEW_FAILURE,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_PRODUCT_FAILURE,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_SUCCESS,
    CLEAR_ERRORS
} from "../constants/productConstants";

import axios from 'axios';

const getProduct = (keyword = "", currentPage = 1, price = [0, 100000], category, rating = 0) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        let link = `/api/product/get-all-products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;

        if (category) {
            console.log(category);
            link = `/api/product/get-all-products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
        }
        const response = await axios.get(link);
        const data = response.data;
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        });
    }
    catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAILURE,
            payload: error
        });
    }
};

const getProductsByAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCT_REQUEST });
        const config = { withCredentials: true };
        const response = await axios.get(`/api/product/admin/products`, config);
        const data = response.data;
        console.log(data);
        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products
        });
    }
    catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAILURE,
            payload: error
        });
    }
};

const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const response = await axios.get(`/api/product/get-product-details/${id}`);
        const data = response.data;

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAILURE,
            payload: error
        });
    }
};


const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
        const { data } = await axios.put(`/api/product/reviews`, reviewData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: NEW_REVIEW_FAILURE,
            payload: error
        });
    }
};

const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
        const { data } = await axios.put(`/api/product/admin/create-product/new`, productData, config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data.success
        })
    }
    catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAILURE,
            payload: error
        });
    }
};

const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export { clearErrors, getProduct, createProduct, getProductDetails, newReview, getProductsByAdmin };