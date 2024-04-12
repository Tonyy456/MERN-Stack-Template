
const express = require('express');
const path = require('path');
const myAPI = require('../api');

const router = express.Router();

router.use('/api', myAPI);
router.get("*", (req,res) => {
        res.sendFile(
            path.resolve(__dirname, "../../../frontend/build/index.html")
        ); 
    }
) //wild card. redirect unknown pages to react...
        
module.exports = router