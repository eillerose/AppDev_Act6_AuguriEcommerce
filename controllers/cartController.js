// cartController.js

const { Cart } = require('../models/cart'); 
// Function to handle order submission and saving to the database
exports.addToCart = async (req, res) => {
    try {
        // Get the product name, quantity, and total price from the request body
        const { productName, quantity, totalPrice } = req.body;

        // Validate the input
        if (!productName || !quantity || !totalPrice) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Create a new cart entry using the Cart model
        const newCart = await Cart.create({
            productName,
            quantity,
            totalPrice
        });

        // If successful, send a response with the cart data
        return res.status(201).json({ success: true, message: "Order added to cart", cart: newCart });
    } catch (err) {
        console.error(err);
        // If there's an error, send an error response
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
exports.getCart = async (req, res) => {
    try {
        const cartItems = await Cart.findAll(); // Fetch all cart items from the database
        res.render('cart', { cartItems }); // Pass the fetched items to the cart view
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).send("Internal Server Error");
    }
};
exports.removeCartItem = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the item in the cart and remove it
        const cartItem = await Cart.findByPk(id);
        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'Cart item not found' });
        }

        await cartItem.destroy();
        return res.status(200).json({ success: true, message: 'Cart item removed' });
    } catch (error) {
        console.error('Error removing cart item:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

