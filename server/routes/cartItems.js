const { userAuth } = require('../helpers/authMiddleware');
const router = require('express').Router();
const CartItem = require('../models/cartItem');

//Get all items of a cart
router.get('/:cart', userAuth, async (req, res) => {
    try {
        const cart = req.params.cart;
        const items = await CartItem.find({ cart }).populate('product');

        res.status(200).json({
            error: false,
            items
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            msg: err.message
        });
    }
});

//Add item to cart
router.post('/', userAuth, async (req, res) => {
    try {
        const cartItem = new CartItem(req.body);
        const addedCartItem = await cartItem.save();
        await addedCartItem.populate('product').execPopulate();

        res.status(200).json({
            error: false,
            addedCartItem
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            msg: err.message
        });
    }
});

//Remove item from cart
router.delete('/:itemId', userAuth, async (req, res) => {
    try {
        const cartItemId = req.params.itemId;
        const removedItem = await CartItem.findByIdAndDelete(cartItemId);

        res.status(200).json({
            error: false,
            removedItem
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            msg: err.message
        });
    }
});

//Update item
router.put('/', userAuth, async (req, res) => {
    try {
        const { id, qty } = req.body;

        const updatedCartItem = await CartItem.findByIdAndUpdate({ _id: id }, {
            $set: {
                qty
            }
        });

        await updatedCartItem.populate('product').execPopulate();

        res.status(200).json({
            error: false,
            updatedCartItem
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            msg: err.message
        });
    }
});

module.exports = router;


