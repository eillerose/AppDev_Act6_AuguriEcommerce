const Product = require('../models/product');
const Cart = require('../models/cart'); // Example Cart model
const { Op } = require('sequelize');

const teaController = {
    index: (req, res) => {
        res.render('index', { title: 'Home' });
    },
    about: (req, res) => {
        res.render('about', { title: 'About Us' });
    },
    service: (req, res) => {
        res.render('service', { title: 'Our Services' });
    },
    gallery: (req, res) => {
        res.render('gallery', { title: 'Gallery' });
    },
    contact: (req, res) => {
        res.render('contact', { title: 'Contact Us' });
    },
    faqs: (req, res) => {
        res.render('faqs', { title: 'FAQs' });
    },
    help: (req, res) => {
        res.render('help', { title: 'Help' });
    },

    // Corrected product method
    product: async (req, res) => {
        try {
            const products = await Product.findAll(); // Fetch products from the database
            res.render('product', { products }); // Pass the products to the view
        } catch (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
    },

    // Add to cart without requiring login
    addToCart: async (req, res) => {
        try {
            const { productId, quantity } = req.body;

            // Fetch product details to calculate total price
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).send('Product not found');
            }

            // Initialize the session cart if it doesn't exist
            if (!req.session.cart) {
                req.session.cart = [];
            }

            // Check if the product is already in the cart
            let cartItem = req.session.cart.find(item => item.productId === productId);

            if (cartItem) {
                // Update the quantity of the existing cart item
                cartItem.quantity += parseInt(quantity, 10);
            } else {
                // Add the product to the cart
                req.session.cart.push({
                    productId,
                    quantity: parseInt(quantity, 10),
                    price: product.price, // Store the product price for total calculation
                    name: product.name // Store the product name for display
                });
            }

            res.redirect('/cart'); // Redirect to the cart page after adding
        } catch (err) {
            console.error('Error adding to cart:', err);
            res.status(500).send('Internal Server Error');
        }
    },

    // Display cart items from session
    cart: async (req, res) => {
        try {
            const cart = req.session.cart || []; // Get the cart from session
    
            // Calculate totalAmount by summing up the product price times the quantity
            const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
            // Render the cart view with the cart items and total amount
            res.render('cart', { title: 'Cart', cartItems: cart, totalAmount });
        } catch (err) {
            console.error('Error fetching cart data:', err);
            res.status(500).send('Internal Server Error');
        }
    },
    getCart: async (req, res) => {
        try {
            const cartItems = await Cart.findAll(); // Fetching cart items from the database
            
            // Calculate totalAmount by summing up the totalPrice of each item
            const totalAmount = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    
            // Pass cartItems and totalAmount to the EJS template
            res.render('cart', { cartItems, totalAmount });
        } catch (error) {
            console.error('Error fetching cart data:', error);
            res.status(500).send('Server error');
        }
    },
    clearCart : (req, res) => {
        req.session.cart = []; // Clear the cart in the session
        res.redirect('/cart');
    },
};


module.exports = teaController;
