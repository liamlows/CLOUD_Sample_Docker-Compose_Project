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

router.get('/', async(req, res) =>{
    try{
        stadiumID: req.query.stadium;
        lotID: req.query.lot;
        availability: req.query.available;
        var isStadium = false;
        var isLot = false;
        var isAvailable = false;
        var result;
        if(req.query.stadium != undefined){
            isStadium = true;
        }
        if(req.query.lot != undefined){
            isLot = true;
        }
        if(req.query.available != undefined){
            isAvailable = true;
        }
        if(isStadium & isLot & isAvailable){
            result = await Parking.selectByAll(req.query.stadium, req.query.lot, req.query.available);
        }else if(isStadium & isLot){
            result = await Parking.selectStadiumLot(req.query.stadium, req.query.lot);
        }else if(isStadium & isAvailable){
            result = await Parking.selectStadiumAvailable(req.query.stadium, req.query.available);
        }else if(isLot & isAvailable){
            result = await Parking.selectLotAvailable(req.query.lot, req.query.available);
        }else if(isStadium){
            result = await Parking.selectByStadium(req.query.stadium);
        } else if(isLot){
            result = await Parking.selectByLot(req.query.lot);
        }else if(isAvailable){
            result = await Parking.selectAvailability(req.query.available);
        }

        res.status(200).json(result);
    } catch(err){
        console.error('Failed to create new product:', err);
        res.status(500).json({message: err.toString()});
    }
})

module.exports = router;