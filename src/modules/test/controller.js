const {TestBadRequestException} = require("./exception/exception")
const {testGetByIdSchema, testCreateSchema} = require("./validation/schema");
const {ResData} = require("../../lib/resData");
const {userGetByIdSchema} = require("./validation/schema.js");
const {UserBadRequestException} = require("./exception/exception.js");



class TestController {
    #service;
    constructor(service) {
        this.#service = service
    }

    async create_test(req, res) {
        try {
            const dto = req.body
            const validated = testCreateSchema.validate(dto);
            if (validated.error) {
                throw new TestBadRequestException(validated.error.message);
            }
            const resData = await this.#service.create(dto);
            return res.status(resData.statusCode).json(resData);
        }
        catch (error) {
            const resData = new ResData(
                error.message,
                error.statusCode,
                null,
                error
            )
            res.status(404).json(resData)
        }
    }


    // Get test By id
    async getTestByIdd(req, res){
        try {
            const dto = req.params.id
            const validated = testGetByIdSchema.validate(req.params)
            if (validated.error) {
                throw new TestBadRequestException(validated.error.message)
            }
            const resData = await this.#service.getTestById(dto)
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


    // Get All Tests
    async getAllUsers(req, res) {
        const resData = await this.#service.getAll()
        return res.status(resData.statusCode).json(resData)
    }


}

module.exports = {TestController}