const express = require('express');
const router = express.Router();
const { storeData } = require('../controllers/storeController');

router.post('/', storeData);

module.exports = router;