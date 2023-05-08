const express = require('express');
const { loginWithGoogle, loginWithGoogleCallback } = require('../Controller/AuthentificationGoogle.controller');
//const { loginWithLinkedIn, loginWithLinkedInCallback } = require('../Controller/AuthentificationLinkdin.controller');


const router = express.Router();

router.get('/google', loginWithGoogle);

router.get('/callback/google', loginWithGoogleCallback);

module.exports = router;
