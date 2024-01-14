const { Router } = require( "express")
const { UserService } = require( "./service.js")
const { UserController } = require( "./controller.js")
const { AuthorizationMiddleware } = require( "../../middleware/middlewares")


const authorization = new AuthorizationMiddleware();
const userRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.post("/register",  (req, res) => {
    userController.register_user(req, res);
});



userRouter.post("/register-admin", (req, res) => {
    userController.register_admin(req, res);
});



userRouter.post("/login", (req, res) => {
    userController.login(req, res);
});


userRouter.get("/:id", (req, res) => {
    userController.getUserByIdd(req, res)
})

userRouter.put("/:id", (req, res) => {
    userController.updateUserById(req, res)
})


userRouter.delete("/:id",
    authorization.checkUser,
    authorization.authorization,
    authorization.adminRole,
    (req, res) => {
        userController.deleteUserById(req, res)
    }
)


userRouter.get("/",
    authorization.checkUser,
    authorization.authorization,
    authorization.adminRole,
    (req, res) => {
        userController.getAllUsers(req, res)
    }
)


module.exports = { userRouter };
