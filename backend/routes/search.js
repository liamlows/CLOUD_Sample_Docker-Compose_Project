const express = require('express');
const Product = require('../models/products');
const Farm = require('../models/farms');


const router = express.Router();


// router.get('/', async (req, res) =>{
// //this route is for User Story 8.1 where "As a Customer, I want to be able to navigate to an available products feed"
//     try{
//         const result = await Product.getAvailableProducts();
//         res.status(201).json(result);
//     }catch (err){
//         console.error('Failed to create new product:', err);
//         res.status(500).json({message: err.toString()});
//     }
//
// })

//this route is for User Story 8.2 where "As a Customer, I want to be able to see products by category"

//this route is for User Story 8.3 where "As a Customer, I want to be able to search for products"

//this route is for User Story 8.4 where "As a Customer, I want to be able to see products I have previously purchased"



// router.get('/', async (req, res) => {
// //this route is used for User Story 8.5 "As a customer, I want to see products from specific farmers."
//     try{
//         var result;
//         if(req.query.farmer_id != undefined){
//             result = await Product.getProductThroughFarmID(req.query.farmer_id);
//             res.status(201).json(result);
//         }else if(req.query.farm_name != undefined){
//             result =
//             res.status(201).json(result);
//         }else{
//             result = await Product.getProductThroughFarmName(req.query.farm_name);
//             res.status(500).json({'Error, no farmer given.'});
//         }
//         res.status(201).json(result);
//     }catch (err){
//         console.error('Failed to create new product:', err);
//         res.status(500).json({message: err.toString()});
//     }
// })



router.post('/', async(req, res) =>{
    try{
        var isFarmName = false;
        var isFilters = false;
        var isItemName = false;
        var farm_name = '%' + req.body.farmName + '%';
        var farmerIDArray = [];
        var farmerIDJSON;
        var result;
        if(req.body.farmName != ""){
            isFarmName = true;
            farmerIDJSON = await Farm.getFarmIDsThroughName(farm_name);
            for(var i = 0; i < farmerIDJSON.length; i++){
                farmerIDArray.push(farmerIDJSON[i].farmer_id);
            }
        }
        if(req.body.filters != ""){
            isFilters = true;
        }
        if(req.body.itemName != ""){
            isItemName = true;
        }
        var product_name = '%' + req.body.itemName +'%';

        if(isFarmName & isFilters & isItemName){
            result = await Product.getProductsAllFilters(farmerIDArray, req.body.filters, product_name);
        }else if(isFarmName & isFilters){
            result = await Product.getProductThroughFarmNameCategory(farmerIDArray, req.body.filters);
        }else if(isFarmName & isItemName){
            result = await Product.getThroughFarmNameProductName(farmerIDArray, product_name);
        }else if(isFilters & isItemName){
            result = await Product.getProductThroughCategoryName(req.body.filters, product_name);
        }else if(isFarmName){
            result = await Product.getProductThroughFarmName(farmerIDArray);
        } else if(isFilters){
            result = await Product.getProductThroughCategory(req.body.filters);
        }else if(isItemName){
            result = await Product.getProductThroughName(product_name);
        }else{
            result = await Product.getAvailableProducts();
        }
        res.status(200).json(result);
    } catch(err){
        console.error('Failed to get product:', err);
        res.status(500).json({message: err.toString()});
    }
})

module.exports = router;