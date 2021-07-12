import * as types from '../actions/types'
import jwtDecode from 'jwt-decode';


let initialState = {};

if (localStorage.token) {
    const { _doc } = jwtDecode(localStorage.token)
    initialState = { activeUser: _doc }
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return { ...state, loading: true, };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                activeUser: action.payload
            };
        case types.LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
            case types.LOGOUT:
                return {};
        default:
            return state;
    }
};
