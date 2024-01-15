const {Postgres} = require("../../lib/pg")

class VariantRepository extends Postgres {
    async findAll() {
        const SQL = `
            SELECT v.id, v.title, v.description, v.is_correct, row_to_json(q) AS question
            FROM variants v  left join  questions q ON q.id = v.question_id
        `
        return await this.fetchAll(SQL)
    }

    async check_question(id) {
        const SQL = `
        SELECT * FROM questions WHERE id=$1
        `
        return await this.fetch(SQL, id)
    }

    async findById(id) {
        const SQL = `
        SELECT v.id, v.title, v.description, v.is_correct, row_to_json(q) AS question
        FROM variants v  left join  questions q ON q.id = v.question_id  WHERE v.id = $1
        `
        return await this.fetch(SQL, id)
    }

    async create(data) {
        const SQL = `
        INSERT INTO variants(title, description, question_id, is_correct)
        VALUES ($1, $2, $3, $4) RETURNING * 
        `
        return await this.fetch(SQL, data.title, data.description, data.question_id, data.is_correct)
    }

    async delete(id) {
        const SQL = `
        DELETE FROM variants WHERE id=$1 RETURNING * 
        `
        return await this.fetch(SQL, id)
    }


    async update(data) {
        const SQL = `
        UPDATE variants SET title = $2, description=$3, question_id=$4, is_correct=$5
        WHERE id=$1 RETURNING *
        `
        return await this.fetch(SQL, data.id, data.title, data.description, data.question_id, data.is_correct)
    }
}

module.exports = {VariantRepository}