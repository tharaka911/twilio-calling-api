const logger = require('../config/logger');
const makeCall = require('../services/makeCalls');



// List of words to check in the subject
const wordList = ['New User Login'];

/**
 * Function to check if the subject contains any words from the list.
 * @param {string} subject - The subject to check.
 * @returns {number} - Returns 1 if a match is found, otherwise returns 0.
 */
const dataScanner = (subject) => {
    // Iterate over the word list and check if the subject contains any of the words
    for (const word of wordList) {
        if (subject.includes(word)) {
            logger.info(`Match found: ${word} in subject: ${subject}`);
            return 1;
            //I need to make a api call to the external service
            makeCall('+94702294400');

        }
    }
    logger.info(`No match found in subject: ${subject}`);
    return 0;
};

module.exports = dataScanner;