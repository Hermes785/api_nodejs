const User = require('../Models/User.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

// Configure la stratégie d'authentification Google
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Récupère les informations utilisateur à partir du fournisseur d'authentification tiers
      const providerId = profile.id;
      const name = profile.displayName;
      const email = profile.emails[0].value;

      // Vérifie si un utilisateur avec cet ID existe déjà
      let user = await User.findOne({ providerId });

      if (user) {
        // Si l'utilisateur existe déjà, met à jour les informations de l'utilisateur
        user.name = name;
        user.email = email;
        await user.save();
      } else {
        // Si l'utilisateur n'existe pas, crée un nouvel utilisateur
        user = new User({
          name,
          email,
          provider: 'google',
          providerId
        });
        await user.save();
      }

      // Connecte l'utilisateur et renvoie la réponse
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err);
    }
  }
));

// Redirige l'utilisateur vers Google pour l'authentification
exports.loginWithGoogle = passport.authenticate('google', {
  scope: ['profile', 'email']
});

// Gère la réponse de Google après l'authentification
exports.loginWithGoogleCallback = passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
});
