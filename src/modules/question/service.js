const {ResData} = require("../../lib/resData");
const {QuestionNotFound, QuestionBadRequestException} = require("./exception/question.exception");
const {QuestionEntity} = require("./entity/question.entity");
const {QuestionRepository} = require("./repository");


class QuestionService {
    #repository;
    constructor() {
        this.#repository = new QuestionRepository()
    }

    async create(data) {
        const newQuestion = new QuestionEntity(data)
        await this.#repository.create(newQuestion)
        return new ResData(
            "Test created successfully",
            201,
            {
                question: newQuestion,
            }
        );
    }


    // Get Question By ID
    async getQuestionById(id) {
        const foundQuestionById = await this.#repository.findById(id)
        if (!foundQuestionById) {
            throw new QuestionNotFound();
        }
        return new ResData("Found Question", 200, foundQuestionById);
    }


    // Get All Questions
    async getAll() {
        return new ResData("all Questions", 200, await this.#repository.findAll());
    }

    // Delete Question By Id
    async deleteQuestion(id) {
        await this.getQuestionById(id)
        const deletedUser = await this.#repository.delete(id)
        return new ResData(
            "Deleted successfully!",
            200,
            deletedUser
        )
    }

    // Update Question By Id
    async updateQuestion(id, dto) {
        const { data: foundQuestionById } = await this.getQuestionById(id)
        dto.id = id
        const updatedQuestion = await this.#repository.update(dto)
        return new ResData(
            "Updated successfully!",
            200,
            updatedQuestion
        )
    }

}


module.exports = {QuestionService}