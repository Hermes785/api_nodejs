const User = require('../Models/User.model');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const passport = require('passport');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Configure la stratégie d'authentification LinkedIn
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL,
      scope: ['r_emailaddress', 'r_liteprofile'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Récupère les informations utilisateur à partir du fournisseur d'authentification tiers
        const { id: providerId, displayName: name, emails } = profile;
        const email = emails[0].value;

        // Vérifie si un utilisateur avec cet ID existe déjà
        let user = await User.findOne({ providerId });

        if (user) {
          // Si l'utilisateur existe déjà, met à jour les informations de l'utilisateur
          user.name = name;
          user.email = email;
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
            accessToken,
            refreshToken,
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
  )
);

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
  scope: ['r_emailaddress', 'r_liteprofile'],
});

exports.loginWithLinkedInCallback = (req, res, next) => {
  passport.authenticate('linkedin', (err, user) => {
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
