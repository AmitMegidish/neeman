import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getRecentOrders } from '../store/actions/orderActions'
import { closeCart, editCart } from '../store/actions/cartActions'
import { ListGroup, Col, Row, Button } from 'react-bootstrap';
import Spinner from '../components/Spinner/Spinner'
import { useHistory } from "react-router-dom";
import { setMarkAsEditedOrder } from '../store/actions/orderActions'

const RecentOrdersList = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const { recentOrders, error, loading } = useSelector(state => state.order)
    const { activeUser } = useSelector(state => state.user)
    const { activeCart } = useSelector(state => state.cart)

    useEffect(() => {
        if (activeUser) {
            dispatch(getRecentOrders(activeUser._id))
        }
    }, [activeUser, activeCart, dispatch])

    const isEditable = (date, editCartId) => {
        if (date.slice(0, 10) === new Date(Date.now()).toISOString().split('.').join('-').slice(0, 10)) {
            return true
        }
        return false
    }

    const editOrderButtonHandler = (editCartId, orderId) => {
        // סיום עגלה הנוכחית במידה ויש,
        if (activeCart) {
            dispatch(closeCart(activeCart._id))
            // צריך להוסיף פה חלון ששואל האם לסגור עגלה קיימת לטובת עריכת הזמנה
        }
        // פתיחת העגלה הרצויה,
        dispatch(editCart(editCartId))

        // פתיחת ההזמנה הרצויה על מנת שזה לא יפתח הזמנה חדשה לעגלה שנערכה
        dispatch(setMarkAsEditedOrder(orderId))

        // להעביר מסך ל קטגוריות
        history.push('/categories')
    }



    return (
        <>
            {(() => {
                if (error) {
                    return <h1>Error!</h1>
                }
                if (loading) {
                    return <Spinner />
                }
                if (recentOrders) {
                    return (
                        <ListGroup className="mt-2 rounded">
                            <ListGroup.Item className="font-weight-bold text-right">
                                <Row>
                                    <Col>אספקה</Col>
                                    <Col>שליחה</Col>
                                    <Col>שם השולח</Col>
                                </Row>
                            </ListGroup.Item>
                            {recentOrders.map(rc => {
                                return (
                                    <Button
                                        key={rc._id}
                                        className={`shadow-sm bg-white text-right text-dark font-weight-bold mt-1 rounded 
                                        ${isEditable(rc.orderedAt) ? "border-success" : "border-danger"}`}
                                        onClick={() => isEditable(rc.orderedAt, rc.cart) && editOrderButtonHandler(rc.cart, rc._id)}
                                    >
                                        <Row>
                                            {activeCart && activeCart._id === rc.cart &&
                                                <Col>בעריכה</Col>
                                            }
                                            <Col>
                                                {rc.dueDate.slice(0, 10).split('-').reverse().join('/')}
                                            </Col>
                                            <Col>
                                                {rc.orderedAt.slice(0, 10).split('-').reverse().join('/')}
                                            </Col>
                                            <Col>
                                                {rc.employee.firstName}
                                            </Col>
                                        </Row>
                                    </Button>
                                )
                            })}
                        </ListGroup>
                    )
                }
            })()}
        </>
    )
}

export default RecentOrdersList
