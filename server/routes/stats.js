const router = require('express').Router();
const CartItem = require('../models/cartItem');

router.get('/', async (req, res) => {
    try {
        const items = await CartItem.find().populate('product')

        let resultArr = []

        items.forEach(item => {
            const filterdItem = items.filter(i => i.product._id === item.product._id)
            const totalQty = filterdItem.reduce((a, b) => a + b.qty, 0)

            const temp = {
                product: item.product,
                totalOrders: totalQty
            }
            resultArr.push(temp)
        })

        resultArr = resultArr.reduce((a, b) => {
            if (!a.some(obj => obj.product._id === b.product._id)) {
                a.push(b);
            }
            return a;
        }, [])

        res.json({
            error: false,
            resultArr
        });

    } catch (err) {
        res.json({
            error: true,
            msg: err.message
        });
    }

})




module.exports = router;
