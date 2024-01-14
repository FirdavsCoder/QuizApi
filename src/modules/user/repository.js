const {Postgres} = require("../../lib/pg")

class UserRepository extends Postgres{
    async findOneByLogin (login) {
        const data = await this.fetch("SELECT * FROM users WHERE login=$1", login)
        return data
    }

    async findOneById (id) {
        return await this.fetch("SELECT * FROM users WHERE id=$1", id)
    }

    async findAll() {
        const SQL = "SELECT * FROM users"
        return await this.fetchAll(SQL)
    }

    async insert(data){
        const SQL = `
        INSERT INTO users(login, password, full_name, birthdate, role, file_id)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
        `
        return await this.fetch(SQL, data.login, data.password, data.full_name, data.birthdate, data.role, data.file_id)
    }

    async update(data) {
        const SQL = `
        UPDATE users 
        SET login=$2, full_name=$3, birthdate=$4, role=$5, file_id=$6
        WHERE id=$1 RETURNING *
        `
        return await this.fetch(SQL, data.id, data.login, data.password, data.full_name, data.birthdate, data.role, data.file_id)
    }

    async delete(id) {
        const SQL = `
        DELETE FROM users WHERE id=$1 RETURNING *
        `
        return await this.fetch(SQL, id)
    }
}


module.exports = {
    UserRepository
}

