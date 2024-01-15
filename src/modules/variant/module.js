const { Router } = require( "express")
const {VariantController} = require("./controller");
const {VariantService} = require("./service");
const {AuthorizationMiddleware} = require("../../middleware/middlewares");


const authorization = new AuthorizationMiddleware();
const variantRouter = Router()

const variantService = new VariantService()
const variantController = new VariantController(variantService)


variantRouter.get("/:id", (req, res) => {
    variantController.getVariantById(req, res)
})

variantRouter.get("/", (req, res)=>{
    variantController.getAllVariants(req, res)
})

variantRouter.post("/create", (req, res)=>{
    variantController.createVariant(req, res)
})

variantRouter.put("/update/:id", (req, res)=>{
    variantController.updateVariantById(req, res)
})

variantRouter.delete("/delete/:id", (req, res)=>{
    variantController.deleteVariantById(req, res)
})


module.exports = { variantRouter }