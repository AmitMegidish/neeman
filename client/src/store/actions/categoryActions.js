import axios from 'axios'
import * as types from './types'

export const getCategories = () => async dispatch => {
    try {
        dispatch({ type: types.GET_CATEGORIES_REQUEST })
        const { data } = await axios.get('http://localhost:1000/api/categories/', {
            headers: {
                'authorization': `${localStorage.token}`
            }
        })
        dispatch({ type: types.GET_CATEGORIES_SUCCESS, payload: data })
    } catch (err) {
        dispatch({ type: types.GET_CATEGORIES_FAIL, payload: err.message })
    }
}

export const setCategory = categoryId => (dispatch, getState) => {
    const { categories: categoryState } = getState()
    const { categories } = categoryState
    const activeCategory = categories.filter(category => category._id === categoryId)
    dispatch({ type: types.SET_ACTIVE_CATEGORY, payload: activeCategory })
}
