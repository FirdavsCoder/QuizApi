const { Router } = require( "express")
const {TestController} = require("./controller");
const {TestService} = require("./service");
const {AuthorizationMiddleware} = require("../../middleware/middlewares");


const authorization = new AuthorizationMiddleware();
const testRouter = Router()

const testService = new TestService()
const testController = new TestController(testService)


testRouter.get("/:id", (req, res) => {
    testController.getTestByIdd(req, res)
})

testRouter.get("/", (req, res)=>{
    testController.getAllTests(req, res)
})

testRouter.post("/create", (req, res)=>{
    testController.create_test(req, res)
})

testRouter.put("/update/:id", (req, res)=>{
    testController.updateTestById(req, res)
})

testRouter.delete("/:id", (req, res)=>{
    testController.deleteTestById(req, res)
})


module.exports = { testRouter }

