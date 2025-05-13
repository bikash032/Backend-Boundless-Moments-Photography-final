const MessageModel = require("./clientmessage")

class MessageService {
    storeMessage = async (data) => {
        try {
            const message = await MessageModel.create(data)
            console.log("message", message);
            if (!message) {
                throw {
                    code: 400,
                    message: "Message is not created",
                    status: "MESSAGE_NOT_CREATED"
                }
            }

            return message
        } catch (exception) {
            throw exception
        }
    }
    getAllData=async (query, filter) => {
        try {
            const page = query.page ? parseInt(query.page) : 1
            const limit = query.limit ? parseInt(query.limit) : 10
            const offset = (page - 1) * limit

            const { count, rows } = await MessageModel.findAndCountAll({
                where: filter,
                limit: limit,
                offset: offset,
                order: [["createdAt", "DESC"]],
            })

            return {
                data: rows,
                pagination: {
                    totalItems: count,
                    totalPages: Math.ceil(count / limit),
                    currentPage: page,
                    limit: limit,
                },
            }
        } catch (exception) {
            throw exception
        }
    }
    deleteMessage = async (id) => {
        try {
            const message = await MessageModel.destroy({
                where: {
                    id: id
                }
            })
            if (!message) {
                throw {
                    code: 400,
                    message: "Message is not deleted",
                    status: "MESSAGE_NOT_DELETED"
                }
            }
            return message
        } catch (exception) {
            throw exception
        }
    }
    latestMessage=async(since)=>{
        try {
            const result = await MessageModel.findAll({
                where: {
                    createdAt: {
                        [require('sequelize').Op.gt]: since
                    }
                },
                order: [["createdAt", "ASC"]]
            });
            console.log("latest message for the users",result);
            
            return result;
        } catch (exception) {
            throw exception
        }
    }
}
const messageSvc = new MessageService()
module.exports = messageSvc