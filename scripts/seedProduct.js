const sequelize = require('../config/db'); // Adjust the path as needed
const Product = require('../models/product'); // Adjust the path as needed

// Example products data
const exampleProducts = [
    {
        name: 'Vanilla Ice Cream',
        description: 'Creamy vanilla ice cream made with real vanilla beans.',
        price: 3.50,
        quantity: 100,
        category: 'Ice Cream',
        stock: 50 // Adjust stock value as needed
    },
    {
        name: 'Chocolate Ice Cream',
        description: 'Rich chocolate ice cream made with high-quality cocoa.',
        price: 4.00,
        quantity: 80,
        category: 'Ice Cream',
        stock: 30 // Adjust stock value as needed
    },
    {
        name: 'Strawberry Ice Cream',
        description: 'Delicious strawberry ice cream made with fresh strawberries.',
        price: 3.75,
        quantity: 60,
        category: 'Ice Cream',
        stock: 25 // Adjust stock value as needed
    },
    {
        name: 'Mint Chip Ice Cream',
        description: 'Refreshing mint ice cream with chocolate chips.',
        price: 4.25,
        quantity: 90,
        category: 'Ice Cream',
        stock: 20 // Adjust stock value as needed
    },
    {
        name: 'Cookie Dough Ice Cream',
        description: 'Sweet vanilla ice cream loaded with cookie dough chunks.',
        price: 4.50,
        quantity: 70,
        category: 'Ice Cream',
        stock: 15 // Adjust stock value as needed
    }
];

// Function to insert example products
const seedProduct = async () => {
    try {
        // Sync the database
        await sequelize.sync();

        // Insert products
        const products = await Product.bulkCreate(exampleProducts);
        console.log('Products inserted:', products.map(product => product.toJSON()));
    } catch (error) {
        console.error('Error inserting products:', error);
    } finally {
        // Close the connection
        await sequelize.close();
    }
};

// Call the function
seedProduct();
