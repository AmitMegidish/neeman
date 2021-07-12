import axios from 'axios'
import * as types from './types'

export const sendEmail = body => async dispatch => {
    try {
        dispatch({ type: types.SEND_EMAIL_REQUEST })
        const { data } = await axios.post('http://localhost:1000/api/sendEmail', body, {
            headers: {
                'authorization': `${localStorage.token}`
            }
        })
        dispatch({ type: types.SEND_EMAIL_SUCCESS, payload: data.message })
    } catch (err) {
        dispatch({ type: types.SEND_EMAIL_FAIL, payload: err.message })
    }
}
