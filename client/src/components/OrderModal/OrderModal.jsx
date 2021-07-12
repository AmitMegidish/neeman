import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap';
import BeforeSubmission from './BeforeSubmission/BeforeSubmission';
// import AfterSubmission from './AfterSubmission/AfterSubmission';

function OrderModal({ history }) {
    const { cartItems } = useSelector(state => state.cartItems)
    // const { message } = useSelector(state => state.order)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="text-center mt-2">
                <Button onClick={handleShow}
                    className="shadow"
                    disabled={cartItems && !cartItems.length}
                    variant="info"
                    style={{ fontSize: "14px" }}>
                    שלח הזמנה
                </Button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className="mx-auto pb-1">
                    <Modal.Title>סיכום הזמנה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BeforeSubmission handleClose={handleClose} />
                    {/* {!message ? <BeforeSubmission handleClose={handleClose} />
                        : <AfterSubmission title={message} history={history} />
                    } */}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default OrderModal
