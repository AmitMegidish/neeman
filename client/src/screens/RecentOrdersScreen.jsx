import React from 'react';
import RecentOrdersList from '../components/RecentOrdersList';
import GoBackHeading from '../components/GoBackHeading';
import { useHistory } from 'react-router-dom'

const RecentOrdersScreen = () => {
    const history = useHistory()

    const buttonHandler = () => {
        history.push("/")
    }

    return (
        <>
            <GoBackHeading title="הזמנות אחרונות" buttonHandler={buttonHandler} />
            <RecentOrdersList />
        </>
    )
}


export default RecentOrdersScreen
