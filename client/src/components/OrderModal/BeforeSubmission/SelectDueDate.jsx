import React from 'react'
import { Row, Col, Form } from 'react-bootstrap';

const today = () => new Date().toISOString().slice(0, 10);

const SelectDueDate = ({ setDueDate, dueDate }) => {
    return (
        <Row className="mb-2">
            <Col xs={7} className="mx-auto">
                <Form.Text className="text-muted text-center">
                    :אנא בחר תאריך אספקה
            </Form.Text>
                <Form.Control className="shadow-sm" min={today()} onChange={e => setDueDate(e.target.value)} type="date" value={dueDate} />
            </Col>
        </Row>
    )
}

export default SelectDueDate
