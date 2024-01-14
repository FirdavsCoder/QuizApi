const jwt = require("jsonwebtoken")
const config = require("../config/config")
const key = "firdavs"
const getToken = (data) => {
    return jwt.sign(data, key)
}

const verifyToken = (token) => {
    return jwt.verify(token, key)
}


module.exports = {
    getToken,
    verifyToken
}

