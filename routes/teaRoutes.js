const express = require('express');
const router = express.Router();
const teaController = require('../controller/teaController');

router.get('/', teaController.index);
router.get('/cart', teaController.cart);
router.get('/faqs', teaController.faqs);
router.get('/help', teaController.help);
router.get('/about', teaController.help);

module.exports = router;
