const {UserRepository} = require( "./repository");
const {UserEntity} = require("./entity/entity")
const  { hashPassword, verifyPassword } = require("../../lib/bcrypt");
const {ResData} = require("../../lib/resData")
const {
    UserAlreadyExistException,
    UserNotFoundByIdException,
    UserNotFoundException,
    UserPasswordWrongException
} = require( "./exception/exception.js")
const {getToken} = require( "../../lib/jwt.js")


class UserService {
    #repository;
    constructor() {
        this.#repository = new UserRepository()
    }
    // CREATE user
    async create(data){
        const foundUserByLogin= await this.#repository.findOneByLogin(data.login);
        if (foundUserByLogin) {
            throw new UserAlreadyExistException();
        }
        const hashedPassword = await hashPassword(data.password);
        const userObject = Object.assign(data, {password: hashedPassword})
        const newUser = new UserEntity(userObject)
        const createdUser = await this.#repository.insert(newUser)
        const newToken = getToken(createdUser.id)
        return new ResData(
            "User created successfully",
            201,
            {
                token: newToken,
                user: newUser,
            }
        );
    }

    // GET USER BY LOGIN
    async getUserByLogin(login) {
        const foundUser = await this.#repository.findOneByLogin(login)
        console.log("foundUser: ",foundUser)
        let resData;
        if (foundUser) {
            resData = new ResData("foun user by login", 200, foundUser);
        } else {
            resData = new ResData("not found", 404, null);
        }
        console.log("resData: ", resData)
        return resData;
    }

    // Get All Users
    async getAll() {
        return new ResData("all users", 200, await this.#repository.findAll());
    }

    // User Login
    async login(dto) {

        const foundUserByLogin = await this.getUserByLogin(dto.login);

        if (!foundUserByLogin.data) {
            throw new UserNotFoundException();
        }
        const isValidPassword = await verifyPassword(
            dto.password,
            foundUserByLogin.data.password
        );
        if (!isValidPassword) {
            throw new UserPasswordWrongException();
        }

        const newToken = getToken(foundUserByLogin.data.id);
        const resData = new ResData("login success", 200, {
            token: newToken,
            user: foundUserByLogin.data,
        });

        return resData;
    }

    // Get User By ID
    async getUserById(id) {
        const foundUserById = await this.#repository.findOneById(id)
        if (!foundUserById) {
            throw new UserNotFoundByIdException();
        }
        return new ResData("Found User", 200, foundUserById);
    }

    // Update User By Id
    async updateUser(id, dto) {
        const { data: foundUserById } = await this.getUserById(id)
        const updatedUser = await this.#repository.update(foundUserById)
        const resData = new ResData(
            "Updated successfully!",
            200,
            updatedUser
        )
        return resData
    }

    // Delete User By Id
    async deleteUser(id) {
        const { data: foundUserById } = await this.getUserById(id)
        const deletedUser = await this.#repository.delete(id)
        return new ResData(
            "Deleted successfully!",
            200,
            deletedUser
        )
    }
}

module.exports = {UserService}