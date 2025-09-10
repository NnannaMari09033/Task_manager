const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { SECURITY_CONFIG, HTTP_STATUS, MESSAGES } = require('../config/constants');

// Rate limiting configuration
const createRateLimiter = () => {
  return rateLimit({
    windowMs: SECURITY_CONFIG.RATE_LIMIT.WINDOW_MS,
    max: SECURITY_CONFIG.RATE_LIMIT.MAX_REQUESTS,
    message: {
      success: false,
      message: MESSAGES.ERROR.RATE_LIMIT_EXCEEDED
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({
        success: false,
        message: MESSAGES.ERROR.RATE_LIMIT_EXCEEDED
      });
    }
  });
};

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (SECURITY_CONFIG.CORS.ALLOWED_ORIGINS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Request blocked by CORS policy'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Security headers configuration
const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  },
  crossOriginEmbedderPolicy: false
});

module.exports = {
  rateLimiter: createRateLimiter(),
  corsOptions,
  helmetConfig
};