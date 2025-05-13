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
getAllMessage=async(req, res, next)=>{
    try {
        let filter = {};
        if (req.query.search) {
            filter = {
                name: {
                    [Op.iLike]: `%${req.query.search}%`,
                },
            };
        }
        let { data, pagination } = await messageSvc.getAllData(req.query, filter);
        let latestMessage=await messageSvc.latestMessage();
        res.json({
            data: data,
            message: "List all data",
            status: "OK",
            options: pagination,
        });
    } catch (exception) {
        next(exception)
    }
}
deleteMessage=async(req,res,next)=>{
    try {
        let  id  = req.params.id
        let message = await messageSvc.deleteMessage(id)
        res.json({
            data: message,
            message: "Message is deleted successfully",
            status: "MESSAGE_DELETED",
            options: null
        })
    } catch (exception) {
        next(exception)
    }
};
latestMessage=async(req, res, next)=>{
    try {
        const result=await messageSvc.latestMessage()
    } catch (exception) {
        next(exception)
    }
}
}
const messageCtrl=new MessageController()
module.exports=messageCtrl