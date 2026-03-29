const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

// Public route — no auth needed
router.get('/hello', (req, res) => {
  res.json({
    success: true,
    message: 'Hello from public route! No token needed.',
  });
});

// Login route — returns a JWT token
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'password123') {
    const payload = { username: 'admin', role: 'admin' };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log(`[LOGIN] ✅ Token issued for user: ${username}`);
    return res.json({
      success: true,
      message: 'Login successful',
      token,
    });
  }

  console.log(`[LOGIN] ❌ Invalid credentials for: ${username}`);
  return res.status(401).json({
    success: false,
    message: 'Invalid username or password.',
  });
});

module.exports = router;