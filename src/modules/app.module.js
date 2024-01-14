const { Router } =  require("express");
const UserModule = require("./user/module")

const router = Router();

router.use("/user", UserModule.userRouter);
// router.use("/product", productModule.productRouter)
// router.use("/file", fileModule.fileRouter)
// router.use("/user-product", userProductModule.userProductRouter)


module.exports = { router };