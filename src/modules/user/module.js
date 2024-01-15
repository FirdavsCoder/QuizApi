const { Router } = require( "express")
const { UserService } = require( "./service.js")
const { UserController } = require( "./controller.js")
const { AuthorizationMiddleware } = require( "../../middleware/middlewares")


const authorization = new AuthorizationMiddleware();
const userRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - login
 *         - password
 *         - full_name
 *         - birthdate
 *         - file_id
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the book
 *         login:
 *           type: string
 *           description: The login of user
 *         password:
 *           type: string
 *           description: The user password
 *         full_name:
 *           type: string
 *           description: The user full_name
 *         birthdate:
 *           type: string
 *           format: date
 *           description: The user birthdate
 *         file_id:
 *           type: number
 *           description: The user file_id
 *
 */
/**
 * @swagger
 * tags:
 *   - name: users
 *     description: Managing User Apis
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - users
 *     description: Endpoint to register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *               full_name:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 description: The birthdate of the new user (YYYY-MM-DD).
 *               file_id:
 *                 type: number
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request, check the request payload
 */
userRouter.post("/register",  (req, res) => {
    userController.register_user(req, res);
});



/**
 * @swagger
 * tags:
 *   - name: users
 *     description: Managing User Apis
 * /api/register-admin:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - users
 *     description: Endpoint to register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *               full_name:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 description: The birthdate of the new user (YYYY-MM-DD).
 *               file_id:
 *                 type: number
 *     responses:
 *       201:
 *         description: Admin created successfully
 *       400:
 *         description: Bad request, check the request payload
 */
userRouter.post("/register-admin", (req, res) => {
    userController.register_admin(req, res);
});


/**
 * @swagger
 * tags:
 *   - name: users
 *     description: Managing User Apis
 * /api/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - users
 *     description: Endpoint for user login.
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
userRouter.post("/login", (req, res) => {
    userController.login(req, res);
});

/**
 * @swagger
 * tags:
 *   - name: users
 *     description: Managing User Apis
 * /api/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - users
 *     description: Endpoint to get user information by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 */
userRouter.get("/:id", (req, res) => {
    userController.getUserByIdd(req, res)
})

/**
 * @swagger
 * tags:
 *   - name: users
 *     description: Managing User Apis
 * /api/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags:
 *       - users
 *     description: Endpoint to update user information by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details updated successfully
 */
userRouter.put("/:id", (req, res) => {
    userController.updateUserById(req, res)
})

/**
 * @swagger
 * tags:
 *   - name: users
 *     description: Managing User Apis
 * /api/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags:
 *       - users
 *     description: Endpoint to delete user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
userRouter.delete("/:id",
    authorization.checkUser,
    authorization.authorization,
    authorization.adminRole,
    (req, res) => {
        userController.deleteUserById(req, res)
    }
)

/**
 * @swagger
 * tags:
 *   - name: users
 *     description: Managing User Apis
 * /api/:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - users
 *     description: Endpoint to get all users. (Admin only)
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 */
userRouter.get("/",
    authorization.checkUser,
    authorization.authorization,
    authorization.adminRole,
    (req, res) => {
        userController.getAllUsers(req, res)
    }
)


module.exports = { userRouter };
