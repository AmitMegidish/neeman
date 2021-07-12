import axios from 'axios'
import * as types from './types'
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';


export const userLogin = (username, password) => async dispatch => {
    try {
        dispatch({ type: types.LOGIN_REQUEST })
        const { data } = await axios.post('http://localhost:1000/api/auth/login', { username, password })
        if (data.error) {
            toast.error(data.message)
            dispatch({ type: types.LOGIN_FAIL, payload: data.message })
            return
        }
        localStorage.token = data.token
        const { _doc } = jwtDecode(data.token)
        toast.success(data.message)
        dispatch({ type: types.LOGIN_SUCCESS, payload: _doc})
    } catch (err) {
        toast.error("שם משתמש או סיסמא שגויים")
        dispatch({ type: types.LOGIN_FAIL, payload: err.message })
    }
}

export const userLogout = () => dispatch => {
    try {
        localStorage.removeItem('token')
        dispatch({ type: types.LOGOUT })
    } catch (err) {
        dispatch({ type: types.LOGIN_FAIL, payload: err.message })
    }
}