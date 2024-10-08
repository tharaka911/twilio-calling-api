const client = require('../config/twilioClient');
const logger = require('../config/logger');
const { getCallingEnable, setCallingEnable } = require('../config/callConfig');

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

const initiateMultipleCalls = (req, res) => {
    const { numbers } = req.body;

    if (!Array.isArray(numbers)) {
        return res.status(400).send('Invalid input: numbers should be an array');
    }

    const callPromises = numbers.map(number => {
        return client.calls.create({
            url: 'http://demo.twilio.com/docs/voice.xml',
            to: number,
            from: process.env.TWILIO_PHONE_NUMBER
        })
        .then(call => {
            logger.info(`Call initiated successfully with SID: ${call.sid}`);
            return { number, sid: call.sid };
        })
        .catch(error => {
            logger.error(`Failed to initiate call to ${number}: ${error.message}`);
            return { number, error: error.message };
        });
    });

    Promise.all(callPromises)
        .then(results => {
            res.status(200).json({ results });
        })
        .catch(error => {
            logger.error(`Failed to initiate multiple calls: ${error.message}`);
            res.status(500).send('Failed to initiate multiple calls');
        });
};

const stopCalling = (req, res) => {
    logger.info('Received request to stop calling');
    setCallingEnable(false);
    res.status(200).send('Calling stopped');
};

const startCalling = (req, res) => {
    logger.info('Received request to start calling');
    setCallingEnable(true);
    res.status(200).send('Calling started');
};

const callingStatus = (req, res) => {
    logger.info('Received request for calling status');
    res.status(200).json({ callingEnable: getCallingEnable() });
};

module.exports = {
    initiateCall,
    initiateMultipleCalls,
    stopCalling,
    startCalling,
    callingStatus
};