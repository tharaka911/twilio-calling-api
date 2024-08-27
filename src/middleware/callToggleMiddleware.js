// middleware/callToggleMiddleware.js
const { getCallingEnable } = require('../config/callConfig');
const logger = require('../config/logger');

const callToggleMiddleware = (req, res, next) => {
    if (getCallingEnable()) {
        next();
    } else {
        logger.warn('calling is disabled');
        res.status(403).json({ message: 'Forbidden: calling is disabled' });
    }
};

module.exports = callToggleMiddleware;

