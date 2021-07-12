import React, { useEffect } from 'react';
import CategoriesList from '../components/CategoriesList'
import { useSelector } from 'react-redux'
import GoBackHeading from '../components/GoBackHeading';
import OrderModal from '../components/OrderModal/OrderModal';
import { useHistory } from 'react-router-dom'

const CategoriesScreen = () => {
    const history = useHistory()
    const { activeUser } = useSelector(state => state.user)
    const { activeCart } = useSelector(state => state.cart)

    useEffect(() => {
        if (!activeCart) {
            history.push('/')
            return
        }
    }, [activeUser, history, activeCart])

    const goBackHandler = () => history.push('/')

    return (
        <>
            <GoBackHeading title="קטגוריות" buttonHandler={goBackHandler} />
            <CategoriesList history={history} />
            <OrderModal history={history} />
        </>
    )

}

export default CategoriesScreen
