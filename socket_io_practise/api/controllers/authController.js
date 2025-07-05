const bcrypt = require('bcrypt');
const User = require('../modules/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');


const register = asyncHandler(async (req, res) => {

    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({message: "All fields are required"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {username, email, "password":hashedPassword};

    const user = await User.create(data);

    if(user){
        return res.status(200).json({message: "User was created"})
       }else{
        return res.status(400).json({message: "Something went wrong"})
       }

})


const login = asyncHandler(async (req, res) => {

    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({message: "Все данные должны быть заполнены"})
    }

    const ValidUser = await User.findOne({email});
    const ValidPass = bcrypt.compareSync(password, ValidUser.password);

    if(!ValidPass || !ValidUser){
        return res.status(400).json({message: "Email or password are incorrect"})
    }

    const age = 1000 * 60 * 60 * 24 * 7

    const token = jwt.sign({_id: ValidUser}, process.env.TOKEN_SECRET, {expiresIn: age});
    const {password: pass, ...rest} = ValidUser._doc;
    res.cookie("access_token", token, {httpOnly: true, maxAge:age}).status(200).json(rest)

})


const logout = asyncHandler(async (req, res) => {
    try{
        res.clearCookie('access_token');
        res.status(200).json("user has been logged out");
    }catch(err){
        console.log(err);
    }
})


module.exports = {register, login, logout}