const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'branch',
        required: true
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee',
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart',
        required: true
    },
    orderedAt: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    isEdited: {
        type: Number,
        default: 0
    }
});

const Order = mongoose.model('order', orderSchema);
module.exports = Order;
