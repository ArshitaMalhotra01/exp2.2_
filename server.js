const express = require('express');
require('dotenv').config();

const logger       = require('./middleware/logger');
const authenticate = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const publicRoutes    = require('./routes/public');
const protectedRoutes = require('./routes/protected');

const app  = express();
const PORT = process.env.PORT || 3000;

// 1. Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Logger middleware (runs on ALL routes)
app.use(logger);

// 3. Public routes (no auth)
app.use('/api/public', publicRoutes);

// 4. Protected routes (auth required)
app.use('/api/protected', authenticate, protectedRoutes);

// 5. 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// 6. Global error handler (must be last)
app.use(errorHandler);

// 7. Start server (no MongoDB)
app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`);
  console.log(`\n📋 Middleware Order:`);
  console.log(`   1. express.json()  — Body Parser`);
  console.log(`   2. logger          — Request/Response Logger`);
  console.log(`   3. publicRoutes    — No Auth`);
  console.log(`   4. authenticate    — JWT Auth Guard`);
  console.log(`   5. protectedRoutes — Auth Required`);
  console.log(`   6. errorHandler    — Global Error Catcher\n`);
});