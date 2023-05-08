const User = require('../Models/User.model');
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');

// Configure la stratégie d'authentification Facebook
passport.use(new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'email']
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
          provider: 'facebook',
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

// Redirige l'utilisateur vers Facebook pour l'authentification
exports.loginWithFacebook = passport.authenticate('facebook', {
  scope: ['email']
});

// Gère la réponse de Facebook après l'authentification
exports.loginWithFacebookCallback = passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/registration'
});
