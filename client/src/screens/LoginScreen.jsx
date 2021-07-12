import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'
import Login from '../components/Login';

const LoginScreen = ({ history }) => {
    const { activeUser } = useSelector(state => state.user)

    useEffect(() => {
        if (activeUser) {
            history.push('/')
        }
    }, [activeUser, history])

    return (
        <>
            <Login />
        </>
    )
}

export default LoginScreen
