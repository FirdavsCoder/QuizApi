const {config} = require("dotenv")

config()

module.exports = {
    port: process.env.PORT ? Number(process.env.PORT) : 7777,
    jwt_key: process.env.JWT_KEY,
    postgresUser: process.env.POSTGRES_USER,
    postgresHost: process.env.POSTGRES_HOST,
    postgresPort: process.env.POSTGRES_PORT,
    postgresDatabase: process.env.POSTGRES_DATABASE,
    postgresPassword: process.env.POSTGRES_PASSWORD
}
