import axios from 'axios'
import * as types from './types'
import { closeCart } from './cartActions'
import { sendEmail } from './emailActions'
import { toast } from 'react-toastify';

export const createOrder = info => async (dispatch, getState) => {
    try {
        const body = {
            branch: info.branch._id,
            employee: info.employee._id,
            cart: info.cart,
            orderedAt: info.orderedAt,
            dueDate: info.dueDate
        }

        dispatch({ type: types.CREATE_ORDER_REQUEST })
        const { data } = await axios.post('http://localhost:1000/api/orders/', body, {
            headers: {
                'authorization': `${localStorage.token}`
            }
        })
        toast.success(`✅ הזמנה נשלחה בהצלחה`, { autoClose: 3000 })
        dispatch({ type: types.CREATE_ORDER_SUCCESS, payload: data })

        const { order } = getState()
        const { cartItems } = getState()

        const emailBody = {
            employee: info.employee.firstName,
            branch: info.branch.name,
            dueDate: order.order.dueDate,
            cartItems: cartItems.cartItems,
            orderId: order.order._id
        }
        dispatch(sendEmail(emailBody))
        dispatch(closeCart(info.cart))

    } catch (err) {
        dispatch({ type: types.CREATE_ORDER_FAIL, payload: err.message })
    }
}

export const getRecentOrders = branchId => async dispatch => {
    try {
        dispatch({ type: types.GET_RECENT_ORDERS_REQUEST })
        const { data } = await axios.get(`http://localhost:1000/api/orders/${branchId}`, {
            headers: {
                'authorization': `${localStorage.token}`
            }
        })
        console.log(data)

        if (data.error) {
            dispatch({ type: types.GET_RECENT_ORDERS_FAIL, payload: data.message })
            return
        }
        dispatch({ type: types.GET_RECENT_ORDERS_SUCCESS, payload: data.orders })
    } catch (err) {
        dispatch({ type: types.GET_RECENT_ORDERS_FAIL, payload: err.message })
    }
}

export const setMarkAsEditedOrder = (OrderId) => async dispatch => {
    try {
        dispatch({ type: types.MARK_ORDER_EDITED_REQUEST })
        const { data } = await axios.put(`http://localhost:1000/api/orders/${OrderId}`, {
            headers: {
                'authorization': `${localStorage.token}`
            }
        })
        console.log(data)

        // if (data.error) {
        //     dispatch({ type: types.MARK_ORDER_EDITED_FAIL, payload: data.message })
        //     return
        // }
        dispatch({ type: types.MARK_ORDER_EDITED_SUCCESS, payload: data.updatedOrder })
    } catch (err) {
        dispatch({ type: types.MARK_ORDER_EDITED_FAIL, payload: err.message })
    }
}


export const updateOrder = (OrderId, body) => async (dispatch, getState) => {
    try {
        const { branch, employee, cart } = body

        dispatch({ type: types.UPDATE_ORDER_REQUEST })
        const { data } = await axios.put(`http://localhost:1000/api/orders/updateOrder/${OrderId}`, { body }, {
            headers: {
                'authorization': `${localStorage.token}`
            }
        })
        console.log(data)

        // if (data.error) {
        //     dispatch({ type: types.UPDATE_ORDER_FAIL, payload: data.message })
        //     return
        // }
        dispatch({ type: types.UPDATE_ORDER_SUCCESS, payload: data.updatedOrder })

        const { updatedOrder } = data
        const { cartItems } = getState()

        const emailBody = {
            employee: employee.firstName,
            branch: branch.name,
            dueDate: updatedOrder.dueDate,
            cartItems: cartItems.cartItems,
            orderId: updatedOrder._id
        }
        console.log(emailBody)
        dispatch(closeCart(cart))
        dispatch(sendEmail(emailBody))

    } catch (err) {
        dispatch({ type: types.UPDATE_ORDER_FAIL, payload: err.message })
    }
}