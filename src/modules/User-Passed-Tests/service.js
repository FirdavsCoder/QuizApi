const {UserPassedTestsEntity} = require("./entity/entity");
const {ResData} = require("../../lib/resData");
const { UserPassedTestNotFoundException} = require("./exception/exception");
const {UserPassedTestRepository} = require("./repository");


class UserPassedTestService {
    #repository;
    constructor() {
        this.#repository = new UserPassedTestRepository()
    }

    async create(data) {
        const newUserPassedTest = new UserPassedTestsEntity(data)
        const testData = await this.#repository.check_test(newUserPassedTest.test_id)
        if (!testData) {
            return new ResData(
                "Question not found with the id",
                400,
                null
            )
        }
        const userData = await this.#repository.check_user(newUserPassedTest.user_id)
        if (!userData) {
            return new ResData(
                "User not found with the id",
                400,
                null
            );
        }
        await this.#repository.create(newUserPassedTest)
        return new ResData(
            "UserPassedTest created successfully",
            201,
            {
                user_passed_test: newUserPassedTest,
            }
        );
    }

    async getAll() {
        return new ResData("all UserPassedTests", 200, await this.#repository.findAll())
    }

    async getUserPassedTestById(id) {
        const foundUserPassedTestById = await this.#repository.findById(id)
        if (!foundUserPassedTestById) {
            throw new UserPassedTestNotFoundException();
        }
        return new ResData("Found UserPassedTest", 200, foundUserPassedTestById);
    }


    async updateUserPassedTestById(id, dto) {
        await this.getUserPassedTestById(id)
        dto.id = id
        const updatedPassedTest = await this.#repository.update(dto)
        return new ResData(
            "Updated successfully!",
            200,
            updatedPassedTest
        )
    }

    async deleteById(id) {
        await this.getUserPassedTestById(id)
        const deletedUserPassedTest = await this.#repository.delete(id)
        return new ResData(
            "Deleted successfully!",
            200,
            deletedUserPassedTest
        )
    }

    async findByUserId(user_id) {
        const foundUserPassedTestByUserId = await this.#repository.findByUserId(user_id)
        if (!foundUserPassedTestByUserId) {
            throw new UserPassedTestNotFoundException();
        }
        return new ResData("Found Variant", 200, foundUserPassedTestByUserId);
    }

    async deleteByUserId(user_id) {
        await this.findByUserId(user_id)
        const deletedUserPassedTest = await this.#repository.deleteByUserId(user_id)
        return new ResData(
            "Deleted successfully!",
            200,
            deletedUserPassedTest
        )
    }
}

module.exports = {UserPassedTestService}