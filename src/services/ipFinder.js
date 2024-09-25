require('dotenv').config();
const logger = require('../config/logger');

/**
 * Function to extract the IP address from a given message.
 * @param {string} message - The message to search for an IP address.
 * @returns {string|null} - Returns the IP address if found, otherwise null.
 */
const ipFinder = (message) => {
    // Regular expression to match an IPv4 address
    const ipRegex = /(\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b)/;

    // Search for the IP address in the message
    const match = message.match(ipRegex);

    if (match) {
        const ipAddress = match[0]; // Extract the matched IP address
        logger.info(`IP address found: ${ipAddress} in message: ${message}`);
        return ipAddress;
    } else {
        logger.warn(`No IP address found in message: ${message}`);
        return null;
    }
};

module.exports = ipFinder;
