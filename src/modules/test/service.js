const {TestRepository} = require("./repository")
const {TestEntity} = require("./entity/entity");
const {TestNotFoundException, TestBadRequestException} = require("./exception/exception");
const {ResData} = require("../../lib/resData");


class TestService {
    #repository;
    constructor() {
        this.#repository = new TestRepository()
    }

    // CREATE test
    async create(data){
        // const foundTestByLogin= await this.#repository.find(data.login);
        // if (foundTestByLogin) {
        //     throw new TestBadRequestException("A test with this name already exists");
        // }

        const newTest = new TestEntity(data)
        await this.#repository.insert(newTest)
        return new ResData(
            "Test created successfully",
            201,
            {
                test: newTest,
            }
        );
    }

    // Get Test By ID
    async getTestById(id) {
        const foundTestById = await this.#repository.findById(id)
        if (!foundTestById) {
            throw new TestNotFoundException();
        }
        return new ResData("Found Test", 200, foundTestById);
    }

    // Get All Tests
    async getAll() {
        return new ResData("all Tests", 200, await this.#repository.findAll());
    }


    // Delete Test By Id
    async deleteTest(id) {
        await this.getTestById(id)
        const deletedUser = await this.#repository.delete(id)
        return new ResData(
            "Deleted successfully!",
            200,
            deletedUser
        )
    }

    // Update Test By Id
    async updateTest(id, dto) {
        const { data: foundTestById } = await this.getTestById(id)
        dto.id = id
        const updatedTest = await this.#repository.update(dto)
        return new ResData(
            "Updated successfully!",
            200,
            updatedTest
        )
    }

}



module.exports = {TestService}