// IMPORTS
const router = require('express').Router();
const Category = require('../models/category');

//get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            error: false,
            categories
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            msg: err.message
        });
    }
});

//add new Category
// router.post('/', async (req, res) => {
//     try {
//         const newCategory = new Category(req.body)
//         const newCategorySaved = await newCategory.save()
//         res.json({ error: false, newCategorySaved })
//     } catch (err) {
//         res.status(500).json({
//             error: true,
//             msg: err.message
//         });
//     }
// });

module.exports = router;