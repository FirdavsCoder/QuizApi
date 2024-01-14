const express = require( "express")
const cors = require( "cors")
const modules = require( "./modules/app.module.js")
const config = require( "./config/config")
// const { FileService } = require( "./modules/file/file.service.js")


const app = express()
// const server = http.createServer(app)
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use("/api", modules.router);
//
// const fileService = new FileService()
// app.post("/file-upload", (req, res, next) => {
//     console.log(req.file);
//     fileService.create(req.file)
// })



app.listen(config.port, () => {
    console.log(`https://localhost:${config.port}`)
})

