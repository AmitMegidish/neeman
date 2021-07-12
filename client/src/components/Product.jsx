import React from 'react'
import { ListGroup, Row, Col } from 'react-bootstrap';
import Counter from './Counter';

const Product = ({ product }) => {
    return (
        <>
            <ListGroup.Item className="my-1 p-2 text-right border shadow-sm" >
                <Row>
                    <Counter product={product} />
                    <Col className="my-auto" xs={7} s={9} lg={10}>
                        {product.name}
                    </Col>
                </Row>
            </ListGroup.Item>
        </>
    )
}

export default Product
