const express = require('express');
const session = require('express-session');
const sequelize = require('./config/db'); // Sequelize instance
const path = require('path');
const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

sequelize.sync() // Sync all models with the database
    .then(() => console.log('Models synchronized...'))
    .catch(err => console.log('Error synchronizing models:', err));

app.use(session({
  secret: 'auguri-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));

// Routes
const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product');

app.use('/', indexRoutes);
app.use('/admin', adminRoutes);
app.use('/products', productRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});