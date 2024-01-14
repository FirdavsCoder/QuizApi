const { Router } = require( "express")
const {TestController} = require("./controller");
const {TestService} = require("./service");
const {AuthorizationMiddleware} = require("../../middleware/middlewares");


const authorization = new AuthorizationMiddleware();
const testRouter = Router()

const testService = new TestService()
const testController = new TestController(testService)

