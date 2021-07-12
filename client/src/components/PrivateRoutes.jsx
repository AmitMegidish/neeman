import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';

function PrivateRoutes({ component: Component, ...rest }) {

    const { activeUser } = useSelector(state => state.user)

    return (
        <Route {...rest} render={() => {
            if (activeUser && activeUser._id) {
                return (
                    <Component {...rest} />
                )
            } else {
                return (
                    <Redirect to="/login" />
                )
            }
        }}
        />
    )
}

export default PrivateRoutes
