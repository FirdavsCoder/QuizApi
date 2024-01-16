const { Router } =  require("express");
const UserModule = require("./user/module")
const TestModule = require("./test/module")
const QuestionModule = require("./question/module")
const VariantModule = require("./variant/module")
const UserPassedTestModule = require("./User-Passed-Tests/module")

const router = Router();

router.use("/user", UserModule.userRouter);
router.use("/test", TestModule.testRouter);
router.use("/question", QuestionModule.questionRouter);
router.use("/variant", VariantModule.variantRouter)
router.use("/user-passed-test", UserPassedTestModule.userPassedTestRouter)
// router.use("/file", fileModule.fileRouter)



module.exports = { router };