const logger = require('../config/logger');

const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey && apiKey === process.env.API_KEY) {
        next();
    } else {
        logger.warn('Unauthorized access attempt');
        res.status(403).json({ message: 'Forbidden: Invalid API Key' });
    }
};

module.exports = apiKeyMiddleware;