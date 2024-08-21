const express = require('express');
const router = express.Router();
const { initiateCall } = require('../controllers/callController');

router.post('/', initiateCall);

module.exports = router;