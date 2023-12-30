import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { productReducer, newReviewReducer, productDetailsReducer, newProductReducer } from './reducer/productReducer.js';
import { userReducer } from './reducer/userReducer.js';
import { profileReducer } from './reducer/profileReducer.js';
import { passwordReducer } from './reducer/passwordReducer.js';
import { forgotPasswordReducer } from './reducer/forgotPasswordReducer.js';
import { cartReducer } from './reducer/cartReducer.js';
import { myOrdersReducer, newOrderReducer, orderDetailReducer } from './reducer/orderReducer.js';
import { stripeKeyReducer } from './reducer/stripeKeyReducer.js';

let initialState = {
    cart:
    {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
    }
};

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    password: passwordReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    stripeApiKey: stripeKeyReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer
});



const store = configureStore({
    reducer,
    initialState,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk),
});

export default store;