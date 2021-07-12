// IMPORTS
const router = require('express').Router();
const Employee = require('../models/employee')
const { userAuth, adminAuth } = require('../helpers/authMiddleware')

//get Employess by branch
router.get('/byBranch/:branch_id', userAuth, async (req, res) => {
    try {
        const branch = req.params.branch_id;
        const employees = await Employee.find({ branch }).populate('branch');

        res.status(200).json({
            error: false,
            employees
        });

    } catch (err) {
        res.status(400).json({
            error: true,
            msg: err.message
        });
    }
});

router.post('/', adminAuth, async (req, res) => {
    try {
        let newEmployee = new Employee(req.body);
        newEmployee = await newEmployee.save();
        res.json({
            error: false,
            newEmployee
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            msg: err.message
        });
    }
});

module.exports = router;
