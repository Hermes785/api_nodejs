const express = require('express');
const { Login } = require('../Controller/LoginController');

const router = express.Router();

router.post('/login', Login);

module.exports = router;