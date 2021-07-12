import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap';
import Spinner from '../../../components/Spinner/Spinner'


const CartItemsList = () => {
    const { cartItems, error, loading } = useSelector(state => state.cartItems)

    return (
        <>
            {(() => {
                if (error) {
                    return <h1>Error!</h1>
                }
                if (loading) {
                    return <Spinner />
                }
                if (cartItems) {
                    return (
                        <>
                            <Row className="text-right pt-2">
                                <Col className="text-right">
                                    <h4>:פירוט הזמנה</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-right" xs={6} md={8}>
                                    <h5>
                                        כמות
                                    </h5>
                                </Col>
                                <Col className="text-right" xs={6} md={4}>
                                    <h5>
                                        שם המוצר
                                    </h5>
                                </Col>
                                {cartItems.map(cartItem => {
                                    return (
                                        <React.Fragment key={cartItem._id}>
                                            <Col className="text-right" xs={6} md={8}>
                                                {cartItem.qty}
                                            </Col>
                                            <Col className="text-right" xs={6} md={4}>
                                                {cartItem.product.name}
                                            </Col>
                                        </React.Fragment>
                                    )
                                })}
                            </Row>
                        </>
                    )
                }
            })()}
        </>
    )
}

export default CartItemsList
