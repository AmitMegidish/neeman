import React from 'react'
import { useDispatch } from 'react-redux'

import { Button } from 'react-bootstrap';

const AfterSubmission = ({ title, history }) => {
    const dispatch = useDispatch()

    const finishProcessHandler = () => {
        dispatch({ type: "RESET_MESSAGE" })
        history.push('/')
    }

    return (
        <>
            <h1>{title}</h1>
            <Button onClick={finishProcessHandler} variant="info">סיים</Button>
        </>
    )
}

export default AfterSubmission
