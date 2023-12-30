import { ADD_TO_CART, REMOVE_CART_ITEM, REMOVE_ALL_ITEMS, SAVE_SHIPPING_INFO } from "../constants/cartConstants.js";

import axios from 'axios';

const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const response = await axios.get(`/api/product/get-product-details/${id}`);
    const { data } = response;
    console.log(data);
    dispatch({ 
        type: ADD_TO_CART, 
        payload: 
        { 
            product: data._id, 
            name: data.name, 
            price: data.price,
            image: data.images[0],
            stock: data.stock,
            quantity
        } 
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


const removeItemFromCart = (id) => async (dispatch, getState) => {
    
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const removeAllItems = () => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_ALL_ITEMS
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    });

    localStorage.setItem("shippingInfo",JSON.stringify(data));
};

export { addItemToCart, removeItemFromCart, removeAllItems, saveShippingInfo };       