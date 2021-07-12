const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('product', productSchema);
module.exports = Product;
