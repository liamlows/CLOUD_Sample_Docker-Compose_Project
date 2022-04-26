const express = require('express');
const Event = require('../models/event');


const router = express.Router();

router.post('/', async (req, res) =>{
//5.1 I want to be able to post about events on my account page
    try{
        const body = req.body;
        const result = await Event.createEvent(body.event_name, body.event_description, body.event_image_url, body.farmer_id, body.date, body.time);
        res.status(201).json(result);
    }catch (err){
        console.error('Failed to create new event:', err);
        res.status(500).json({message: err.toString()});
    }

})
router.put('/', async (req, res) =>{
    try{
        const body = req.body;
        const result = await Event.updateEvent(body.event_id, body.event_name, body.event_description, body.event_image_url, body.farmer_id, body.date, body.time);
        res.status(201).json(result);
    }catch (err){
        console.error('Failed to update event information:', err);
        res.status(500).json({message: err.toString()});
    }
})


router.delete('/:event_name', async (req, res) =>{
//5.2 I want to be able to delete posts about events on my page
    try{
        const removeForeignKeys = await Event.deleteUserInterestedEvents(req.params.event_name);
        const result = await Event.deleteEvent(req.params.event_name);
        res.status(204).json(result);
    }catch (err){
        console.error('Failed to delete event:', err);
        res.status(500).json({message: err.toString()});
    }
})

module.exports = router;