const {Postgres} = require("../../lib/pg")

class TestRepository extends Postgres {
    async findAll() {
        const SQL = `
        SELECT t.* AS test, 
               (SELECT jsonb_agg(jsonb_build_object('question', row_to_json(q), 
                   'variants', (SELECT jsonb_agg(v) FROM variants v WHERE v.question_id = q.id))) 
               FROM questions q LEFT JOIN test_questions tq ON q.id = tq.question_id) AS questions
        FROM tests t
        `
        return await this.fetchAll(SQL)
    }

    async insert(data) {
        const SQL = `
        INSERT INTO tests(title, description) VALUES($1, $2) RETURNING *
        `
        return await this.fetch(SQL, data.title, data.description)
    }

    async findById(id) {
        const SQL = `
        SELECT t.title AS test, 
               jsonb_build_object('questions', (SELECT jsonb_agg(jsonb_build_object('question', row_to_json(q), 
                   'variants', (SELECT jsonb_agg(v) FROM variants v WHERE v.question_id = q.id))) 
               FROM questions q INNER JOIN test_questions tq ON q.id = tq.question_id)) AS question 
        FROM tests t WHERE t.id = $1
        `
        return await this.fetch(SQL, id)
    }

    async delete(id) {
        const SQL = `
        DELETE FROM tests WHERE id=$1 RETURNING *
        `
        return await this.fetch(SQL, id)
    }

    async update(dto) {
        const SQL = `
        UPDATE tests SET title=$2, description=$3 WHERE id = $1 
        `
        return await this.fetch(SQL, dto.id, dto.title, dto.description)
    }
}


module.exports = {TestRepository}