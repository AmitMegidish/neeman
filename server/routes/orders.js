const { userAuth } = require('../helpers/authMiddleware');
const router = require('express').Router();
const Order = require('../models/order');

//Get 15 recentorders by branch
router.get('/:branchId', userAuth, async (req, res) => {
    try {
        const { branchId } = req.params
        const orders = await Order.find({ branch: branchId }).sort({ orderedAt: "desc" }).limit(15).populate('employee');
        res.status(200).json({
            error: false,
            orders
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            msg: err.message
        });
    }
});

//Get recent order by date
// router.get('/recent/:userId', userAuth, async (req, res) => {
//     try {
//         const order = await Order.find({ user: `${req.params.userId}` }).sort({ "orderedAt": -1 }).limit(1);
//         res.status(200).json({
//             error: false,
//             order
//         });
//     } catch (err) {
//         res.status(500).json({
//             error: true,
//             msg: err.message
//         });
//     }
// });


//Add a new order
router.post('/', userAuth, async (req, res) => {
    try {
        const order = new Order(req.body);
        const newOrder = await order.save();
        
        res.status(200).json({
            error: false,
            newOrder,
            message: "ההזמנה נשלחה בהצלחה"
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            msg: err.message
        });
    }
});

//set mark that order editing
router.put('/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: {
                isEdited: 1
            }
        });
        res.status(200).json({
            error: false,
            updatedOrder
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            msg: err.message
        });
    }
});

//update the order details
router.put('/updateOrder/:id', async (req, res) => {
    try {
        console.log(req.body.body.employee)
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: {
                employee: req.body.body.employee,
                dueDate: req.body.body.dueDate
            }
        });
        res.status(200).json({
            error: false,
            updatedOrder
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            msg: err.message
        });
    }
});
module.exports = router;
