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
router.get('/', async (req, res, next) => {
    try {
        const body = req.body;
        const result = await Product.fetchCartProducts(body.user_id);
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
        const result = await Product.createOrder(body.firstName,body.lastName,body.address,body.city,body.state,body.zip,body.cardName,body.cardNumber,body.cardExprDate,body.purchaseDate,body.farmer_id,body.customer_id,body.product_id,body.quantity,body.price);
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
router.delete('/clear/:cart_id', async (req, res, next) => {
    try {
        const cart_id=req.params.cart_id;
        console.log(cart_id);
        const result = await Product.deleteCartProduct(cart_id);
        res.status(204).json(result);
    } catch (err) {
        console.error('Failed to delete product from cart:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})
//update quantity for product in cart
router.put('/:cart_id', async (req, res, next) => {
    try {
        const cart_id=req.params.cart_id;
        const body = req.body;
        console.log(cart_id);
        const result = await Product.updateCartQuantity(cart_id,body.quantity);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to update cart quantity:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
})

module.exports = router;