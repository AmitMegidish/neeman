import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../store/actions/userActions'
import Spinner from './Spinner/Spinner'

const Login = () => {

    const dispatch = useDispatch()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { loading } = useSelector(state => state.user)

    const loginHandler = (e) => {
        e.preventDefault()
        dispatch(userLogin(username, password))
    }

    return (
        <>
            {loading ? <Spinner /> : (
                <Col className="h-100 d-flex justify-content-center flex-column mx-auto" lg={6} md={8}>
                    <h1 className="m-0 text-center">התחבר</h1>
                    <Form dir="rtl" className="border p-3 rounded bg-white shadow" onSubmit={loginHandler} >
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="w-100 text-right">שם משתמש:</Form.Label>
                            <Form.Control
                                onChange={e => setUsername(e.target.value)}
                                value={username}
                                type="text"
                                placeholder="שם משתמש"
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label className="w-100 text-right">סיסמה:</Form.Label>
                            <Form.Control
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                type="password"
                                placeholder="סיסמה"
                            />
                        </Form.Group>

                        <div className="w-100 text-center">
                            <Button variant="info" type="submit" className="w-25 p-2" style={{ fontSize: "14px" }}>
                                התחבר
                            </Button>
                        </div>
                    </Form>
                </Col>
            )}
        </>
    )
}

export default Login
