const User = require('../Models/User.model');
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
const setting = require('../config/setting')
// Configure la stratégie d'authentification Facebook
passport.use(new FacebookStrategy(
  {
    clientID: setting.Setting().url_facebook_id,
    clientSecret: setting.Setting().url_facebook_key,
    callbackURL: setting.Setting().url_facebook_callback,
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

      // Génère un token JWT
      const token = jwt.sign({ userId: user._id }, setting.Setting().key_secret, { expiresIn: '30m' });

      // Connecte l'utilisateur et renvoie la réponse
      done(null, user);
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

// Redirige l'utilisateur vers Facebook pour l'authentification
exports.loginWithFacebook = passport.authenticate('facebook', {
  scope: ['email']
});

// Gère la réponse de Facebook après l'authentification
exports.loginWithFacebookCallback = (req, res, next) => {
  passport.authenticate('facebook', (err, user) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!user) {
      console.log('Authentication failed');
      return res.redirect(`${setting.Setting().url_home}/registration`);
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return next(err);
      }

      const accessToken = user.token; // Récupère l'accessToken depuis l'objet utilisateur
      console.log(accessToken);

      // Effectuez d'autres actions avec l'accessToken si nécessaire

      // Effectue la redirection vers ${setting.Setting().url_home}/${accessToken} avec le code de statut 302
      return res.redirect(`${setting.Setting().url_home}/${accessToken}`);
    });
  })(req, res, next);
};
