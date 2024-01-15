const { Router } =  require("express");
const UserModule = require("./user/module")
const TestModule = require("./test/module")

const router = Router();

router.use("/user", UserModule.userRouter);
router.use("/test", TestModule.testRouter)
// router.use("/product", productModule.productRouter)
// router.use("/file", fileModule.fileRouter)
// router.use("/user-product", userProductModule.userProductRouter)


module.exports = { router };