const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const Branch = require('../models/branch');
const { adminAuth } = require('../helpers/authMiddleware');

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ error: true, message: "אנא הזן שם משתמש וסיסמה" });
            return;
        }

        const user = await Branch.findOne({ username });
        if (!user) {
            res.status(400).json({ error: true, message: "משתמש לא קיים במערכת" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: true, message: "שם משתמש או סיסמא שגויים" });
            return;
        }

        user.password = 'XXXXX';
        const token = jwt.sign({ ...user }, process.env.TOKEN_SECRET, { expiresIn: "7d" });

        res.status(200).json({
            error: false,
            token,
            message: "משתמש התחבר בהצלחה"
        });
    } catch (err) {
        res.status(400).json({
            error: true,
            message: err.message
        });
    }
});

// Register
// router.post('/register', adminAuth, async (req, res) => {
//     try {
//         console.log(req.body)
//         const user = new Branch(req.body);
//         const hash = await bcrypt.hash(req.body.password, 10);
//         user.password = hash;
//         await user.save();
//         res.json({
//             err: false,
//             msg: 'Registered successfully! You will now be automatically redirected in order to sign in.'
//         });
//     } catch (err) {
//         res.status(400).json({
//             error: true,
//             msg: err.message
//         });
//     }
// });

// get Branches
router.get('/', async (req, res) => {
    try {
        const branches = await Branch.find();
        console.log(branches);
        res.status(200).json({
            error: false,
            branches
        });
    } catch (err) {
        res.status(400).json({
            error: true,
            msg: err.message
        });
    }
});


module.exports = router;
