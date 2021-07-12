import React from 'react'
import { Card, Button} from 'react-bootstrap';

const Category = ({ category, setActiveCategory }) => {
    return (
        <Card className="my-2 shadow-sm">
            <Card.Img variant="top" src={category.image} height="90" />
            <Button
                variant="light"
                className="text-dark"
                style={{fontSize:"14px"}}
                onClick={() => setActiveCategory(category._id)}>
                {category.name}
            </Button>
        </Card>
    )
}

export default Category
