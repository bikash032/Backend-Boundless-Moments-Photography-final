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
}
const messageSvc = new MessageService()
module.exports = messageSvc