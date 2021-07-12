import axios from 'axios'
import * as types from './types'
import { toast } from 'react-toastify';

export const getCartItems = cartId => async (dispatch, getState) => {
    try {
        dispatch({ type: types.GET_CART_ITEMS_REQUEST })
        const { data } = await axios.get(`http://localhost:1000/api/cartItems/${cartId}`, {
            headers: {
                'authorization': `${localStorage.token}`
            }
        })
        console.log(data)
        dispatch({ type: types.GET_CART_ITEMS_SUCCESS, payload: data.items })
        // const { cartItems } = getState()
        // console.log(cartItems)
    } catch (err) {
        dispatch({ type: types.GET_CART_ITEMS_FAIL, payload: err.message })
    }
}

export const addCartItem = (cart, product, qty) => async (dispatch, getState) => {
    try {
        dispatch({ type: types.ADD_CART_ITEM_REQUEST })
        const { data } = await axios.post(`http://localhost:1000/api/cartItems/`, { cart, product: product._id, qty }, {
            headers: {
                'authorization': `${localStorage.token}`
            }
        })
        console.log("dataAction", data.addedCartItem)
        dispatch({ type: types.ADD_CART_ITEM_SUCCESS, payload: data.addedCartItem })
        toast.dark(`המוצר ${product.name} נוסף בהצלחה`, { autoClose: 2000 })
        // setMethod("")
        // console.log("reset Method State to empty string (add)")
    } catch (err) {
        dispatch({ type: types.ADD_CART_ITEM_FAIL, payload: err.message })
    }
}

export const removeCartItem = (itemId) => async dispatch => {
    try {
        dispatch({ type: types.REMOVE_CART_ITEM_REQUEST })
        const { data } = await axios.delete(`http://localhost:1000/api/cartItems/${itemId}`, {
            headers: {
                'authorization': `${localStorage.token}`
            }
        })
        dispatch({ type: types.REMOVE_CART_ITEM_SUCCESS, payload: data.removedItem })
    } catch (err) {
        dispatch({ type: types.REMOVE_CART_ITEM_FAIL, payload: err.message })
    }
}

export const updateCartItem = (id, qty) => async dispatch => {
    console.log("qty from carItem ACTION:", qty)
    try {
        dispatch({ type: types.UPDATE_CART_ITEM_REQUEST })
        const { data } = await axios.put(`http://localhost:1000/api/cartItems/`, { id, qty }, {
            headers: {
                'authorization': `${localStorage.token}`
            }
        })
        const { updatedCartItem } = data
        console.log("UpdateAction", updatedCartItem)
        dispatch({ type: types.UPDATE_CART_ITEM_SUCCESS, payload: { id, qty } })

    } catch (err) {
        dispatch({ type: types.UPDATE_CART_ITEM_FAIL, payload: err.message })
    }
}
