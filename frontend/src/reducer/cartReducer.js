import { ADD_TO_CART, REMOVE_CART_ITEM, REMOVE_ALL_ITEMS, SAVE_SHIPPING_INFO } from "../constants/cartConstants.js";

let initialState = {
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    shippingInfo: localStorage.getItem('shippingInfo')
        ? JSON.parse(localStorage.getItem('shippingInfo'))
        : {}
};

const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            
            const isItemExist = state.cartItems.find((i)=>i.product === item.product);

            if(isItemExist){
                return {
                    ...state,
                    cartItems: state.cartItems.map((i)=>i.product===item.product?item:i)
                };
            }
            else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            };
        
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i)=>i.product!==action.payload)
            };
        
        case REMOVE_ALL_ITEMS:
            return {
                ...state,
                cartItems: []
            };

        default: 
            return state;
    }
};

export { cartReducer };