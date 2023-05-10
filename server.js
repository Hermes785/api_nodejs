const express = require('express');
const dotenv = require("dotenv").config();
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const session = require('express-session');
const passport = require('passport');
const app = express();
const port= process.env.PORT;
//rend le .env connu dans tous le projet

const connectDB = require('./backend/config/db.js');
//const { loginWithLinkedInCallback } = require('./backend/Controller/AuthentificationLinkdin.controller.js');

app.use(express.json());

app.use(express.urlencoded({extended:false}));

connectDB();
// Configuration de la session
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


app.use("/formation",require("./backend/Routes/Formation.route.js"));

app.use("/auth",require("./backend/Routes/AuthentificationLinkdin.route.js"));

app.use("/auth",require("./backend/Routes/AuthentificationGoogle.route.js"));

app.use("/auth",require("./backend/Routes/AuthentificationFacebook.route.js"));

app.use("api/register", require("./backend/Routes/User.route.js"))

app.use('api/login',require("./backend/Routes/Login.route.js"))

app.listen(port,()=> console.log('le server a demarer sur le port'+" "+port));