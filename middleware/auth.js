const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    console.log('[AUTH] ❌ No Authorization header found');
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    console.log('[AUTH] ❌ Invalid token format');
    return res.status(401).json({
      success: false,
      message: 'Invalid token format. Use: Bearer <token>',
    });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(`[AUTH] ✅ Token valid — User: ${decoded.username}, Role: ${decoded.role}`);
    next();
  } catch (err) {
    console.log(`[AUTH] ❌ Token verification failed: ${err.message}`);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
};

module.exports = authenticate;