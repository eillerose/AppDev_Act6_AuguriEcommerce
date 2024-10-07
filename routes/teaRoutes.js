const express = require('express');
const router = express.Router();
const teaController = require('../controllers/teaController');

router.get('/', teaController.index);
router.get('/about', teaController.about);
router.get('/product', teaController.product);
router.get('/service', teaController.service);
router.get('/gallery', teaController.gallery);
router.get('/contact', teaController.contact);
router.get('/cart', teaController.cart);
router.get('/faqs', teaController.faqs);
router.get('/help', teaController.help);
router.get('/products', teaController.product);
router.post('/cart', teaController.addToCart);

module.exports = router;