const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new BadRequestError("Please provide email and password");
    }

    const id = new Date().getDate();
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ message: "user created", token });
};

const dashboard = (req, res) => {
    const randomNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        message: `Yo ${req.user.username}`,
        secret: `authorized data: your lucky number would be - ${randomNumber}`,
    });
};

module.exports = { login, dashboard };
