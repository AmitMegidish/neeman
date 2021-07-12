import React from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const AdminOptions = () => {
    const history = useHistory();

    return (
        <div className="h-100 d-flex justify-content-center flex-column mx-auto">
            <Row className="my-2 mt-4">
                <Col xs={10} sm={8} lg={6} className="mx-auto">
                    <Button
                        className="ui-button w-100 p-3 shadow-sm"
                        variant="info"
                        onClick={() => history.push('admin/addEmployee')}
                    >
                        הוספת עובד
                    </Button>
                </Col>
            </Row>
            {/* <Row className="my-2 mt-2">
                <Col xs={10} sm={8} lg={6} className="mx-auto">
                    <Button
                        className="w-100 p-2 shadow-sm"
                        variant="info"
                    >הוספת מוצר</Button>
                </Col>
            </Row> */}
            <Row className="my-2">
                <Col xs={10} sm={8} lg={6} className="mx-auto">
                    <Button
                        className="ui-button w-100 p-3 shadow-sm"
                        variant="info"
                        onClick={() => history.push('admin/recentOrders')}
                    >
                        היסטוריית הזמנות
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default AdminOptions
