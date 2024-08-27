require('dotenv').config();
const axios = require('axios');
const logger = require('../config/logger'); 

const apiKey = process.env.API_KEY;

const makeCall = async (to) => {
    try {
        const response = await axios.post('https://make-call.dft-yui.com/call', {
            "to": to
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
};

module.exports = makeCall;