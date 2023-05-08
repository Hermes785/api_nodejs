const express = require('express');
const dotenv = require("dotenv").config();
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const session = require('express-session');
const passport = require('passport');
const app = express();
const port= process.env.PORT;
//rend le .env connu dans tous le projet

const connectDB = require('./config/db.js');
const { loginWithLinkedInCallback } = require('./Controller/AuthentificationLinkdin.controller.js');

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


app.use("/formation",require("./Routes/Formation.route.js"));

app.use("/auth",require("./Routes/AuthentificationLinkdin.route.js"));

app.use("/auth",require("./Routes/AuthentificationGoogle.route.js"));

app.use("/auth",require("./Routes/AuthentificationFacebook.route.js"));

app.use("/register", require("./Routes/User.route.js"))

app.use('/login',require("./Routes/Login.route.js"))

app.listen(port,()=> console.log('le server a demarer sur le port'+" "+port));