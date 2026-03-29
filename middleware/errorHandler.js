const errorHandler = (err, req, res, next) => {
  console.error(`\n[ERROR]`);
  console.error(`  Message : ${err.message}`);
  console.error(`  Stack   : ${err.stack}`);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: err.message,
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID format',
      message: err.message,
    });
  }

  res.status(err.status || 500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong on the server.',
  });
};

module.exports = errorHandler;