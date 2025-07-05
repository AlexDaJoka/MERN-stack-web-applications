const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const User = require('../modules/User')
const asyncHandler = require('express-async-handler');


const sendMessage = require('../RabbitMQ/SendMessage.js');
const takeMessage = require('../RabbitMQ/TakeMessage.js');

const register = asyncHandler(async (req, res) => {
   const {username, email, age, gender, phone, TG, password} = req.body

   if(!username || !email || !age || !gender || !phone || !TG || !password){
    return res.status(400).json({message: "Все данные должны быть заполнены"})
   }

   const hashedPassword = await bcrypt.hash(password, 10)

   const data = {username, email, age, gender, phone, TG, "password":hashedPassword}

   const user = await User.create(data);

   if(user){
    return res.status(200).json({message: "Пользователь был успешно создан"})
   }else{
    return res.status(400).json({message: "Что-то пошло не так"})
   }

})


const login = asyncHandler(async (req, res, next) => {

const {email, password} = req.body
try{
if(!email || !password){
    return res.status(400).json({message: "Все данные должны быть заполнены"})
}

const ValidUser = await User.findOne({email})

const ValidPass = bcrypt.compareSync(password, ValidUser.password)

if(!ValidPass || !ValidUser){
    return res.status(400).json({message: "Почта или пароль неправильные"})
}

const age = 1000 * 60 * 60 * 24 * 7


const token = jwt.sign({id: ValidUser._id}, process.env.JWT_SECRET, {expiresIn: age});
const {password: pass, ...rest} = ValidUser._doc;

res.cookie("access_token", 'token', {httpOnly: true, maxAge:age}).status(200).json(rest);



//Rabbitmq 
const message = {content: `${ValidUser} is logged in`};
await sendMessage('myQueue', message);


await takeMessage('myQueue');

}catch(error){
    next(error);
}

})

const logout = asyncHandler(async (req, res) => {
    try{
        res.clearCookie('access_token');
        res.status(200).json({message: "Вы вышли из аккаунта"})
    }catch(err){
        console.log(err)
    }
})



module.exports = {register, login, logout}