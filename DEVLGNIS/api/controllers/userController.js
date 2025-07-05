const User = require('../modules/User');
const Events = require('../modules/Events');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')


// Нахождение всех пользователей
const getUsers = asyncHandler(async (req, res) => {
    
    const user = await User.find().select('-password').lean()

    if(!user?.length){
        return res.status(400).json({message: "Пользователь не найден"})
    }

    res.json(user)

})


const getUserByID = asyncHandler(async (req, res) => {

    const id = req.params.id

    if(!id){
        return res.status(400).json({message: "Пользователь не найден"})
    }

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({message: "Пользователь не существует"})
    }

    res.json(user)

})


// Обновление данных пользователя

const updateUser = asyncHandler(async (req, res) => {

    const id = req.params.id

    const {username, email, age, gender, phone, TG, password} = req.body

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({message: "Такого пользователя нет"})
    }

    const duplicate = await User.findOne({email}).lean().exec()

    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(400).json({message: "Пользователь с такой почтой уже есть"})
    }

    user.username = username
    user.email = email
    user.age = age
    user.gender = gender
    user.phone = phone
    user.TG = TG

    if(password){
        user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save()

    const expire = 1000 * 60 * 60 * 24 * 7


const token = jwt.sign({id: updatedUser._id}, process.env.JWT_SECRET, {expiresIn: expire})

const {password: pass, ...rest} = updatedUser._doc;

res.cookie("access_token", token, {httpOnly: true, secure:true, maxAge:age}).status(200).json(rest)
    
})


const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id

    const user = await User.findById(id).exec()


    if(!user){
        return res.status(400).json({message:"Такого пользователя нет"})
    }

    //Удаление всех событий пользователя при удалении аккаунта
    
    await Events.deleteMany({eventAuthor: id})
    

    res.clearCookie('access_token')
    res.status(200).json({message:"Аккаунт был удалён"})



    const deletedUser = await user.deleteOne()

    res.json({message: `Пользователь ${deletedUser.username} был удалён`})

})


module.exports = {getUsers, getUserByID, updateUser, deleteUser}