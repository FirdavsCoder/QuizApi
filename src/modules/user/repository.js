const {Postgres} = require("../../lib/pg")

class UserRepository extends Postgres{
    async findOneByLogin (login) {
        return await this.fetch("SELECT * FROM quizapi.users WHERE login=$1", login)
    }

    async findOneById (id) {
        const SQL = `
            SELECT * from quizapi.user_select WHERE id=$1;
        `
        return await this.fetch(SQL, id)
    }

    async findAll() {
        const SQL = "SELECT * FROM quizapi.users"
        return await this.fetchAll(SQL)
    }

    async insert(data){
        const SQL = `
        INSERT INTO quizapi.users(login, password, full_name, birthdate, role, file_id)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
        `
        return await this.fetch(SQL, data.login, data.password, data.full_name, data.birthdate, data.role, data.file_id)
    }

    async update(data) {
        const SQL = `
        UPDATE quizapi.users 
        SET login=$2, full_name=$3, birthdate=$4, role=$5, file_id=$6
        WHERE id=$1 RETURNING *
        `
        return await this.fetch(SQL, data.id, data.login, data.full_name, data.birthdate, data.role, data.file_id)
    }

    async delete(id) {
        const SQL = `
        DELETE FROM quizapi.users WHERE id=$1 RETURNING *
        `
        return await this.fetch(SQL, id)
    }
}


module.exports = {
    UserRepository
}

