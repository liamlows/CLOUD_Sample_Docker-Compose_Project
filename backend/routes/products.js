const express = require('express');
const Product = require('../models/products');

const router = express.Router();

router.post('/', async (req, res) =>{
//this route is for User Story 2.2 where "As a farmer, I want to be able to add my products"
    try{
        const body = req.body;
        const result = await Product.createNewProduct(body.product_name, body.product_price, body.product_stock, body.product_description, body.farmer_id);
        res.status(201).json(result);
    }catch (err){
        console.error('Failed to create new product:', err);
        res.status(500).json({message: err.toString()});
    }

})
//FIGURE OUT HOW TO DO THE EDIT OF A PRODUCT USING PATCH
router.put('/', async (req, res) =>{
//this route is for User Story 2.3 where "As a farmer, I want to be able to edit my products"
//NOT YET DONE
    try{
        const body = req.body;

        res.status(201).json(result);
    }catch (err){
        console.error('Failed to update new product:', err);
        res.status(500).json({message: err.toString()});
    }
})

// router.patch('/:id', (req, res) => {
//   const query = 'UPDATE product SET product_name = ?, product_price = ?, product_stock = ?, product_description = ?, farmer_id = ?, farm_name = ? WHERE id = ?';
//   const params = [req.body.product_name, req.body.product_price, req.body.product_stock, req.body.product_description, req.body.farmer_id, req.body.farm_name, req.params.id];
//   connection.query(query, params, (error, result) => {
//     res.send({
//       ok: true,
//     });
//   });
// });

router.delete('/:product_id', async (req, res) =>{
//this route is for User Story 2.4 where "As a farmer, I want to be able to delete or remove my products"
    try{
        const result = await Product.deleteProduct(req.params.product_id);
        res.status(204).json(result);
    }catch (err){
        console.error('Failed to delete product:', err);
        res.status(500).json({message: err.toString()});
    }
})

module.exports = router;