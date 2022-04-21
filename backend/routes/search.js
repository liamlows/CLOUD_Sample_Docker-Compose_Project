const express = require('express');
const Product = require('../models/products');


const router = express.Router();


router.get('/', async (req, res) =>{
//this route is for User Story 8.1 where "As a Customer, I want to be able to navigate to an available products feed"
    try{
        const result = await Product.getAvailableProducts();
        res.status(201).json(result);
    }catch (err){
        console.error('Failed to create new product:', err);
        res.status(500).json({message: err.toString()});
    }

})

//this route is for User Story 8.2 where "As a Customer, I want to be able to see products by category"

//this route is for User Story 8.3 where "As a Customer, I want to be able to search for products"

//this route is for User Story 8.4 where "As a Customer, I want to be able to see products I have previously purchased"



router.get('/', async (req, res) => {
//this route is used for User Story 8.5 "As a customer, I want to see products from specific farmers."
    try{
        var result;
        if(req.query.farmer_id != undefined){
            result = await Product.getProductThroughFarmID(req.query.farmer_id);
            res.status(201).json(result);
        }else if(req.query.farm_name != undefined){
            result =
            res.status(201).json(result);
        }else{
            result = await Product.getProductThroughFarmName(req.query.farm_name);
            res.status(500).json({'Error, no farmer given.'});
        }
        res.status(201).json(result);
    }catch (err){
        console.error('Failed to create new product:', err);
        res.status(500).json({message: err.toString()});
    }
})

module.exports = router;