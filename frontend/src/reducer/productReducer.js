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
NEW_PRODUCT_FAILURE,
NEW_PRODUCT_REQUEST,
NEW_PRODUCT_RESET,
NEW_PRODUCT_SUCCESS,
NEW_REVIEW_FAILURE,
NEW_REVIEW_REQUEST,
NEW_REVIEW_SUCCESS,
NEW_REVIEW_RESET,
CLEAR_ERRORS
} from "../constants/productConstants";

const productReducer = (state = { products: [] }, action)=>{
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                product: []
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload.products,
                productCount: action.payload.productCount,
                filteredProductsCount: action.payload.filteredProductsCount
            };
        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload
            };
        case ALL_PRODUCT_FAILURE:
        case ADMIN_PRODUCT_FAILURE:
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

const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                product: {}
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            };
        case PRODUCT_DETAILS_FAILURE:
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

const newProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            };
        case NEW_PRODUCT_RESET:
            return {
                loading: false,
                success: false
            };
        case NEW_PRODUCT_FAILURE:
            return {
                ...state,
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

const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            };
        case NEW_REVIEW_RESET:
            return {
                loading: false,
                success: false
            };
        case NEW_REVIEW_FAILURE:
            return {
                ...state,   
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

export { productReducer, productDetailsReducer, newReviewReducer, newProductReducer };