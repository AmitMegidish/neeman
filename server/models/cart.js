const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'branch',
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;
