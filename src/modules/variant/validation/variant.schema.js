const Joi = require("joi")

const VariantCreateSchema = Joi.object({
    title: Joi.string().required().min(5).max(150),
    description: Joi.string().required().min(10).max(500),
    question_id: Joi.number().required(),
    is_correct: Joi.bool().required()
})

const VariantGetSchema = Joi.object({
    id: Joi.number().required()
})

module.exports = {
    VariantCreateSchema, VariantGetSchema
}