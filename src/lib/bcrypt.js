const bcrypt = require("bcrypt")

const hashPassword = async (data) => {
    const salt = 10
    return await bcrypt.hash(data, salt)
}

const verifyPassword = async (data, hashData) => {
    return await bcrypt.compare(data, hashData)
}

module.exports = {
    hashPassword,
    verifyPassword
}

