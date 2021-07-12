import React from 'react'
import ProductList from '../components/ProductList'
import GoBackHeading from '../components/GoBackHeading';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export const ProductsScreen = () => {
    
    const history = useHistory()
    const { activeCategory } = useSelector(state => state.categories)

    const goBackHandler = () => history.push('/categories')

    return (
        <>
            <GoBackHeading title={activeCategory && activeCategory[0].name} buttonHandler={goBackHandler} />
            <ProductList history={history} />
        </>
    )
}




