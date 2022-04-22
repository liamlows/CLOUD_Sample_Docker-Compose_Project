const express = require('express');
const Product = require('../models/farm');


const router = express.Router();

router.post('/', async (req, res) =>{
//5.1 I want to be able to post about events on my account page
    try{
        const body = req.body;
        const result = await Product.createEvent(body.event_name, body.date, body.description);
        res.status(201).json(result);
    }catch (err){
        console.error('Failed to create new event:', err);
        res.status(500).json({message: err.toString()});
    }

})


router.delete('/:event_name', async (req, res) =>{
//5.2 I want to be able to delete posts about events on my page
    try{
        const result = await Product.deleteEvent(req.params.event_name);
        res.status(204).json(result);
    }catch (err){
        console.error('Failed to delete event:', err);
        res.status(500).json({message: err.toString()});
    }
})


module.exports = router;