const {ResData} = require("../../lib/resData");
const {UserPassedTestBadRequestException} = require("./exception/exception");
const {
    UserPassedTestCreateSchema,
    UserPassedTestGetByIdSchema,
    UserPassedTestGetByUserIdSchema
} = require("./validation/schema");


class UserPassedTestController {
    #service;
    constructor(service) {
        this.#service = service
    }

    async create(req, res) {
        try {
            const dto = req.body
            const validated = UserPassedTestCreateSchema.validate(dto)
            if (validated.error) {
                throw UserPassedTestBadRequestException(validated.error.message)
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
            res.status(400).json(resData)
        }
    }

    async getAll(req, res) {
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

    async getById(req, res) {
        try {
            const dto = req.params.id
            const validated = UserPassedTestGetByIdSchema.validate(dto)
            if (validated.error) {
                throw new UserPassedTestBadRequestException(validated.error.message)
            }

            const resData = await this.#service.getUserPassedTestById(dto)
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

    async getByUserId(req, res) {
        try {
            const dto = req.params.userId
            const validated = UserPassedTestGetByIdSchema.validate(dto)
            if (validated.error) {
                throw new UserPassedTestBadRequestException(validated.error.message)
            }

            const resData = await this.#service.findByUserId(dto)
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

    async updateById(req, res) {
        try {
            const dto = req.params.id
            const validated = UserPassedTestGetByIdSchema.validate(dto)
            if (validated.error) {
                throw UserPassedTestBadRequestException(validated.error.message)
            }
            const resData = await this.#service.updateUserPassedTestById(dto)
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

    async deleteById(req, res) {
        try {
            const dto = req.params.id
            const validated = UserPassedTestGetByIdSchema.validate(dto)
            if (validated.error) {
                throw UserPassedTestBadRequestException(validated.error.message)
            }
            const resData =  await this.#service.deleteById(dto)
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

    async deleteByUserId(req, res) {
        try {
            const dto = req.params.userId
            const validated = UserPassedTestGetByUserIdSchema.validate(dto)
            if (validated.error) {
                throw UserPassedTestBadRequestException(validated.error.message)
            }
            const resData =  await this.#service.deleteByUserId(dto)
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
}

module.exports = {UserPassedTestController}
