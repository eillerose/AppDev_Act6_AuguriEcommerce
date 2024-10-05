const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.renderProductsPage);

// Route to handle the form submission and add the product
router.post('/add', productController.addProduct);
// Route to handle the form submission and update the product
router.post('/edit/:id', productController.updateProduct);

// Delete product route
router.post('/delete/:id', productController.deleteProduct);

router.get('/dashboard', productController.getProductCount);


module.exports = router;
