import React, { useEffect, useState } from 'react'
import { ListGroup, Col, Row, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import GoBackHeading from '../GoBackHeading'
import Spinner from '../Spinner/Spinner'
import axios from 'axios'


const RecentOrders = () => {
    const history = useHistory()

    const [branches, setBranches] = useState([])
    const [recentOrders, setRecentOrders] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const goBackHandler = () => history.push('/')

    useEffect(() => {
        let unmounted = false
        const asyncFetch = async () => {
            let { data } = await axios("http://localhost:1000/api/auth");
            console.log(data)
            if (!unmounted) {
                setBranches(data.branches)
            }
        }
        asyncFetch()
        return () => {
            unmounted = true
        }
    }, [])

    const onChangeHandler = async (e) => {
        setIsLoading(true)
        const { data } = await axios.get(`http://localhost:1000/api/orders/${e.target.value}`, {
            headers: {
                'authorization': `${localStorage.token}`
            }
        })
        setRecentOrders(data.orders)
        setIsLoading(false)
    }

    return (
        <ListGroup className="mt-2 rounded">
            <GoBackHeading title="הזמנות" buttonHandler={goBackHandler} />
            <Col xs={10} md={6} lg={4} className="mx-auto">
                <Form className="mt-2">
                    <Form.Control as="select" value="" custom onChange={onChangeHandler} dir="rtl">
                        <option disabled value="">בחר סניף</option>
                        {branches.map(branch => {
                            return (
                                !branch.isAdmin && <option key={branch._id} value={branch._id} name={branch.name}>{branch.name}</option>
                            )
                        })}
                    </Form.Control>
                </Form>
            </Col>
            <ListGroup.Item className="font-weight-bold text-right mt-3">
                <Row>
                    <Col>אספקה</Col>
                    <Col>שליחה</Col>
                    <Col>שם השולח</Col>
                </Row>
            </ListGroup.Item>
            {(() => {
                if (isLoading) {
                    return <Spinner />

                }
                if (recentOrders.length > 0) {
                    return recentOrders.map(rc => {
                        return (
                            <Button
                                key={rc._id}
                                className={`bg-white text-right text-dark font-weight-bold mt-1 rounded`}
                            >
                                <Row>
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
                    })
                }
            })()}
        </ListGroup>
    )
}

export default RecentOrders
