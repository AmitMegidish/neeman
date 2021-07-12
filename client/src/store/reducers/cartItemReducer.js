import * as types from '../actions/types'

const initialState = { cartItems: [] };

export const cartItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CART_ITEMS_REQUEST:
            return { ...state, loading: true };
        case types.GET_CART_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: action.payload
            };
        case types.GET_CART_ITEMS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.ADD_CART_ITEM_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.ADD_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: [...state.cartItems, action.payload]
            };
        case types.ADD_CART_ITEM_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.REMOVE_CART_ITEM_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: [...state.cartItems].filter(cartItem => cartItem._id !== action.payload._id)
            };
        case types.REMOVE_CART_ITEM_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.UPDATE_CART_ITEM_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.UPDATE_CART_ITEM_SUCCESS:
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload.id)
            const cartItemsCopy = [...state.cartItems]
            cartItemsCopy[itemIndex].qty = action.payload.qty
            return {
                ...state,
                loading: false,
                cartItems: cartItemsCopy
            };
        case types.UPDATE_CART_ITEM_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
