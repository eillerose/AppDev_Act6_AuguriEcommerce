const express = require('express');
const teaRoutes = require('./routes/teaRoutes');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/db');

const app = express();
const PORT = 3001;

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true })); // Express has built-in body-parser for URL-encoded form data
app.use(express.json()); // If you plan to accept JSON data

// Static Files
app.use(express.static('public'));

// Setting up view engine
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index');
});
app.use('/tea', teaRoutes); // Changed to '/tea' to make route more descriptive
app.use('/user', userRoutes);

sequelize.sync({ force: false }) // Set `force: true` to drop and recreate the table(s) each time
  .then(() => {
    console.log('Database synced successfully.');
    // Start the server only after the DB is synced
  })
  .catch((err) => {
    console.error('Unable to sync the database:', err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server connected successfully to port ${PORT}...`);
});
