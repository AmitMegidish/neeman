import React from 'react'
import { Row, Col, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import Spinner from '../../../components/Spinner/Spinner'

const SelectEmployee = ({ employee, setEmployee }) => {
    const { employees, loading, error } = useSelector(state => state.employees)

    return (
        <Row>
            <Col xs={7} className="mx-auto">
                {(() => {
                    if (error) {
                        return <h1>Error!</h1>
                    }
                    if (loading) {
                        return <Spinner />
                    }
                    if (employees) {
                        return (
                            <>
                                <Form.Text className="text-muted text-center">
                                    :נשלח על ידי
                                </Form.Text>
                                <Form.Control as="select" custom className="shadow-sm" value={employee} onChange={e => setEmployee(e.target.value)} dir="rtl">
                                    <option disabled value="">בחר עובד</option>
                                    {employees.map(employee => <option key={employee._id} value={JSON.stringify(employee)}>{employee.firstName}</option>)}
                                </Form.Control>
                            </>
                        )
                    }
                })()}
            </Col>
        </Row>
    )
}

export default SelectEmployee
