const Message = require('../modules/Message')
const User = require('../modules/User')
const asyncHandler = require('express-async-handler')


const getMessage = asyncHandler(async (req, res) => {

    const message = await Message.find().lean()

    if(!message?.length){
        return res.status(400).json({message: "Сообщений нет"})
    }

    res.json(message)

})


const createMessage = asyncHandler(async (req, res) => {

    const id = req.params.id

    const {message} = req.body

    if(!id || !message){
        return res.status(400).json({message: "Что-то пошло не так"})
    }

    const user = await User.findById(id)

    if(!user){
        return res.status(400).json({message: "Такого пользователя нет"}) 
    }

    const data = {"messageAuthor": user.username, message}

    const newMessage = await Message.create(data)

    res.json(newMessage)

})


const editMessage = asyncHandler(async (req, res) => {

    const id = req.params.id

    const {messageAuthor, message} = req.body

    if(!id || !message || !messageAuthor){
        return res.status(400).json({message: "Что-то пошло не так"})
    }

    const Messages = await Message.findById(id).exec()

    const user = await User.findOne({username: messageAuthor}).lean().exec()

    if(!Messages || user ===  null){
        return res.status(400).json({message: "Такого сообщения или пользователя нет"}) 
    }


    Messages.message = message


    await Messages.save()

    res.json({message: 'Сообщение обновилось'})

})


const deleteMessage = asyncHandler(async (req, res) => {

    const id = req.params.id


   if(!id){
    return res.status(400).json({message: "Что-то пошло не так"})
}

    const messages = await Message.findById(id)


    if(!messages){
        return res.status(400).json({message: "Такого сообщения нет"}) 
    }

    await messages.deleteOne()

    res.json({message: "Сообщение удалилось"})
})





module.exports = {getMessage, createMessage, editMessage, deleteMessage}