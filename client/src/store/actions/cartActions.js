import axios from 'axios'
import * as types from './types'

export const createCart = (branchId, history) => async dispatch => {
    try {
        dispatch({ type: types.CREATE_CART_REQUEST })
        const { data } = await axios.post('http://localhost:1000/api/carts/', { branchId }, {
            headers: {
                'authorization': `${localStorage.token}`
            }
        })
        dispatch({ type: types.CREATE_CART_SUCCESS, payload: data })
        history.push('/categories')
    } catch (err) {
        dispatch({ type: types.CREATE_CART_FAIL, payload: err.message })
    }
}

export const closeCart = (cart) => async dispatch => {
    try {
        dispatch({ type: types.CLOSE_CART_REQUEST })
        console.log(cart)
        const { data } = await axios.put(`http://localhost:1000/api/carts/${cart}`, {
            headers: {
                'authorization': `${localStorage.token}`
            }
        })
        dispatch({ type: types.CLOSE_CART_SUCCESS })
        console.log(data)
    } catch (err) {
        dispatch({ type: types.CLOSE_CART_FAIL, payload: err.message })
    }
}

export const editCart = cart => async dispatch => {
    try {
        dispatch({ type: types.EDIT_CART_REQUEST })
        console.log(cart)
        const { data } = await axios.put(`http://localhost:1000/api/carts/uncompleted/${cart}`, {
            headers: {
                'authorization': `${localStorage.token}`
            }
        })
        dispatch({ type: types.EDIT_CART_SUCCESS })
        console.log(data)
    } catch (err) {
        dispatch({ type: types.EDIT_CART_FAIL, payload: err.message })
    }
}

export const getUncompletedCart = branchId => async dispatch => {
    try {
        dispatch({ type: types.GET_CART_REQUEST })
        const { data } = await axios.get(`http://localhost:1000/api/carts/uncompleted/${branchId}`, {
            headers: {
                'authorization': `${localStorage.token}`
            }
        })
        console.log(data)
        if (data && data.error) {
            dispatch({ type: types.CREATE_CART_FAIL, payload: data.message })
            return
        }
        dispatch({ type: types.GET_CART_SUCCESS, payload: data })
    } catch (err) {
        console.log(err)
        dispatch({ type: types.GET_CART_FAIL, payload: err.message })
    }
}