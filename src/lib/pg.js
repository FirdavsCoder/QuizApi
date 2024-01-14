const {Pool} = require("pg")
const config = require("../config/config")


const pool = new Pool({
    host: config.postgresHost,
    database: config.postgresDatabase,
    password: config.postgresPassword,
    port: config.postgresPort,
    user: config.postgresUser
})

class Postgres {
    async fetch(SQL, ...args) {
        console.log(args)
        const client = await pool.connect();
        try {
            const {rows: [row]} = await client.query(SQL, args)
            console.log(row)
            return row;
        } catch (err) {
            console.log("Connecting Error", err.message);
        } finally {
            client.release();
        }
    }

    async fetchAll (SQL, ...args)  {
        const client = await pool.connect()
        try {
            const {rows} = await client.query(SQL, args)
            return rows;
        } catch (error) {
            console.log("postgres error: ", error.message);
        } finally {
            client.release()
        }
    }
}


module.exports = {
    Postgres
}