const User = require('../Models/user');
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

exports.registerUser = async (req, res) => {
    let { username, email, password } = req.body;

    try {
        let userExisted = await User.findOne({ email });
        if (userExisted) return res.status(400).json({ msg: "User have already existed" });

        let newUser = await User.create({ username, email, password });
        let token = generateToken(newUser._id);
        res.status(201).json({ msg: newUser, token })
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
};

exports.loginUser = async (req, res) => {
    let { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "invalid credentials" });

        let isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });

        let token = generateToken(user._id);
        res.status(201).json({ msg: user, token });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}