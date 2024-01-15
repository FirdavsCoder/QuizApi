const {Router} = require("express");
const {QuestionController} = require("./controller");
const {QuestionService} = require("./service");
const {AuthorizationMiddleware} = require("../../middleware/middlewares");


const authorization = new AuthorizationMiddleware()
const questionRouter = Router()
const questionService = new QuestionService()
const questionController = new QuestionController(questionService)


questionRouter.get("/:id", (req, res) =>{
    questionController.getQuestionById(req, res)
})

questionRouter.get("/", (req, res)=>{
    questionController.getAllQuestions(req, res)
})

questionRouter.post("/create", (req, res) => {
    questionController.createQuestion(req, res)
})

questionRouter.put("/update/:id", (req, res) => {
    questionController.updateQuestionById(req, res)
})

questionRouter.delete("/:id", (req, res) => {
    questionController.deleteQuestionById(req, res)
})

module.exports = {questionRouter}