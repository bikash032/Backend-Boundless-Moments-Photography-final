const { bodyValidator } = require("../../middleware/request.validator")
const { uploader } = require("../../middleware/uploader.moddleware")
const messageCtrl = require("./message.controller")
const messageCreateDTO = require("./message.validator")

const messageRouter=require("express").Router()

messageRouter.post("/create",uploader().none(), messageCtrl.create)
messageRouter.get("/list",messageCtrl.getAllMessage)
messageRouter.delete("/delete/:id",messageCtrl.deleteMessage)
module.exports=messageRouter