const express = require('express');
const dash = require('../models/dashboard');
const router = express.Router();
//7.2 get transactions by customer
router.get('/transactions', async (req, res, next) => {
    try{
        const user = req.user;
        result = await req.models.dash.fetchTransactionsByCustomer(user.email);

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
        const result = await req.models.dash.fetchTransactionByID(transaction_id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to get transaction by ID:', err); 
        res.status(500).json({ message: err.toString() });
    }

    next();
})
//7.2 get interested events by customer
router.get('/interested_events', async (req, res, next) => {
    try{
        const user = req.user;
        result = await req.models.dash.fetchInterestedEvents(user.email);

        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to get customer interested events', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
});
//7.3 delete interested event
router.delete('/interested_events/:customer_event_interests_id', async (req, res, next) => {
    try {
        const customer_event_interests_id=req.params.customer_event_interests_id;
        console.log(customer_event_interests_id);
        const result = await req.models.dash.deleteInterestedEvent(customer_event_interests_id);
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
        const user = req.user;
        const result = await req.models.dash.deleteAllInterestedEvents(user.email);
        res.status(204).json(result);
    } catch (err) {
        console.error('Failed to delete all interested events:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})

module.exports = router;
