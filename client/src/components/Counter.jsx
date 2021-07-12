import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import { addCartItem, updateCartItem, removeCartItem } from '../store/actions/cartItemActions';

const Counter = ({ product }) => {
    const dispatch = useDispatch();

    const { cartItems } = useSelector(state => state.cartItems);
    const { activeCart } = useSelector(state => state.cart);

    const [isClicked, setIsClicked] = useState(false)

    const initQty = () => {
        const isCartItem = cartItems.find(item => item.product._id === product._id)
        if (isCartItem) {
            return isCartItem.qty;
        }
        return 0;
    };

    const [qty, setQty] = useState(initQty);

    useEffect(() => {
        const cartItemHandler = () => {
            const isCartItem = cartItems.find(item => item.product._id === product._id);

            if (!isCartItem && isClicked) {
                dispatch(addCartItem(activeCart._id, product, qty));
                return;
            }

            if (isCartItem && isClicked && qty > 0) {
                dispatch(updateCartItem(isCartItem._id, qty));
                return;
            }

            if (isCartItem && isClicked && qty === 0) {
                dispatch(removeCartItem(isCartItem._id));
                return;
            }
        };

        const timer = setTimeout(cartItemHandler, 600);

        return () => clearTimeout(timer);

    }, [qty]);

    return (
        <Col
            xs={5}
            s={3}
            lg={2}
            className="d-flex justify-content-between"
        >

            <Button
                variant="info"
                onClick={() => {
                    setIsClicked(true)
                    setQty(q => q += 1)
                }}
            >
                +
            </Button>

            <h3 className="my-auto">{qty}</h3>

            <Button
                variant="info"
                disabled={qty === 0}
                onClick={() => {
                    setIsClicked(true)
                    setQty(q => q - 1)
                }}
            >
                -
            </Button>
        </Col>
    );
};

export default Counter;
