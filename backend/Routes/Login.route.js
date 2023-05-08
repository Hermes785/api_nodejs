const express = require('express');
const { Login } = require('../Controller/LoginController');

const router = express.Router();

router.get('/',Login);

module.exports=router;