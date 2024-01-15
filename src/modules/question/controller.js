const {QuestionBadRequestException} = require("./exception/question.exception");
const {QuestionCreateSchema, QuestionGetByIdSchema} = require("./validation/question.schema");
const {ResData} = require("../../lib/resData");




class QuestionController {
    #service
    constructor(service) {
        this.#service = service
    }

    // Create Question
    async createQuestion(req, res) {
        try {
            const data = req.body
            const validated = QuestionCreateSchema.validate(data);
            if (validated.error) {
                throw new QuestionBadRequestException(validated.error.message);
            }
            const resData = await this.#service.create(data);
            return res.status(resData.statusCode).json(resData);
        }
        catch (error) {
            const resData = new ResData(
                error.message,
                error.statusCode,
                null,
                error
            )
            res.status(400).json(resData)
        }
    }

    // Question Get By Id
    async getQuestionById(req, res) {
        try {
            const dto = req.params.id
            const validated = QuestionGetByIdSchema.validate(req.params)
            if (validated.error) {
                throw new QuestionBadRequestException(validated.error.message)
            }
            const resData = await this.#service.getQuestionById(dto)
            return res.status(resData.statusCode).json(resData)
        }
        catch (error) {
            const resData = new ResData(
                error.message,
                error.statusCode,
                null,
                error
            )
            res.status(400).json(resData)
        }
    }

    // GET ALL Questions
    async getAllQuestions(req, res) {
        try {
            const resData = await this.#service.getAll()
            return res.status(resData.statusCode).json(resData)
        }
        catch (error) {
            const resData = new ResData(
                error.message,
                error.statusCode,
                null,
                error
            )
            res.status(400).json(resData)
        }
    }

    // Update Test By Id
    async updateQuestionById(req, res) {
        try {
            const id = req.params.id
            const dto = req.body
            const validated = QuestionGetByIdSchema.validate(req.params)
            if (validated.error) {
                throw new QuestionBadRequestException(validated.error.message)
            }
            const validated2 = QuestionCreateSchema.validate(dto)
            if (validated2.error) {
                throw new QuestionBadRequestException(validated2.error.message)
            }
            const resData =  await this.#service.updateQuestion(id, dto)
            return res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(
                error.message,
                error.statusCode,
                null,
                error
            )
            return res.status(resData.statusCode).json(resData)
        }

    }


    // Delete Question By Id
    async deleteQuestionById(req, res) {
        try {
            const id = req.params.id
            const validated = QuestionGetByIdSchema.validate(req.params)
            if (validated.error) {
                throw new QuestionBadRequestException(validated.error.message)
            }
            const resData =  await this.#service.deleteQuestion(id)
            return res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(
                error.message,
                400,
                null,
                error
            )
            return res.status(resData.statusCode).json(resData)
        }
    }
}

module.exports = {QuestionController}