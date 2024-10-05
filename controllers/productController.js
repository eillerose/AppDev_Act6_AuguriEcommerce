const Product = require('../models/product');


exports.getProductCount = async (req, res) => {
    try {
        const productCount = await Product.count(); // Fetch the product count from the database
        // Make sure you're passing the variable when rendering the view
        res.render('admin/dashboard', { productCount }); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Controller to fetch all products and render the view
exports.renderProductsPage = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.findAll();
        
        // Render the products page and pass the product data
        res.render('admin/products', {
            title: 'Product List', // Page title
            products              // Pass products to the view
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Error fetching products");
    }
};

// Controller to handle adding a new product
exports.addProduct = async (req, res) => {
    try {
        const { name, category, price, stock } = req.body;

        // Validate that all required fields are provided
        if (!name || !category || !price || !stock) {
            return res.status(400).send("All fields are required");
        }

        // Create a new product in the database
        await Product.create({
            name,
            category,
            price: parseFloat(price),
            stock: parseInt(stock),
        });

        // Redirect to the products page after successfully adding the product
        res.redirect('/products');
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send("Error adding product");
    }
};

// Function to handle the form submission and update the product in the database
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, category, price, stock } = req.body;

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Update product details
        await product.update({
            name,
            category,
            price,
            stock
        });

        // Redirect back to the product list or wherever appropriate
        res.redirect('/products');
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).send('Server error');
    }
};


// Controller function to delete a product

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await Product.destroy({ where: { id: productId } });
        res.redirect('/products'); // Redirect to the product list or any other page
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Internal Server Error');
    }
};




