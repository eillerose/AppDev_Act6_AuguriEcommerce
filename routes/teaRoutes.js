const express = require('express');
const router = express.Router();
const teaController = require('../controller/teaController');

router.get('/', teaController.index);
router.get('/about', teaController.about);
router.get('/product', teaController.product);
router.get('/service', teaController.service);
router.get('/gallery', teaController.gallery);
router.get('/contact', teaController.contact);

module.exports = router;
