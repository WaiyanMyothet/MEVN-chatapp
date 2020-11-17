const _ = require('lodash');
const express = require('express');
const router = express.Router();


/** Middleware */
const {
    checkRegistrationFields,
} = require('../middleware/authenticate');

/**
 * @description  POST /register
 * @param  {} [checkRegistrationFields]
 * @param  {} request
 * @param  {} response
 * @access public
 */
router.post('/register', [checkRegistrationFields], (req, res) => {
    res.status.send(200);
});

module.exports=router;