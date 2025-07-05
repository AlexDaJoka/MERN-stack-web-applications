const Message = require('../modules/Message');
const User = require('../modules/User');
const asyncHandler = require('express-async-handler');


const getMessages = asyncHandler(async (req, res) => {

    const message = await Message.find().lean()

    if(!message?.length){
        return res.status(400).json({message: "messages not found"})
    }

    res.json(message);

})



const getCurrentMessage = asyncHandler(async (req, res) => {

    const id = req.params.id
    const {userID} = req.body

    if(!id){
        return res.status(400).json({message: 'message not found'})
    }

    const message = await Message.findById(id).exec()

    const user = await User.find({id: userID})

    if(user && message){
        res.json(message);
    }else{
        return res.status(400).json({message: 'message not found or user doesnt exist'})
    }

})


const createMessage = asyncHandler(async (req, res) => {

    const id = req.params.id
    const {message} = req.body

    if(!message || !id){
        return res.status(400).json({message: "you dont insert message"})
    }

    const data = {'userID': id, message}

    const createmessage = await Message.create(data);

    if(createmessage){
        return res.status(200).json({message: "Message was created"})
       }else{
        return res.status(400).json({message: "Something went wrong"})
       }


})


const updatedMessage = asyncHandler(async (req, res)=> {

    const id = req.params.id
    const {userID, message} = req.body

    if(!message || !id){
        return res.status(400).json({message: "you dont insert message"})
    }

    const updatedMessage = await Message.findById(id).exec();

    if(!updatedMessage){
        return res.status(400).json({message: "message is not found"})
    }

    updatedMessage.message = message

})


const deleteMessage = asyncHandler(async (req, res) => {

    const id = req.params.id
    const {userID} = req.body

    if(!userID || !id){
        return res.status(400).json({message: "you dont insert field"})
    }

    const message = await Message.findById(id).exec();

    if(!message){
        return res.status(400).json({message: "message is not found"})
    }

    await Message.deleteOne(message);

})


module.exports = {getMessages, getCurrentMessage, createMessage, updatedMessage, deleteMessage}