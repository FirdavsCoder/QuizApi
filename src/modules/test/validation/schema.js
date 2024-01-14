const Joi = require("joi")


const testCreateSchema = Joi.object({
    title: Joi.string().required().min(5).max(120),
    description: Joi.string().required().min(10).max(500)
})


const testGetByIdSchema = Joi.object({
    id: Joi.number().required()
})


module.exports = {
    testCreateSchema,
    testGetByIdSchema
}


