import React from 'react'
import { Button, Row, Col } from 'react-bootstrap';

const GoBackHeading = ({ buttonHandler, title }) => {

    return (
        <Row>
            <Col xs={3} md={2} lg={1}>
                <Button onClick={buttonHandler} style={{ fontSize: "13px", width: "100px !important" }} className="w-100 p-2 mt-1 shadow" variant="info">חזור</Button>
            </Col>
            <Col xs={9} md={10} lg={11}>
                <h1 className="m-0 text-right">{title}</h1>
            </Col>
        </Row>
    )
}

export default GoBackHeading
