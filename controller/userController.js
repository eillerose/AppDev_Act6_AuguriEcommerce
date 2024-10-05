const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Adjust the path as necessary

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ msg: 'User registered successfully', user });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
};

module.exports = { registerUser };
