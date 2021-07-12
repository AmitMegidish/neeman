import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner/Spinner'
import { getCategories, setCategory } from '../store/actions/categoryActions'
import Category from './Category';
import { Row, Col } from 'react-bootstrap';

const CategoriesList = ({ history }) => {

    const dispatch = useDispatch()
    const { categories, loading, error } = useSelector(state => state.categories)

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    const setActiveCategory = (categoryId) => {
        dispatch(setCategory(categoryId))
        history.push('/products')
    }

    return (
        <>
            {(() => {
                if (error) {
                    return <h1>Error!</h1>
                }
                if (loading) {
                    return <Spinner />
                }
                if (categories) {
                    return (
                        <Row>
                            {categories.map(category => (
                                <Col key={category._id} xs={6} sm={4} lg={3} >
                                    <Category
                                        category={category}
                                        setActiveCategory={setActiveCategory}
                                    />
                                </Col>
                            ))}
                        </Row>
                    )
                }
            })()}
        </>
    )
}

export default CategoriesList
