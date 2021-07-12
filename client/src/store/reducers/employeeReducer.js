import * as types from '../actions/types'

const initialState = {};

export const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_EMPLOYEES_REQUEST:
            return { ...state, loading: true };
        case types.GET_EMPLOYEES_SUCCESS:
            return {
                ...state,
                loading: false,
                employees: action.payload
            };
        case types.GET_EMPLOYEES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
