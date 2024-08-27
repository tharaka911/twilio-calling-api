require('dotenv').config();
const axios = require('axios');
const logger = require('../config/logger'); 

const apiKey = process.env.API_KEY;
const callApiBaseUrl = process.env.CALL_API_BASE_URL;

const makeCalls = async (numbers) => {
    for (const number of numbers) {
        try {
            const response = await axios.post(`${callApiBaseUrl}/call`, {
                "to": number
                // Add any additional data you need to send in the request body
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey
                }
            });
            logger.info('API call successful', response.data);
        } catch (error) {
            logger.error('API call failed', error);
        }
    }
};

module.exports = makeCalls;