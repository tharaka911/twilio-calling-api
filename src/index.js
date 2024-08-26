require('dotenv').config();
const express = require('express');
const logger = require('./config/logger');
const callRoute = require('./routes/callRoute');
const storeRoute = require('./routes/storeRoute');
const apiKeyMiddleware = require('./middleware/apiKeyMiddleware');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/call', apiKeyMiddleware, callRoute);
app.use('/store', apiKeyMiddleware, storeRoute);


const port = process.env.PORT || 9000;
app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});


