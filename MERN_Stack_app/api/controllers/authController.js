const asyncHandler = require('express-async-handler')
const User = require('../module/User')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken');

const register = asyncHandler(async (req, res) => {
const {username, email, password} = req.body

if(!username || !email || !password){
    return res.status(400).json({message:"All fields are required"})
}

const hashedPassword = await bcrypt.hash(password, 10)

const data = {username, email, "password": hashedPassword}

const user = await User.create(data);

if(user){   
    return res.status(201).json({message:"New username was added"})
}else{
    return res.status(400).json({message:"Something went wrong"})
}



})


const login = asyncHandler(async (req, res) => {
    
    const {username, password} = req.body

    if(!username || !password){
        return res.status(400).json({message:"All fields are required"})
    }

    const validUser = await User.findOne({username})

    const pass = bcrypt.compareSync(password, validUser.password)


    if(!validUser || !pass){
        return res.status(400).json({message: "Username or password are not valid"})
    }



    const age = 1000 * 60 * 60 * 24 * 7;


    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);

    const {password: Validpass, ...rest} = validUser._doc;

    res.cookie("access_token", token,{httpOnly:true, secure:true, path: "/", sameSite: "strict",}).status(200).json(rest)


})


const logout = asyncHandler(async (req, res) => {
    try{
        res.clearCookie('access_token');
        res.status(200).json({message:"You are log out"})
    }catch(error){
        console.log(error)
    }


})


module.exports = {register, login, logout}