class VariantEntity {
    constructor(data) {
        this.title = data.title
        this.description = data.description
        this.question_id = data.question_id
        this.is_correct = data.is_correct
    }
}

module.exports = {VariantEntity}