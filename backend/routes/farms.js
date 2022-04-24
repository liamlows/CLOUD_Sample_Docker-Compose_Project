const express = require('express');
const Farm = require('../models/farm');
const Events = require('../models/farm');
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

module.exports = router;