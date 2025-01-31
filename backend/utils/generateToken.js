const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generateToken = (id) => {
    const token = jwt.sign(id, process.env.JWT_SECRET, { expiresIn: "7d" })
    return token;
}

module.exports = generateToken