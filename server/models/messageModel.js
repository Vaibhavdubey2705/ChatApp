const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        chatId: String,        //to get all the messages for a certain chat        
        senderId: String,      //to get who sent the message and who received 
        text: String
    },
    {
        timestamps: true
    }
)

const messageModel = mongoose.model("Message", messageSchema)

module.exports = messageModel;