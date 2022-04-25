const express = require('express');
const dash = require('../models/dashboard');
const router = express.Router();
//7.1 get transactions by farmer
router.get('/transactions', async (req, res, next) => {
    try{
        const body = req.body;
        result = await dash.fetchTransactions(body.user_id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to get farmer transactions', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
});
//7.4 get transaction by id
router.get('/transactions/:transaction_id', async (req, res, next) => {
    try {
        const transaction_id=req.params.transaction_id;
        const result = await dash.fetchTransactionByID(transaction_id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to get transaction by ID:', err); 
        res.status(500).json({ message: err.toString() });
    }

    next();
})

module.exports = router;
