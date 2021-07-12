import axios from 'axios'
import * as types from './types'

export const getEmployees = branchId => async dispatch => {
    try {
        dispatch({ type: types.GET_EMPLOYEES_REQUEST })
        const { data } = await axios.get(`http://localhost:1000/api/employees/byBranch/${branchId}`, {
            headers: {
                'authorization': `${localStorage.token}`
            }
        })
        dispatch({ type: types.GET_EMPLOYEES_SUCCESS, payload: data.employees })
    } catch (err) {
        dispatch({ type: types.GET_EMPLOYEES_FAIL, payload: err.message })
    }
}
