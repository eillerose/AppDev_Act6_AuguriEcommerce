const express = require("express");
const bodyParser = require("body-parser");
const teaRoutes = require("./routes/teaRoutes"); 
// const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

// Set view engine to EJS
app.set('view engine', 'ejs');

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., CSS, images, etc.)
app.use(express.static('public'));

// Register your existing tour routes
app.use('/', teaRoutes);

// Register the login route
// app.use('/login', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server connected successfully to port ${PORT}...`);
});
