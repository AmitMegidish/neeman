import * as types from '../actions/types'

const initialState = {};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CATEGORIES_REQUEST:
            return { ...state, loading: true };
        case types.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload.categories
            };
        case types.GET_CATEGORIES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.SET_ACTIVE_CATEGORY:
            return {
                ...state,
                activeCategory: action.payload
            }
        default:
            return state;
    }
};
