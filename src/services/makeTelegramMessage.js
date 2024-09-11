require('dotenv').config();
const axios = require('axios');
const logger = require('../config/logger');

const telegramToken = process.env.TELEGRAM_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const telegramApiUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

const sendTelegramMessage = async (message) => {
    try {
        const response = await axios.post(telegramApiUrl, {
            chat_id: chatId,
            text: message
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        logger.info('Telegram message sent successfully', response.data);
    } catch (error) {
        logger.error('Failed to send Telegram message', error);
    }
};

module.exports = sendTelegramMessage;
