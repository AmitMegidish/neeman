import axios from 'axios'
import * as types from './types'

export const getProducts = (categoryId) => async dispatch => {
    try {
        dispatch({ type: types.GET_PRODUCTS_REQUEST })
        const { data } = await axios.get(`http://localhost:1000/api/products/${categoryId}`, {
            headers: {
                'authorization': `${localStorage.token}`
            }
        })
        dispatch({ type: types.GET_PRODUCTS_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: types.GET_PRODUCTS_FAIL, payload: err.message })
    }
}
