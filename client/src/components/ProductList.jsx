import React, { useEffect } from 'react';
import { getProducts } from '../store/actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import { Col, ListGroup, Row } from 'react-bootstrap';
import Spinner from '../components/Spinner/Spinner'
import Product from './Product';

const ProductList = ({ history }) => {

    const dispatch = useDispatch()
    const { activeCategory } = useSelector(state => state.categories)
    const { products, loading, error } = useSelector(state => state.products)

    useEffect(() => {
        if (!activeCategory) {
            history.push('/')
            return
        }
        if(activeCategory){
            dispatch(getProducts(activeCategory[0]._id))
        }
    }, [dispatch, activeCategory, history])

    return (
        <>
            {(() => {
                if (error) {
                    return <h1>Error!</h1>
                }
                if (loading) {
                    return <Spinner />
                }
                if (products) {
                    return (
                        <>
                            <Row>
                                <Col md={10} className="mx-auto">
                                    <ListGroup>
                                        {products.map(product => <Product key={product._id} product={product} />)}
                                    </ListGroup>
                                </Col>
                            </Row>
                        </>
                    )
                }
            })()}
        </>
    )
}

export default ProductList
