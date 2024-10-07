const express = require('express');
const session = require('express-session');
const sequelize = require('./config/db');
const User = require('./models/user'); 
const Cart = require('./models/cart');
const path = require('path');
const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const syncDatabase = async () => {
  try {
      await sequelize.sync({ force: false }); // Alter tables to match model changes
      console.log("Database & tables synced!");
  } catch (error) {
      console.error("Error syncing database:", error);
  }
};

syncDatabase();

app.use(session({
  secret: 'auguri-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));

// Routes
const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product');
const teaRoutes = require('./routes/teaRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use('/', indexRoutes);
app.use('/admin', adminRoutes);
app.use('/products', productRoutes);
app.use('/', teaRoutes);
app.use('/user', userRoutes);
app.use('/order', orderRoutes);
app.use('/', cartRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});