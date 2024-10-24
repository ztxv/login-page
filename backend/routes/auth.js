const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// Input sanitization function
const sanitizeInput = (input) => {
  return input.replace(/[<>&'"]/g, '');
};

// Email validation function
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

// Password validation function
const validatePassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

// Register Route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Sanitize inputs
    const sanitizedUsername = sanitizeInput(username);
    const sanitizedEmail = sanitizeInput(email);

    // Validate email and password
    if (!validateEmail(sanitizedEmail)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email: sanitizedEmail }, { username: sanitizedUsername }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

    // Create new user
    const user = new User({
      username: sanitizedUsername,
      email: sanitizedEmail,
      password
    });
    await user.save();

    // Create and send token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User created successfully', token, username: user.username });
  } catch (error) {
    console.error('Signup error details:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message, stack: error.stack });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { emailOrUsername, password } = req.body;

  // Basic validation
  if (!emailOrUsername || !password) {
    return res.status(400).json({ message: 'Email/Username and password are required' });
  }

  try {
    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, userId: user._id, username: user.username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

module.exports = router;
