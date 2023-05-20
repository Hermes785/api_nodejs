const User = require('../Models/User.model');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Configure la stratégie d'authentification LinkedIn
passport.use(new LinkedInStrategy(
  {
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: process.env.LINKEDIN_CALLBACK_URL,
    scope: ['r_emailaddress', 'r_liteprofile']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Récupère les informations utilisateur à partir du fournisseur d'authentification tiers
      const providerId = profile.id;
      const name = profile.displayName;
      const email = profile.emails[0].value;
      const password = profile.password

      // Vérifie si un utilisateur avec cet ID existe déjà
      let user = await User.findOne({ providerId });

      if (user) {
        // Si l'utilisateur existe déjà, met à jour les informations de l'utilisateur
        user.name = name;
        user.email = email;
        user.password = password
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        await user.save();
      } else {
        // Si l'utilisateur n'existe pas, crée un nouvel utilisateur
        user = new User({
          name,
          email,
          provider: 'linkedin',
          providerId,
          password,
          accessToken,
          refreshToken
        });
        await user.save();
      }
      console.log(accessToken);

      // Connecte l'utilisateur et renvoie la réponse
      done(null, { user });
    } catch (err) {
      console.error(err);
      done(err);
    }
  }
));

// Configure la sérialisation et la désérialisation des utilisateurs
passport.serializeUser((user, done) => {
  done(null, user.user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, { user });
  } catch (err) {
    done(err);
  }
});


// Redirige l'utilisateur vers LinkedIn pour l'authentification
exports.loginWithLinkedIn = passport.authenticate('linkedin', {
  state: true,
  scope: ['r_emailaddress', 'r_liteprofile']
});

// Gère la réponse de LinkedIn après l'authentification
exports.loginWithLinkedInCallback = passport.authenticate('linkedin', {
  successRedirect: 'http://localhost:3000',
  failureRedirect: '/registration'
});
