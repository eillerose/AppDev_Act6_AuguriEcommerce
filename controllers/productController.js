const Product = require('../models/product');
const { Op } = require('sequelize');

exports.renderProductsPage = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10; // Number of items per page
        const search = req.query.search || '';

        const offset = (page - 1) * limit;

        const whereClause = search
            ? {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { category: { [Op.like]: `%${search}%` } }
                ]
            }
            : {};

        const { count, rows: products } = await Product.findAndCountAll({
            where: whereClause,
            limit: limit,
            offset: offset,
            order: [['id', 'ASC']]
        });

        const totalPages = Math.ceil(count / limit);

        res.render('admin/products', {
            title: 'Product List',
            products: products,
            currentPage: page,
            totalPages: totalPages,
            search: search
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Error fetching products");
    }
};

exports.addProduct = async (req, res) => {
    try {
        const { name, category, price, stock } = req.body;

        if (!name || !category || !price || !stock) {
            return res.status(400).send("All fields are required");
        }

        // Handle image upload
        const image = req.file ? req.file.filename : null;

        await Product.create({
            name,
            category,
            price: parseFloat(price),
            stock: parseInt(stock),
            image // Save image filename to database
        });


        res.redirect('/products');
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send("Error adding product");
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, category, price, stock } = req.body;
        
        // Prepare updated data
        let updatedData = { name, category, price, stock };

        // Find the product by ID
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // If an image is uploaded, update the image field
        if (req.file) {
            updatedData.image = req.file.filename;  // Multer stores the image filename in `req.file.filename`
        }

        // Update product with the new data
        await product.update(updatedData);

        res.redirect('/products'); // Redirect to product list or another desired page
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('Error updating product');
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await Product.destroy({ where: { id: productId } });
        res.redirect('/products');
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Internal Server Error');
    }
};

