// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Assuming you have your User model in models/user.js

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Respond with success message
    res.status(201).json({ msg: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error, please try again later.' });
  }
};
