const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
});

const Branch = mongoose.model('branch', branchSchema);
module.exports = Branch;
