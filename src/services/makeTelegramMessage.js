// require('dotenv').config();
// const axios = require('axios');
// const logger = require('../config/logger');

// const telegramToken = process.env.TELEGRAM_TOKEN;
// const chatId = process.env.TELEGRAM_CHAT_ID;
// const telegramApiUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

// const sendTelegramMessage = async (message) => {
//     try {
//         const response = await axios.post(telegramApiUrl, {
//             chat_id: chatId,
//             text: message
//         }, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         logger.info('Telegram message sent successfully', response.data);
//     } catch (error) {
//         logger.error('Failed to send Telegram message', error);
//     }
// };

// module.exports = sendTelegramMessage;

require('dotenv').config();
const axios = require('axios');
const logger = require('../config/logger');

// Validate environment variables
const telegramToken = process.env.TELEGRAM_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
if (!telegramToken || !chatId) {
    throw new Error('Telegram token and chat ID must be defined in environment variables');
}

const telegramApiUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

// Set up axios instance with a timeout and default config
const axiosInstance = axios.create({
    baseURL: telegramApiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000 // 5 seconds timeout
});

const sendTelegramMessage = async (message, retryCount = 3) => {
    try {
        // Validate the message
        if (!message || typeof message !== 'string') {
            throw new Error('Message must be a valid string');
        }

        const response = await axiosInstance.post('', {
            chat_id: chatId,
            text: message
        });

        logger.info('Telegram message sent successfully', response.data);
    } catch (error) {
        // Retry logic for network errors or 5xx server responses
        if (retryCount > 0 && (!error.response || error.response.status >= 500)) {
            logger.warn(`Retrying... Attempts remaining: ${retryCount}`);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
            return sendTelegramMessage(message, retryCount - 1);
        }

        // Log more details about the error
        if (error.response) {
            logger.error(`Failed to send Telegram message (Status: ${error.response.status})`, error.response.data);
        } else if (error.request) {
            logger.error('No response received from Telegram API', error.message);
        } else {
            logger.error('Error in setting up the request', error.message);
        }
    }
};

module.exports = sendTelegramMessage;
