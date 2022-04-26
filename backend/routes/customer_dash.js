const express = require('express');
const dash = require('../models/dashboard');
const router = express.Router();
//7.2 get transactions by customer
router.get('/transactions', async (req, res, next) => {
    try{
        const body = req.body;
        result = await dash.fetchTransactions(body.user_id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to get customer transactions', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
});
//7.5 get transaction by id
router.get('/transactions/:transaction_id', async (req, res, next) => {
    try {
        const transaction_id=req.params.transaction_id;
        const result = await dash.fetchTransactionWithProducts(transaction_id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to get transaction by ID:', err); 
        res.status(500).json({ message: err.toString() });
    }

    next();
})
//7.2 get interested events by customer
router.get('/interested_events/:user_id', async (req, res, next) => {
    try{
        const body = req.body;
        result = await dash.fetchInterestedEvents(body.user_id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to get customer interested events', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
});
//7.3 delete interested event
router.delete('/interested_events/:event_id', async (req, res, next) => {
    try {
        const event_id=req.params.event_id;
        const body = req.body;
        const result = await dash.deleteInterestedEvent(event_id, body.user_id);
        res.status(204).json(result);
    } catch (err) {
        console.error('Failed to delete interested event:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})
//7.6 delete all interested event
router.delete('/interested_events', async (req, res, next) => {
    try {
        const body = req.body;
        const result = await dash.deleteAllInterestedEvents(body.user_id);
        res.status(204).json(result);
    } catch (err) {
        console.error('Failed to delete all interested events:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})

module.exports = router;
