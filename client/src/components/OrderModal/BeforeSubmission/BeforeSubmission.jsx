import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap';
import SelectDueDate from './SelectDueDate'
import SelectEmployee from './SelectEmployee'
import CartItemsList from './CartItemsList'
import { getEmployees } from '../../../store/actions/employeeActions'
import { createOrder } from '../../../store/actions/orderActions'
import { updateOrder } from '../../../store/actions/orderActions'


const BeforeSubmission = ({ handleClose }) => {
    const dispatch = useDispatch()
    const [dueDate, setDueDate] = useState(new Date());
    const [employee, setEmployee] = useState("");

    const { activeUser } = useSelector(state => state.user)
    const { activeCart } = useSelector(state => state.cart)

    const { order } = useSelector(state => state.order)

    useEffect(() => {
        if (activeUser) {
            dispatch(getEmployees(activeUser._id))
        }
    }, [dispatch, activeUser, activeCart, order])

    const submitOrderHandler = () => {
        if (!activeUser || !employee || !activeCart || !dueDate) {
            return
        }

        const body = {
            branch: activeUser,
            employee: JSON.parse(employee),
            cart: activeCart._id,
            orderedAt: new Date(Date.now()),
            dueDate
        }
        if (order) {
            dispatch(updateOrder(order._id, body))
            console.log("updateOrder")
        }
        if (!order) {
            dispatch(createOrder(body))
            console.log("createOrder")
        }
    }

    return (
        <>
            <SelectDueDate dueDate={dueDate} setDueDate={setDueDate} />
            <SelectEmployee employee={employee} setEmployee={setEmployee} />
            <CartItemsList />

            <div className="text-center mt-3">
                <Button className="m-1 shadow" variant="secondary" onClick={handleClose}>
                    חזור
                    </Button>
                <Button className="m-1 shadow" variant="info" onClick={submitOrderHandler}>שלח</Button>
            </div>
        </>
    )
}

export default BeforeSubmission
