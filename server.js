const express = require('express');
const dotenv = require("dotenv").config();
const cors = require('cors');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const session = require('express-session');
const passport = require('passport');
const app = express();
const connectDB = require('./backend/config/db.js');
const Setting = require("./backend/config/setting.js")

const port = Setting.Setting().port;
//rend le .env connu dans tous le projet
//Middleware pour permettre les requêtes CORS depuis le frontend
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://degree-release.s3-website-eu-west-1.amazonaws.com',
    'https://www.linkedin.com',
    'http://localhost:5000',
    'https://www.linkedin.com/oauth/v2/accessToken'
  ],
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Permet l'utilisation de cookies avec les requêtes CORS
};



app.use(express.json());

app.use(express.urlencoded({ extended: false }));

connectDB();

// Configuration de la session et de passport
const sessionConfig = {
  secret: Setting.Setting().session_secret,
  resave: false,
  saveUninitialized: false
};

// Ajout du middleware session
app.use(session(sessionConfig));

// Initialisation de Passport
app.use(passport.initialize());
app.use(passport.session());


app.use(cors(corsOptions));
// Routes
app.use('/api', require('./backend/Routes/Trainning.route.js'));

app.use('/auth', require('./backend/Routes/AuthentificationLinkdin.route.js'));

app.use('/auth', require('./backend/Routes/AuthentificationGoogle.route.js'));

app.use('/auth', require('./backend/Routes/AuthentificationFacebook.route.js'));

app.use('/api', require('./backend/Routes/User.route.js'));

app.use('/api', require('./backend/Routes/Login.route.js'));

// Lancement du serveur
app.listen(port, () => console.log('Le serveur a démarré sur le port ' + port));




module.exports = app;