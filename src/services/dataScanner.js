require('dotenv').config();
const logger = require('../config/logger');
const makeCalls = require('../services/makeCalls');

// Parse the environment variables into arrays
const wordList = process.env.WORD_LIST.split(',');
const omitList = process.env.OMIT_LIST.split(',');
const numbers = process.env.NUMBERS.split(',');

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
            makeCalls(numbers);
            return 1;
        }
    }

    logger.info(`No match found in subject: ${subject}`);
    return 0;
};

module.exports = dataScanner;