const express = require('express');
const Product = require('../models/farm');


const router = express.Router();

router.get('/:farm_id', async (req, res) =>{
//this route is for User Story 2.2 where "As a farmer, I want to be able to add my products"
    try{
        const result = await Product.get(getFarmInformation);
        res.status(201).json(result);
    }catch (err){
        console.error('Failed to get farm information:', err);
        res.status(500).json({message: err.toString()});
    }

})

module.exports = router;