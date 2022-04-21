const express = require('express');
const dash = require('../models/dashboard');
const router = express.Router();
//get transactions by farmer
router.get('/transactions', async (req, res, next) => {
    try{
        const user = req.user;
        result = await req.models.dash.fetchTransactionsByFarmer(user.email);

        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to get farmer transactions', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
});
//get transaction by id
router.get('/transactions/:transaction_id', async (req, res, next) => {
    try {
        const transaction_id=req.params.transaction_id;
        const result = await req.models.dash.fetchTransactionByID(transaction_id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to get transaction by ID:', err); 
        res.status(500).json({ message: err.toString() });
    }

    next();
})

module.exports = router;