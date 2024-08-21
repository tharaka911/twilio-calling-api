require('dotenv').config();
const express = require('express');
const logger = require('./config/logger');
const callRoute = require('./routes/callRoute');

const app = express();

app.use(express.json());
app.use('/call', callRoute);

const port = process.env.PORT || 9000;
app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});