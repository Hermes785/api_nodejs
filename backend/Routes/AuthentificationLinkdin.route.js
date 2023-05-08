const express = require('express');
const { loginWithLinkedIn, loginWithLinkedInCallback } = require('../Controller/AuthentificationLinkdin.controller');


const router = express.Router();

router.get('/linkedin', loginWithLinkedIn);

router.get('/callback/linkedin', loginWithLinkedInCallback);

module.exports = router;
