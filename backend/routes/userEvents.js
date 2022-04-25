const express = require('express');
const Event = require('../models/event');


const router = express.Router();

router.get('/:userid', async (req, res) =>{
    try{
        const result = await Event.getUsersInterestedEvents(req.params.userid);
        res.status(201).json(result);
    }catch (err){
        console.error('Failed to create new event:', err);
        res.status(500).json({message: err.toString()});
    }

})

router.post('/', async (req, res) =>{
    try{
        const body = req.body;
        const result = await Event.signUserForEvent(body.user_id, body.event_id);
        res.status(201).json(result);
    }catch (err){
        console.error('Failed to RSVP user for event:', err);
        res.status(500).json({message: err.toString()});
    }

})



module.exports = router;