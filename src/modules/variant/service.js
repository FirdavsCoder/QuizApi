const {VariantEntity} = require("./entity/entity");
const {VariantBadRequestException, VariantNotFoundException} = require("./exception/exception");
const {ResData} = require("../../lib/resData");
const {VariantRepository} = require("./repository");



class VariantService {
    #repository;
    constructor() {
        this.#repository = new VariantRepository()
    }

    async create(data) {
        const newVariant = new VariantEntity(data)
        const questionData = await this.#repository.check_question(newVariant.question_id)
        if (!questionData) {
            return new ResData(
                "Question not found with the id",
                400,
                null
            )
        }
        await this.#repository.create(newVariant)
        return new ResData(
            "Test created successfully",
            201,
            {
                variant: newVariant,
            }
        );
    }

    async getAll() {
        return new ResData("all Questions", 200, await this.#repository.findAll())
    }

    async getVariantById(id) {
        const foundVariantById = await this.#repository.findById(id)
        if (!foundVariantById) {
            throw new VariantNotFoundException();
        }
        return new ResData("Found Variant", 200, foundVariantById);
    }


    async updateVariantById(id, dto) {
        await this.getVariantById(id)
        dto.id = id
        const updatedVariant = await this.#repository.update(dto)
        return new ResData(
            "Updated successfully!",
            200,
            updatedVariant
        )
    }

    async deleteById(id) {
        await this.getVariantById(id)
        const deletedVariant = await this.#repository.delete(id)
        return new ResData(
            "Deleted successfully!",
            200,
            deletedVariant
        )
    }
}

module.exports = {VariantService}