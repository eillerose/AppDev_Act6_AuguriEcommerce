const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const productController = require('../controllers/productController');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.redirect('/');
  }
};

router.get('/dashboard', isAuthenticated, adminController.getDashboard);

// Add other admin routes here, using the isAuthenticated middleware as needed
router.get('/products', isAuthenticated, productController.renderProductsPage);
router.post('/products/add', isAuthenticated, productController.addProduct);
router.post('/products/edit/:id', isAuthenticated, productController.updateProduct);
router.post('/products/delete/:id', isAuthenticated, productController.deleteProduct);

module.exports = router;