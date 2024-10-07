const { Sequelize } = require('sequelize');

// Creating a Sequelize instance and connecting to MySQL
const sequelize = new Sequelize('auguri_db', 'root', '', {
  host: 'localhost',        // or your database host
  dialect: 'mysql',         // Sequelize dialect for MySQL
  logging: false,           // Disables logging of SQL queries to console (optional)
});

sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;