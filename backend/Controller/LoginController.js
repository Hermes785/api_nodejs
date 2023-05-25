const UserSchema = require('../Models/User.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

//const secretKey = "votre_clé_secrète_pour_les_JWT";

module.exports.Login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await UserSchema.findOne({ email: email });

    if (!user) {
        console.log('Email not found');
        return res.status(400).json({ message: "Email not found" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
        console.log('Password incorrect');
        return res.status(400).json({ message: "Password incorrect" });
    }
    else {
        console.log('Login successful');

        // Si l'authentification réussit, générer un token JWT pour l'utilisateur
        const accessToken = jwt.sign({ userId: user._id }, process.env.secretKey, { expiresIn: '30m' });

        // Renvoyer une réponse HTTP 200 avec l'utilisateur et le token JWT dans le corps de la réponse
        res.status(200).json({ user, accessToken });
    }
    if (!user && !comparePassword) {
        console.log("email and password are not found")
    }
}
