const jwt = require('jsonwebtoken')
const signToken = async (req, res) => {
}

const verifyToken = async (req, res, next) => {
    const token = req?.cookies?.token
    if (token) {
        if (jwt.verify(token, process.env.TOKEN_SECRET)) {
            next()
        } else {
            return res.status(401).end('Unauthorized access');
        }
    }
    else {
        return res.status(401).send('Token Missing')
    }
}

module.exports = { signToken, verifyToken }