const messageModel = require("../models/messageModel");

const createMessage = async(req, res) =>{
    const {chatId, senderId, text} = req.body
    const message = new messageModel({
        chatId, senderId, text
    })
    try{
        const response = await message.save()
        res.status(200).json(response);              //yhi toh neeche display hota hai jab nodemon mein api test krte hain
    }catch(error){
        console.log(error);
        res.status(500).json(error);          
    }
};

const getMessages = async(req, res) =>{
    const { chatId } = req.params;

    try{
        const messages = await messageModel.find({chatId})
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = {createMessage, getMessages};