const Joi = require("joi")


const QuestionCreateSchema = Joi.object({
    title: Joi.string().required().min(5).max(150)
})

const QuestionGetByIdSchema = Joi.object({
    id: Joi.number().required()
})


module.exports = {
    QuestionCreateSchema, QuestionGetByIdSchema
}