const User = require('../Models/User.model');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const jwt = require('jsonwebtoken');

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

      // Génère un token JWT
      const token = jwt.sign({ userId: user._id }, process.env.secretKey, { expiresIn: '30m' });

      // Connecte l'utilisateur et renvoie la réponse avec le token JWT
      done(null, { user, token });
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

// Redirige l'utilisateur vers Google pour l'authentification
exports.loginWithGoogle = passport.authenticate('google', {
  scope: ['profile', 'email']
});

// Gère la réponse de Google après l'authentification
exports.loginWithGoogleCallback = (req, res, next) => {
  passport.authenticate('google', (err, user) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!user) {
      console.log('Authentication failed');
      return res.redirect('/registration');
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return next(err);
      }

      const accessToken = user.token; // Récupère l'accessToken depuis l'objet utilisateur
      console.log(accessToken);

      // Effectuez d'autres actions avec l'accessToken si nécessaire

      // Effectue la redirection vers http://localhost:3000/ avec le code de statut 302
      return res.redirect(`http://localhost:3000/${accessToken}`);
    });
  })(req, res, next);
};
