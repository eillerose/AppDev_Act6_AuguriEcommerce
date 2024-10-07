const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/upload'); // 


router.get('/', productController.renderProductsPage);

// Route to handle the form submission and add the product
router.post('/add',upload.single('image'), productController.addProduct);
// Route to handle the form submission and update the product
router.post('/edit/:id', upload.single('image'), productController.updateProduct);

// Delete product route
router.post('/delete/:id', productController.deleteProduct);


module.exports = router;
