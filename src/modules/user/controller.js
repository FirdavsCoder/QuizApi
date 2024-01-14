const { UserBadRequestException } = require( "./exception/exception.js");
const { userRegisterSchema, userLoginSchema, userGetByIdSchema, userUpdateSchema } = require( "./validation/schema.js");
const { ResData } = require("../../lib/resData.js");

class UserController {
    #userService;

    // Constructor
    constructor(userService) {
        this.#userService = userService;
    }

    // User Register
    async register_user(req, res) {
        try {
            console.log(1)
            const dto = req.body;
            dto.role = "user"
            const validated = userRegisterSchema.validate(dto);
            if (validated.error) {
                throw new UserBadRequestException(validated.error.message);
            }
            console.log(2)
            console.log("ishlayapti.. controller")
            const resData = await this.#userService.create(dto);
            res.set("token", resData.data.token)
            return res.status(resData.statusCode).json(resData);
        } catch (error) {
            const resData = new ResData(
                error.message,
                error.statusCode,
                null,
                error
            )
            res.status(404).json(resData)
        }
    }

    // ADMIN Register
    async register_admin(req, res) {
        try {
            const dto = req.body;
            dto.role = "admin"
            const validated = userRegisterSchema.validate(dto);
            if (validated.error) {
                throw new UserBadRequestException(validated.error.message);
            }
            const resData = await this.#userService.create(dto);
            console.log(resData.data.token)
            res.set("token", resData.data.token)
            return res.status(resData.statusCode).json(resData);
        } catch (error) {
            const resData = new ResData(
                error.message,
                error.statusCode,
                null,
                error
            )
            res.status(404).json(resData)
        }
    }

    // User Login
    async login(req, res) {
        try {
            const dto = req.body;
            const validated = userLoginSchema.validate(dto);

            if (validated.error) {
                throw new UserBadRequestException(validated.error.message);
            }

            const resData = await this.#userService.login(dto);
            req.header("token", resData.data.token)
            return res.status(resData.statusCode).json(resData)
        } catch (error) {
            const resData = new ResData(
                error.message,
                error.statusCode,
                null,
                error
            )
            return res.status(error.statusCode).json(resData)
        }
    }

    // Get User By Id
    async getUserByIdd(req, res){
        try {
            const dto = req.params.id
            const validated = userGetByIdSchema.validate(req.params)
            if (validated.error) {
                throw new UserBadRequestException(validated.error.message)
            }
            const resData = await this.#userService.getUserById(dto)
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

    // Get All Users
    async getAllUsers(req, res) {
        const resData = await this.#userService.getAll()
        return res.status(resData.statusCode).json(resData)
    }

    // Update User By Id
    async updateUserById(req, res) {
        try {
            const id = req.params.id
            const dto = req.body
            const validated = userGetByIdSchema.validate(req.params)
            if (validated.error) {
                throw new UserBadRequestException(validated.error.message)
            }
            const validated2 = userUpdateSchema.validate(dto)
            if (validated2.error) {
                throw new UserBadRequestException(validated2.error.message)
            }
            const resData =  await this.#userService.updateUser(id, dto)
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

    // Delete User By Id
    async deleteUserById(req, res) {
        try {
            const id = req.params.id
            const validated = userGetByIdSchema.validate(req.params)
            if (validated.error) {
                throw new UserBadRequestException(validated.error.message)
            }
            const resData =  await this.#userService.deleteUser(id)
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

module.exports = {UserController}
