require('dotenv').config(); 
const express = require('express');
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const winston = require('winston');

const app = express();

// Configure Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to error.log
        new winston.transports.File({ filename: 'combined.log' }), // Log all information to combined.log
        new winston.transports.Console({ // Log to the console
            format: winston.format.combine(
                winston.format.colorize(), // Colorize console output
                winston.format.simple() // Simplified log format for console
            )
        }),
    ],
});

// Middleware to parse JSON requests
app.use(express.json()); 

// Endpoint to initiate a call
app.post('/call', (req, res) => {
    const { to } = req.body; // Get the target phone number from the request body

    logger.info(`Received request to call ${to}`);

    client.calls.create({
        url: 'http://demo.twilio.com/docs/voice.xml', // TwiML instructions for the call
        to: to, // Target phone number
        from: process.env.TWILIO_PHONE_NUMBER // Your Twilio phone number
    })
    .then(call => {
        logger.info(`Call initiated successfully with SID: ${call.sid}`);
        res.status(200).send(`Call initiated with SID: ${call.sid}`);
    })
    .catch(error => {
        logger.error(`Failed to initiate call: ${error.message}`);
        res.status(500).send('Failed to initiate call');
    });
});

// Start the server
const port = process.env.PORT || 9000;
app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
