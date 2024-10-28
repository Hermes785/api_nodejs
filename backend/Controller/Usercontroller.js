const { model } = require('mongoose');
const UserModel = require('../Models/User.model');
const bcrypt = require('bcrypt');

module.exports.getUser = async (req, res) => {
    const user = await UserModel.find();
    res.status(200).json(user);
}

module.exports.getUserById = async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
        res.status(400).json({ message: 'User is not found' })
    }
    else {
        return res.json(user);
    }
}


module.exports.createUser = async (req, res) => {
    try {
        if (!req.body.name || !req.body.first_name || !req.body.email || !req.body.password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (!req.body.password.trim()) {
            return res.status(400).json({ message: "Password cannot be empty" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password.trim(), 10);

        const checkEmail = await UserModel.findOne({ email: req.body.email });


        if (checkEmail) {
            return res.status(400).json({ message: "This email is already in use" });
        }

        const user = await UserModel.create({
            name: req.body.name,
            first_name: req.body.first_name,
            email: req.body.email,
            password: hashedPassword,

        });

        if (user) {
            console.log(req.body);
            res.status(200).json(user);
        } else {
            res.status(400).json({ message: "An error occurred" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.DeleteUser = async (req, res) => {
    const user = await UserModel.findById(req.params.id)
    if (!user) {
        res.status(400).json({ message: "User not found" })
    }
    const User = await UserModel.findByIdAndDelete(req.params.id, req.body, { new: true });
}



module.exports.UpdateUser = async (req, res) => {
    const user = await UserModel.findById(req.params.id)
    if (!user) {
        res.status(404).json({ message: 'user not found' })
    }
    const userM = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(userM);
}


