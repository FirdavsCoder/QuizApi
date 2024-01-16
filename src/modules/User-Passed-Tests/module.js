const {UserPassedTestController} = require("./controller");
const {UserPassedTestService} = require("./service");
const {Router} = require("express");


const userPassedTestRouter = Router()
const userPassedTestService = new UserPassedTestService()
const userPassedTestController = new UserPassedTestController(userPassedTestService)


userPassedTestRouter.get("/", (req, res) =>{
    userPassedTestController.getAll(req, res)
})

userPassedTestRouter.get("/:id", (req, res) => {
    userPassedTestController.getById(req, res)
})

userPassedTestRouter.get("/user/:userId", (req, res) => {
    userPassedTestController.getByUserId(req, res)
})

userPassedTestRouter.post("/create", (req, res) => {
    userPassedTestController.create(req, res)
})

userPassedTestRouter.put("/update/:id", (req, res) => {
    userPassedTestController.updateById(req, res)
})

userPassedTestRouter.delete("/:id", (req, res) => {
    userPassedTestController.deleteById(req, res)
})

userPassedTestRouter.delete("/user/:userId", (req, res) => {
    userPassedTestController.deleteByUserId(req, res)
})


module.exports = { userPassedTestRouter }

