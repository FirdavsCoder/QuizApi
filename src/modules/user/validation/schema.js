const Joi = require("joi")


const userRegisterSchema = Joi.object({
    login: Joi.string().required().min(5).max(100),
    password: Joi.string().required(),
    full_name: Joi.string().required().min(5).max(100),
    birthdate: Joi.date().required(),
    role: Joi.string().required(),
    file_id: Joi.number().required()
})


const userLoginSchema = Joi.object({
    login: Joi.string().required().min(3).max(100),
    password: Joi.string().required()
})


const userGetByIdSchema = Joi.object({
    id: Joi.number().required()
})


const userUpdateSchema = Joi.object({
    fullName: Joi.string().required().min(3).max(100),
    role: Joi.string().required().min(4).max(5),
    birthdate: Joi.date().required(),
    file_id: Joi.number().required()
})


module.exports = {
    userRegisterSchema,
    userLoginSchema,
    userGetByIdSchema,
    userUpdateSchema
}