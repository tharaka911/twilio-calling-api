// const logger = require('../config/logger');

// const storeData = (req, res) => {
    
// };

// module.exports = {
//     storeData
// };

const logger = require('../config/logger');

const storeData = (req, res) => {
    try {
        const data = req.body;

        // Log the data to the log file and console
        logger.info('Data received:', data);
        console.log('Data received:', data);

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