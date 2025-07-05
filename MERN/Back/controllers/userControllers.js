const bcrypt = require('bcrypt');
const User = require('../modules/User');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const createToken = require('../middleware/verifyJWT')




const getAllUsers = asyncHandler(async (req, res) => {
const users = await User.find().select('-password').lean()
if(!users?.length){
    return res.status(400).json({message:"Пользователь не найден"})
}

res.json(users)
})



const createNewUser = asyncHandler(async (req, res) => {

const {username, password, age, email} = req.body

    if(!username || !password || !age || !email){
        return res.status(400).json({maessage:"Все данные должны быть заполнены"})
    }


    const duplicate = await User.findOne({email}).lean().exec();

    if(duplicate){
        return res.status(409).json({message:"Такая почта уже существует"})
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = {username, "password": hashPassword, age, email}

    const user = await User.create(newUser);

    if(user){
        
        return res.status(201).json({message:"Новый пользователь был добавлен"})
    }else{
        return res.status(400).json({message:"Что-то пошло не так"})
    }

})



const loginUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({message: "Все данные должны быть заполнены"})
    }

    const user = await User.findOne({ email }).lean().exec()

    const pass = bcrypt.compareSync(password, user.password);

    if(!user || !pass){
        return res.status(400).json({message: "Почта или пароль заполнены неверно"})
    }

    const token = createToken(user._id)

    console.log(token)

    res.json({message: "Вы авторезированы"})

})





const UpdateUser = asyncHandler(async (req, res) => {
    const {id, username, password, age, email} = req.body

    if(!id, !username || !password || !age || !email){
        return res.status(400).json({maessage:"Все данные должны быть заполнены"})
    }

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({maessage:"Такого пользователя нет"})
    }


    user.username = username
    user.age = age
    user.email = email
    
    if(password){
        user.password = await bcrypt.hash(password, 10)
    }

    const UpdateUser = await user.save()
    res.json({message: `${UpdateUser.username} обновлён`})
})


const DeleteUser = asyncHandler(async (req, res) => {
    const {id} = req.body

    if(!id){
        return res.status(400).json({message:"Пользователь не найден"})
    }

    const user = await User.findById(id).exec();

    if(!user){
        return res.status(400).json({message:"Пользователь не найден"})
    }


    const result = await user.deleteOne();

    res.json({message:`Пользователь ${result.username} был успешно удалён`})

})







module.exports = {getAllUsers, createNewUser, loginUser, UpdateUser, DeleteUser}