const express = require('express');
const router = express.Router();
const { stopCalling , startCalling , callingStatus} = require('../controllers/callController');

router.post('/stopCalling', stopCalling);
router.post('/startCalling', startCalling);
router.get('/status', callingStatus);

module.exports = router;