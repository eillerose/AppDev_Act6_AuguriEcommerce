//cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/cart', cartController.addToCart);

// Route to remove an item from the cart
router.post('/cart/remove/:id', cartController.removeCartItem);

module.exports = router; 