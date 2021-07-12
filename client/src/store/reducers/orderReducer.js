import * as types from '../actions/types'

const initialState = {};

export const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_ORDER_REQUEST:
            return { ...state, loading: true };
        case types.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                order: action.payload.newOrder
            };
        case types.CREATE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.RESET_MESSAGE:
            return {};

        case types.GET_RECENT_ORDERS_REQUEST:
            return { ...state, loading: true };
        case types.GET_RECENT_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                recentOrders: action.payload
            };
        case types.GET_RECENT_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };



            case types.MARK_ORDER_EDITED_REQUEST:
                return { ...state, loading: true };
            case types.MARK_ORDER_EDITED_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    // message: action.payload.message,
                    order: action.payload
                };
            case types.MARK_ORDER_EDITED_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload
                };




                case types.UPDATE_ORDER_REQUEST:
                    return { ...state, loading: true };
                case types.UPDATE_ORDER_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        // message: action.payload.message,
                        order: action.payload
                    };
                case types.UPDATE_ORDER_FAIL:
                    return {
                        ...state,
                        loading: false,
                        error: action.payload
                    };







        default:
            return state;
    }
};
