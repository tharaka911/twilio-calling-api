const rateLimit = require('express-rate-limit');

// Define the rate limit rule
const rateLimitMiddleware = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 5 requests per `window` (here, per 1 minutes)
  message: 'Too many requests from this IP, please try again after 1 minutes'
});

module.exports = rateLimitMiddleware;