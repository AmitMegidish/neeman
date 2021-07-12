const router = require('express').Router()
const Product = require('../models/product')


//get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.json({ error: false, products })
    } catch (err) {
        res.status(500).json({
            error: true,
            msg: err.message
        });
    }
})

//Get products by category id
router.get('/:categoryId', async (req, res) => {
    try {
        const category = req.params.categoryId;
        const products = await Product.find({ category }).populate('category');
        res.status(200).json({
            error: false,
            products
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            msg: err.message
        });
    }
});


//add item
router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        const newProductSaved = await newProduct.save()
        res.json({ error: false, newProductSaved })
    } catch (err) {
        res.status(500).json({
            error: true,
            msg: err.message
        });
    }
})


module.exports = router
