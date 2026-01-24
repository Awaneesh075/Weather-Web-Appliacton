/**
 * Async Handler Wrapper
 * Wraps async route handlers to catch errors
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Custom Error Class
 */
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global Error Handler Middleware
 */
export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Wrong MongoDB ID error
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid request format'
    });
  }

  // Duplicate Key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: `Duplicate field value entered`
    });
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  // JWT expired
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }

  // API Rate Limit or External Service Error
  if (err.statusCode === 429 || err.statusCode === 503) {
    return res.status(err.statusCode).json({
      success: false,
      message: 'Service temporarily unavailable. Please try again later.'
    });
  }

  // External API Error
  if (err.statusCode === 401 || err.statusCode === 403) {
    return res.status(500).json({
      success: false,
      message: 'Weather service authentication error. Please check API credentials.'
    });
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * Request Validation Error Handler
 */
export const validationErrorHandler = (err, req, res, next) => {
  if (err.isJoi === true) {
    return res.status(400).json({
      success: false,
      message: err.message,
      details: err.details
    });
  }
  next(err);
};
