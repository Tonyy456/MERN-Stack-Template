
const express = require('express');
const path = require('path');
const myAPI = require('../api');

const router = express.Router();

router.use('/api', myAPI);
        
module.exports = router