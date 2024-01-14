const {TestBadRequestException} = require("./exception/exception")
const {testGetByIdSchema, testCreateSchema} = require("./validation/schema");
const {ResData} = require("../../lib/resData");


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
    async getAllTests(req, res) {
        const resData = await this.#service.getAll()
        return res.status(resData.statusCode).json(resData)
    }


    // Update Test By Id
    async updateTestById(req, res) {
        try {
            const id = req.params.id
            const dto = req.body
            const validated = testGetByIdSchema.validate(req.params)
            if (validated.error) {
                throw new TestBadRequestException(validated.error.message)
            }
            const validated2 = testCreateSchema.validate(dto)
            if (validated2.error) {
                throw new TestBadRequestException(validated2.error.message)
            }
            const resData =  await this.#service.updateTest(id, dto)
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


    // Delete Test By Id
    async deleteTestById(req, res) {
        try {
            const id = req.params.id
            const validated = testCreateSchema.validate(req.params)
            if (validated.error) {
                throw new TestBadRequestException(validated.error.message)
            }
            const resData =  await this.#service.deleteTest(id)
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

module.exports = {TestController}