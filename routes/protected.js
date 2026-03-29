const express = require('express');
const router = express.Router();

// Dashboard — auth required
router.get('/dashboard', (req, res) => {
  res.json({
    success: true,
    message: `Welcome to the dashboard, ${req.user.username}!`,
    user: req.user,
    data: {
      stats: { users: 120, requests: 4500, errors: 3 },
    },
  });
});

// Profile — auth required
router.get('/profile', (req, res) => {
  res.json({
    success: true,
    profile: {
      username: req.user.username,
      role: req.user.role,
      accessLevel: req.user.role === 'admin' ? 'Full Access' : 'Limited Access',
    },
  });
});

// Trigger error — for testing error handler
router.get('/trigger-error', (req, res, next) => {
  const err = new Error('Simulated internal server error');
  err.status = 500;
  next(err);
});

module.exports = router;