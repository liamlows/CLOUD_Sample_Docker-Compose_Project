const express = require('express');
const Farm = require('../models/farms');
const Events = require('../models/event');
const Products = require('../models/products');


const router = express.Router();

router.get('/:farm_id', async (req, res) =>{
//this route is for User Story 2.2 where "As a farmer, I want to be able to add my products"
    try{
        const farmInfo = await Farm.getFarmInformation(req.params.farm_id);
        const events = await Events.getFarmEvents(req.params.farm_id);
        const products = await Products.getProductThroughFarmName(req.params.farm_id);
        const result = {farmInfo, events, products};
        res.status(201).json(result);
    }catch (err){
        console.error('Failed to get farm information:', err);
        res.status(500).json({message: err.toString()});
    }

})

router.put('/', async (req, res) =>{
    try{
        const body = req.body;
        const result = await Farm.updateFarmInformation(body.farmer_id, body.farm_name, body.farm_description, body.farm_image_url, body.date_founded);
        res.status(201).json(result);
    }catch (err){
        console.error('Failed to update farm information:', err);
        res.status(500).json({message: err.toString()});
    }
})

router.get('/events/:farm_id', async(req, res) =>{
    try{
        const result = await Events.getFarmEvents(req.params.farm_id);
        res.status(201).json(result);
    }catch (err){
        console.error('Failed to get farm events:', err);
        res.status(500).json({message: err.toString()});
    }
})

router.get('/products/:farm_id', async(req, res) =>{
    try{
        const result = await Products.getProductThroughFarmName(req.params.farm_id);
        res.status(201).json(result);
    }catch (err){
        console.error('Failed to get farm events:', err);
        res.status(500).json({message: err.toString()});
    }
})


//6.1 , 6.2 , 6.3
router.post('/', async (req, res) =>{
//
    try{
        const body = req.body;
        const result = await Product.createEvent(body.farm_id,farm_name, body.farmer_id, farm_picture, body.farm_description, body.farm_rating, body.farm_established);
        res.status(201).json(result);
    }catch (err){
        console.error('Failed to create new farm:', err);
        res.status(500).json({message: err.toString()});
    }

})

//6.7
router.get('/farm/:farm_id', async (req, res, next) => {
    try {
        const farm_id=req.params.farm_id;
        const result = await req.models.dash.findFarmRatingByFarmID(farm_id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to get farm rating by farm_ID:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();


//6.8
router.get('/farm/:farm_established', async (req, res, next) => {
    try {
        const farm_id=req.params.farm_id;
        const result = await req.models.dash.findFarmEstablishedByFarmID(farm_id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to get farm establishment by farm_ID:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();


//delete farm
router.delete('/:farm_name', async (req, res) =>{
//
    try{
        const result = await Product.deleteEvent(req.params.farm_name);
        res.status(204).json(result);
    }catch (err){
        console.error('Failed to delete farm:', err);
        res.status(500).json({message: err.toString()});
    }
})



module.exports = router;