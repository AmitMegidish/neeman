import * as types from '../actions/types'

const initialState = {};

export const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SEND_EMAIL_REQUEST:
            return { ...state, loading: true };
        case types.SEND_EMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            };
        case types.SEND_EMAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
