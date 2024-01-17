const {Postgres} = require("../../lib/pg")

class VariantRepository extends Postgres {
    async findAll() {
        return await this.fetchAll("SELECT * FROM quizapi.variant_findall_view")
    }

    async check_question(id) {
        const SQL = `
        SELECT * FROM quizapi.questions WHERE id=$1
        `
        return await this.fetch(SQL, id)
    }

    async findById(id) {
        return await this.fetch("SELECT * FROM quizapi.variant_findall_view WHERE id = $1", id)
    }

    async create(data) {
        const SQL = `
        INSERT INTO quizapi.variants(title, description, question_id, is_correct)
        VALUES ($1, $2, $3, $4) RETURNING * 
        `
        return await this.fetch(SQL, data.title, data.description, data.question_id, data.is_correct)
    }

    async delete(id) {
        const SQL = `
        DELETE FROM quizapi.variants WHERE id=$1 RETURNING * 
        `
        return await this.fetch(SQL, id)
    }


    async update(data) {
        const SQL = `
        UPDATE quizapi.variants SET title = $2, description=$3, question_id=$4, is_correct=$5
        WHERE id=$1 RETURNING *
        `
        return await this.fetch(SQL, data.id, data.title, data.description, data.question_id, data.is_correct)
    }
}

module.exports = {VariantRepository}