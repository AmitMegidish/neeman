import * as types from '../actions/types'

const initialState = {};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PRODUCTS_REQUEST:
            return { ...state, loading: true };
        case types.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.products
            };
        case types.GET_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
