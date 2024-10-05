const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have your Sequelize instance here

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,  // To automatically manage createdAt and updatedAt
});

module.exports = Product;
