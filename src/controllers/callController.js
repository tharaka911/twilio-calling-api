const client = require('../config/twilioClient');
const logger = require('../config/logger');

const initiateCall = (req, res) => {
    const { to } = req.body;

    logger.info(`Received request to call ${to}`);

    client.calls.create({
        url: 'http://demo.twilio.com/docs/voice.xml',
        to: to,
        from: process.env.TWILIO_PHONE_NUMBER
    })
    .then(call => {
        logger.info(`Call initiated successfully with SID: ${call.sid}`);
        res.status(200).send(`Call initiated with SID: ${call.sid}`);
    })
    .catch(error => {
        logger.error(`Failed to initiate call: ${error.message}`);
        res.status(500).send('Failed to initiate call');
    });
};

module.exports = {
    initiateCall
};