class UserEntity {
    constructor(data) {
        this.login = data.login
        this.password = data.password
        this.full_name = data.full_name
        this.birthdate = data.birthdate
        this.role = data.role
        this.file_id = data.file_id
    }
}

module.exports = {UserEntity}