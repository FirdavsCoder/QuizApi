const {ResData} = require("../../lib/resData");
const {VariantBadRequestException} = require("./exception/exception");
const {VariantCreateSchema, VariantGetSchema} = require("./validation/variant.schema");




class VariantController {
    #service
    constructor(service) {
        this.#service = service
    }

    // Create Variant
    async createVariant(req, res) {
        try {
            const data = req.body
            const validated = VariantCreateSchema.validate(data);
            if (validated.error) {
                throw new VariantBadRequestException(validated.error.message);
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

    // Variant Get By Id
    async getVariantById(req, res) {
        try {
            const dto = req.params.id
            const validated = VariantGetSchema.validate(req.params)
            if (validated.error) {
                throw new VariantBadRequestException(validated.error.message)
            }
            const resData = await this.#service.getVariantById(dto)
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

    // GET ALL Variants
    async getAllVariants(req, res) {
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

    // Update Variant By Id
    async updateVariantById(req, res) {
        try {
            const id = req.params.id
            const dto = req.body
            const validated = VariantGetSchema.validate(req.params)
            if (validated.error) {
                throw new VariantBadRequestException(validated.error.message)
            }
            const validated2 = VariantCreateSchema.validate(dto)
            if (validated2.error) {
                throw new VariantBadRequestException(validated2.error.message)
            }
            const resData =  await this.#service.updateVariantById(id, dto)
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


    // Delete Variant By Id
    async deleteVariantById(req, res) {
        try {
            const id = req.params.id
            const validated = VariantGetSchema.validate(req.params)
            if (validated.error) {
                throw new VariantBadRequestException(validated.error.message)
            }
            const resData =  await this.#service.deleteById(id)
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

module.exports = {VariantController}