// IMPORTS
const router = require('express').Router();
const Cart = require('../models/cart');
const { userAuth } = require('../helpers/authMiddleware')

//Create a new cart
router.post('/', userAuth, async (req, res) => {
    try {
        const cart = new Cart(req.body);
        const createdCart = await cart.save();

        res.status(200).json({
            error: false,
            createdCart
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            msg: err.message
        });
    }
});

//Toggle cart to completed
router.put('/:id', userAuth, async (req, res) => {
    try {
        const completedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: {
                isCompleted: true
            }
        });

        res.status(200).json({
            error: false,
            completedCart
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            msg: err.message
        });
    }
});

//toggle cart to uncompleted
router.put('/uncompleted/:id', userAuth, async (req, res) => {
    try {
        const editCard = await Cart.findByIdAndUpdate(req.params.id, {
            $set: {
                isCompleted: false
            }
        });

        res.status(200).json({
            error: false,
            editCard
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            msg: err.message
        });
    }
});

//Get user's uncompleted cart by user ID
router.get('/uncompleted/:branchId', userAuth, async (req, res) => {
    try {
        const branchId = req.params.branchId;

        const cart = await Cart.findOne({
            branchId,
            isCompleted: false
        });

        // if (!cart) {
        //     res.status(400).json({ error: true, message: 'לא נמצאה עגלה פעילה' })
        //     console.log("לא נמצאה עגלה פעילה")
        //     return
        // }

        res.status(200).json({
            error: false,
            cart
        });
    } catch (err) {
        console.log(err.message)
        res.status(400).json({
            error: true,
            msg: err.message
        });
    }
});

module.exports = router;