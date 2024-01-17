const { Postgres } = require("../../lib/pg")

class QuestionRepository extends Postgres {
    async findAll() {
        return await this.fetchAll("SELECT * FROM quizapi.question_findall_view")
    }

    async findById(id) {
        return await this.fetch("SELECT * FROM quizapi.question_findall_view WHERE id = $1", id)
    }

    async create(dto) {
        const SQL = "INSERT INTO quizapi.questions(title) VALUES ($1) RETURNING * "
        return await this.fetch(SQL, dto.title)
    }

    async update(dto) {
        const SQL = "UPDATE quizapi.questions SET title = $2 WHERE id=$1 RETURNING * "
        return await this.fetch(SQL, dto.id, dto.title)
    }

    async delete(id) {
        const SQL = "DELETE FROM quizapi.questions WHERE id = $1 RETURNING *"
        return await this.fetch(SQL, id)
    }

}


module.exports = {QuestionRepository}