const express = require('express');
const Product = require('../models/products');


const router = express.Router();

router.post('/', async (req, res) =>{
    try{
        const body = req.body;
        const result = await Product.createNewProduct(body.product_id, body.product_name, body.product_price, body.product_stock. body.product_description, body.farmer_id, body.farm_name);
        res.status(201).json(result);
    }catch (err){
        console.error('Failed to create new product:', err);
        res.status(500).json({message: err.toString()});
    }

})

router.put('/'), async (req, res) =>{
    try{
        const body = req.body;
    }catch (err){
        console.error('Failed to update new product:', err);
        res.status(500).json({message: err.toString()});
    }

})

router.delete('/', async (req, res) =>{

    try{

    }catch (err){
        console.error('Failed to delete product:', err);
        res.status(500).json({message: err.toString()});
    }
})


module.exports = router;