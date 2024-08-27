const express = require('express');
const router = express.Router();
const { initiateCall, initiateMultipleCalls } = require('../controllers/callController');

router.post('/', initiateCall);
router.post('/multiple', initiateMultipleCalls);

module.exports = router;