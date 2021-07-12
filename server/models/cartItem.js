const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart',
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
});

const CartItem = mongoose.model('cartItem', cartItemSchema);
module.exports = CartItem;
