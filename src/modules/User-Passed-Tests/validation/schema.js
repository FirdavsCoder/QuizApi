const Joi = require("joi")

const UserPassedTestCreateSchema = Joi.object({
    user_id: Joi.number().required(),
    test_id: Joi.number().required(),
    total_questions: Joi.number().required(),
    passed_questions: Joi.number().required()
})


const UserPassedTestGetByIdSchema = Joi.object({
    id: Joi.number().required()
})


const UserPassedTestGetByUserIdSchema = Joi.object({
    userId: Joi.number().required()
})


module.exports = {
    UserPassedTestCreateSchema,
    UserPassedTestGetByUserIdSchema,
    UserPassedTestGetByIdSchema
}
