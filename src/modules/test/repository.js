const {Postgres} = require("../../lib/pg")

class TestRepository extends Postgres {
    async findAll() {
        const SQL = "SELECT * FROM tests"
        return await this.fetchAll(SQL)
    }

    async findById(id) {
        const SQL = "SELECT * FROM tests WHERE id=$1"
        return await this.fetch(SQL, id)
    }

    async delete(id) {
        const SQL = `
        DELETE FROM tests WHERE id=$1 RETURNING *
        `
        return await this.fetch(SQL, id)
    }
}


module.exports = {TestRepository}