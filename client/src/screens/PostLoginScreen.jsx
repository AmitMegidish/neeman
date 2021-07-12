import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Col, Row } from 'react-bootstrap';
import { createCart, getUncompletedCart } from '../store/actions/cartActions'
import { getCartItems } from '../store/actions/cartItemActions'
import Spinner from '../components/Spinner/Spinner'
import AdminOptions from '../components/AdminUI/AdminOptions';
import { useHistory } from 'react-router-dom'

const PostLoginScreen = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { activeUser } = useSelector(state => state.user)
    const { activeCart, loading } = useSelector(state => state.cart)

    useEffect(() => {
        if (activeUser && !activeUser.isAdmin) {
            dispatch(getUncompletedCart(activeUser._id))
        }
    }, [activeUser, dispatch])

    useEffect(() => {
        dispatch({ type: "RESET_MESSAGE" })
    }, [dispatch])

    useEffect(() => {
        if (activeCart) {
            if (activeCart._id) {
                dispatch(getCartItems(activeCart._id))
            }
        }
    }, [activeCart, dispatch])

    const newCartHandler = () => {
        dispatch(createCart(activeUser._id, history))
    }

    const cartButton = (
        <Button
            className="ui-button shadow-sm"
            variant="info"
            onClick={!activeCart ? newCartHandler : () => history.push('/categories')}
        >
            {!activeCart ? "הזמנה חדשה" : "המשך הזמנה"}
        </Button>
    )

    return (
        <>
            {(() => {
                if (loading) {
                    return <Spinner />
                }
                if (activeUser && activeUser.isAdmin) {
                    return <AdminOptions />
                }
                else {
                    return (
                        <div className="h-100 d-flex justify-content-center flex-column mx-auto">
                            <Row className="mb-2">
                                <Col xs={10} sm={8} lg={6} className="mx-auto text-center">
                                    {cartButton}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={10} sm={8} lg={6} className="mx-auto text-center">
                                    <Button
                                        className="ui-button shadow-sm"
                                        variant="info"
                                        onClick={() => history.push('/recentOrders')}
                                    >הזמנות אחרונות</Button>
                                </Col>
                            </Row>
                        </div>
                    )
                }
            })()}
        </>
    )
}

export default PostLoginScreen
