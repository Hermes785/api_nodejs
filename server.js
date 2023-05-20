const express = require('express');
const dotenv = require("dotenv").config();
const cors = require('cors');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const session = require('express-session');
const passport = require('passport');
const app = express();
const connectDB = require('./backend/config/db.js');
const port = process.env.PORT;
//rend le .env connu dans tous le projet
//Middleware pour permettre les requêtes CORS depuis le frontend
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://degree-release.s3-website-eu-west-1.amazonaws.com',
    'https://www.linkedin.com',
    'http://localhost:5000/auth/callback/linkedin',
    ''
  ]
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

connectDB();

// Configuration de la session et de passport
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
};

// Ajout du middleware session
app.use(session(sessionConfig));

// Initialisation de Passport
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/formation', require('./backend/Routes/Trainning.route.js'));

app.use('/auth', require('./backend/Routes/AuthentificationLinkdin.route.js'));

app.use('/auth', require('./backend/Routes/AuthentificationGoogle.route.js'));

app.use('/auth', require('./backend/Routes/AuthentificationFacebook.route.js'));

app.use('/api', require('./backend/Routes/User.route.js'));

app.use('/api', require('./backend/Routes/Login.route.js'));

// Lancement du serveur
app.listen(port, () => console.log('Le serveur a démarré sur le port ' + port));

module.exports = app;