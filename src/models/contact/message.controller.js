const messageSvc = require("./message.service")
class MessageController{
create=async(req,res,next)=>{
    try {
        const data=req.body
        console.log("dasdasfadfadsf",data);
        
            const message=await messageSvc.storeMessage(data)
            // console.log("datadfasfadscdsagadsgsdf",message);
            res.json({
                data:message,
                message:"Message is created successfully",
                status:"MESSAGE_CREATED",
                options:null
            })
            
    } catch (exception) {
        next(exception)
    }
}
}
const messageCtrl=new MessageController()
module.exports=messageCtrl