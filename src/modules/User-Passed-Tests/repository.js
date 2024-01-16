const { Postgres } = require("../../lib/pg")

class UserPassedTestRepository extends Postgres {
    async findAll() {
        const SQL = `
        SELECT 
            upt.id, 
            jsonb_build_object('id', u.id, 'login', u.login, 'password', u.password, 'full_name', u.full_name, 
                                'birthdate', u.birthdate, 'role', u.role, 'file', 
                                row_to_json(f.*)) AS users,row_to_json(t.*) as variants, 
                                upt.total_questions, upt.passed_questions, upt.created_at
        FROM user_passed_tests upt 
        INNER JOIN users u ON upt.user_id = u.id 
        INNER JOIN tests t ON upt.test_id = t.id 
        INNER JOIN files f ON f.id = u.file_id;
        `
        return await this.fetchAll(SQL)
    }

    async findById(id) {
        const SQL = `
        SELECT 
            upt.id, 
            jsonb_build_object('id', u.id, 'login', u.login, 'password', u.password, 'full_name', u.full_name, 
                                'birthdate', u.birthdate, 'role', u.role, 'file', 
                                row_to_json(f.*)) AS users,row_to_json(t.*) as variants, 
                                upt.total_questions, upt.passed_questions, upt.created_at
        FROM user_passed_tests upt 
        INNER JOIN users u ON upt.user_id = u.id 
        INNER JOIN tests t ON upt.test_id = t.id 
        INNER JOIN files f ON f.id = u.file_id
        WHERE upt.id = $1
        `
        return await this.fetch(SQL, id)
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
        FROM user_passed_tests upt 
        INNER JOIN users u ON upt.user_id = u.id 
        INNER JOIN tests t ON upt.test_id = t.id 
        INNER JOIN files f ON f.id = u.file_id
        WHERE upt.user_id = $1
        `
        return await this.fetch(SQL, user_id)
    }

    async create(data) {
        const SQL = `
        INSERT INTO user_passed_tests(user_id, test_id, total_questions, passed_questions)
        VALUES ($1, $2, $3, $4)
        `

        return await this.fetch(SQL, data.user_id, data.test_id, data.total_questions, data.passed_questions)
    }

    async delete(id) {
        const SQL = `
        DELETE FROM user_passed_tests WHERE id = $1
        `
        return await this.fetch(SQL, id)
    }

    async deleteByUserId(user_id) {
        const SQL = `
        DELETE FROM user_passed_tests WHERE user_id = $1
        `
        return await this.fetch(SQL, user_id)
    }

    async update(data) {
        const SQL = `
        UPDATE user_passed_tests SET user_id = $2, test_id=$3 
        WHERE id = $1
        `

        return await this.fetch(SQL, data.id, data.user_id, data.test_id)
    }

    async check_test(id) {
        const SQL = `
        SELECT * FROM tests WHERE id=$1
        `
        return await this.fetch(SQL, id)
    }

    async check_user(id) {
        const SQL = `
        SELECT * FROM users WHERE id=$1
        `
        return await this.fetch(SQL, id)
    }
}


module.exports = {
    UserPassedTestRepository
}