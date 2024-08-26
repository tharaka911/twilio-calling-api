const logger = require('../config/logger');

const storeData = (req, res) => {
    try {
        const data = req.body; // req.body will contain the parsed data

        // Log the data to the log file and console
        logger.info('Data received:', { subject: data.subject, message: data.message });
        console.log('Data received:', { subject: data.subject, message: data.message });

        res.status(200).send('Data logged successfully');
    } catch (error) {
        // Log the error to the log file and console
        logger.error('Error logging data:', error);
        console.error('Error logging data:', error);

        res.status(500).send('Failed to log data');
    }
};

module.exports = {
    storeData
};
