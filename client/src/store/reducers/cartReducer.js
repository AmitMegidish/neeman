import * as types from '../actions/types'

const initialState = {};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_CART_REQUEST:
            return { ...state, loading: true };
        case types.CREATE_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                activeCart: action.payload.createdCart,
                error: null
            };
        case types.CREATE_CART_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.GET_CART_REQUEST:
            return { ...state, loading: true };
        case types.GET_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                activeCart: action.payload.cart
            };
        case types.GET_CART_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.CLOSE_CART_REQUEST:
            return { ...state, loading: true };
        case types.CLOSE_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                activeCart: undefined
            };
        case types.CLOSE_CART_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.EDIT_CART_REQUEST:
            return { ...state, loading: true };
        case types.EDIT_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                // activeCart: action.payload.editCard
            };
        case types.EDIT_CART_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
