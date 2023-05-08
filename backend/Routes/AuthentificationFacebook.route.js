const express = require('express');

const { loginWithFacebook, loginWithFacebookCallback } = require('../Controller/AuthentificationFacebook.controller');


const router = express.Router();

router.get('/facebook', loginWithFacebook);

router.get('/callback/facebook', loginWithFacebookCallback);

module.exports = router;
