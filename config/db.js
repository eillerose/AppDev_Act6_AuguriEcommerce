const { Sequelize } = require('sequelize');

// Creating a Sequelize instance and connecting to MySQL
const sequelize = new Sequelize('aguri', 'root', '', {
  host: 'localhost',        // or your database host
  dialect: 'mysql',         // Sequelize dialect for MySQL
  logging: false,           // Disables logging of SQL queries to console (optional)
});

module.exports = sequelize;