const express = require('express');
const Product = require('../models/orders');

const router = express.Router();

//4.1 create cart
router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const result = await Product.createCart(body.user_id, body.product_id, body.quantity);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to create new cart:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})
//4.1 get cart
router.get('/:user_id', async (req, res, next) => {
    try {
        const user_id=req.params.user_id;
        const result = await Product.fetchCartProducts(user_id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to get products in cart:', err); 
        res.status(500).json({ message: err.toString() });
    }

    next();
})
//4.2 and 4.3 get product by id
router.get('/product/:product_id', async (req, res, next) => {
    try {
        const product_id=req.params.product_id;
        const result = await Product.fetchProductByID(product_id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to get product by ID:', err); 
        res.status(500).json({ message: err.toString() });
    }

    next();
})
//4.5 and 4.6 and 4.8 create order
router.post('/checkout', async (req, res, next) => {
    try {
        const body = req.body;
        const result = await Product.createOrder(body.firstName,body.lastName,body.address,body.city,body.state,body.zip,body.cardName,body.cardNumber,body.cardExprDate,body.customer_id);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to create new order:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})
//delete cart
router.delete('/clear', async (req, res, next) => {
    try {
        const body = req.body;
        const result = await Product.clearCart(body.user_id);
        res.status(204).json(result);
    } catch (err) {
        console.error('Failed to clear cart:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})
//delete item from cart
router.delete('/clear/:product_id', async (req, res, next) => {
    try {
        const product_id=req.params.product_id;
        const body = req.body;
        const result = await Product.deleteCartProduct(product_id,body.user_id);
        res.status(204).json(result);
    } catch (err) {
        console.error('Failed to delete product from cart:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})
//update quantity for product in cart
router.put('/:product_id', async (req, res, next) => {
    try {
        const product_id=req.params.product_id;
        const body = req.body;
        const result = await Product.updateCartQuantity(product_id,body.user_id,body.quantity);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to update cart quantity:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})
//get transaction
router.get('/transaction/:transaction_id', async (req, res, next) => {
    try {
        const transaction_id=req.params.transaction_id;
        const result = await Product.fetchTransactionWithProducts(transaction_id);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to get transaction with products:', err); 
        res.status(500).json({ message: err.toString() });
    }

    next();
})

module.exports = router;