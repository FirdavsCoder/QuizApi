const { Postgres } = require("../../lib/pg")

class QuestionRepository extends Postgres {
    async findAll() {
        const SQL = `
        SELECT q.*, json_agg(row_to_json(v)) AS variants
        FROM questions q  INNER JOIN variants v ON q.id = v.question_id
        group by q.id
        `
        return await this.fetchAll(SQL)
    }

    async findById(id) {
        const SQL = `
        SELECT q.*, json_agg(row_to_json(v)) AS variants
        FROM questions q  INNER JOIN variants v ON q.id = v.question_id WHERE q.id = $1
        group by q.id
        `
        return await this.fetch(SQL, id)
    }

    async create(dto) {
        const SQL = "INSERT INTO questions(title) VALUES ($1)"
        return await this.fetch(SQL, dto.title)
    }

    async update(dto) {
        const SQL = "UPDATE questions SET title = $2 WHERE id=$1"
        return await this.fetch(SQL, dto.id, dto.title)
    }

    async delete(id) {
        const SQL = "DELETE FROM questions WHERE id = $1"
        return await this.fetch(SQL, id)
    }

}


module.exports = {QuestionRepository}