const logger = require('../config/logger');
const makeCall = require('../services/makeCalls');

// List of words to check in the subject
const wordList = ['Zabbix agent is not available', 'High CPU utilization (over 90% for 1m)','High memory utilization (>90% for 5m)'];

// List of words to omit from making a call
const omitList = ['Resolved'];

/**
 * Function to check if the subject contains any words from the list.
 * @param {string} subject - The subject to check.
 * @returns {number} - Returns 1 if a match is found, otherwise returns 0.
 */
const dataScanner = (subject) => {
    // Check if the subject contains any words from the omit list
    for (const omitWord of omitList) {
        if (subject.includes(omitWord)) {
            logger.info(`Omit word found: ${omitWord} in subject: ${subject}`);
            return 0;
        }
    }

    // Iterate over the word list and check if the subject contains any of the words
    for (const word of wordList) {
        if (subject.includes(word)) {
            logger.info(`Match found: ${word} in subject: ${subject}`);
            makeCall(+94702294400);
            return 1;
        }
    }

    logger.info(`No match found in subject: ${subject}`);
    return 0;
};

module.exports = dataScanner;