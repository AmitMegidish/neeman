// IMPORTS
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
// const path = require('path')

// SETUP & CONFIG
dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 1000;

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/carts', require('./routes/carts'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cartItems', require('./routes/cartItems'));
app.use('/api/employees', require('./routes/employees'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/sendEmail', require('./routes/sendEmail'));
app.use('/api/stats', require('./routes/stats'));

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// RUNNING THE SERVER
app.listen(port, () => console.log(`up n running port ${port}`));
