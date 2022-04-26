const express = require('express');
const Farm = require('../models/event');


const router = express.Router();

router.post('/', async (req, res) =>{
//5.1 I want to be able to post about events on my account page
    try{
        const body = req.body;
        const result = await Farm.createEvent(body.event_name, body.event_description, body.event_image_url, body.farmer_id, body.date, body.time);
        res.status(201).json(result);
    }catch (err){
        console.error('Failed to create new event:', err);
        res.status(500).json({message: err.toString()});
    }

})

router.delete('/:event_name', async (req, res) =>{
//5.2 I want to be able to delete posts about events on my page
    try{
        const result = await Farm.deleteEvent(req.params.event_name);
        res.status(204).json(result);
    }catch (err){
        console.error('Failed to delete event:', err);
        res.status(500).json({message: err.toString()});
    }
})

router.put('/:event_id', async (req, res) =>{
    try{
        const body = req.body;
        const result = await Farm.updateEvent(req.params.event_id, body.event_name, body.event_description, body.event_image_url, body.farmer_id, body.date, body.time);
        res.status(201).json(result);
    }catch (err){
        console.error('Failed to update an event:', err);
        res.status(500).json({message: err.toString()});
    }
})


module.exports = router;