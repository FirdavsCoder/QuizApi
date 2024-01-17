const { Postgres } = require("../../lib/pg")

class UserPassedTestRepository extends Postgres {
    async findAll() {
        return await this.fetchAll("SELECT * FROM quizapi.user_passed_test_findall_view")
    }

    async findById(id) {
        return await this.fetch("SELECT * FROM quizapi.user_passed_test_findall_view WHERE id = $1", id)
    }

    async findByUserId(user_id) {
        const SQL = `
        SELECT 
            upt.id, 
            jsonb_build_object('id', u.id, 'login', u.login, 'password', u.password, 'full_name', u.full_name, 
                                'birthdate', u.birthdate, 'role', u.role, 'file', 
                                row_to_json(f.*)) AS users,
            row_to_json(t.*) as test, 
            upt.total_questions, upt.passed_questions, upt.created_at
        FROM quizapi.user_passed_tests upt 
        INNER JOIN quizapi.users u ON upt.user_id = u.id 
        INNER JOIN quizapi.tests t ON upt.test_id = t.id 
        INNER JOIN quizapi.files f ON f.id = u.file_id
        WHERE upt.user_id = $1
        `
        return await this.fetch(SQL, user_id)
    }

    async create(data) {
        const SQL = `
        INSERT INTO quizapi.user_passed_tests(user_id, test_id, total_questions, passed_questions)
        VALUES ($1, $2, $3, $4)
        `

        return await this.fetch(SQL, data.user_id, data.test_id, data.total_questions, data.passed_questions)
    }

    async delete(id) {
        const SQL = `
        DELETE FROM quizapi.user_passed_tests WHERE id = $1
        `
        return await this.fetch(SQL, id)
    }

    async deleteByUserId(user_id) {
        const SQL = `
        DELETE FROM quizapi.user_passed_tests WHERE user_id = $1
        `
        return await this.fetch(SQL, user_id)
    }

    async update(data) {
        const SQL = `
        UPDATE quizapi.user_passed_tests SET user_id = $2, test_id=$3 
        WHERE id = $1
        `

        return await this.fetch(SQL, data.id, data.user_id, data.test_id)
    }

    async check_test(id) {
        const SQL = `
        SELECT * FROM quizapi.tests WHERE id=$1
        `
        return await this.fetch(SQL, id)
    }

    async check_user(id) {
        const SQL = `
        SELECT * FROM quizapi.users WHERE id=$1
        `
        return await this.fetch(SQL, id)
    }
}


module.exports = {
    UserPassedTestRepository
}