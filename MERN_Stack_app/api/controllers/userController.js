const asyncHandler = require('express-async-handler');
const User = require('../module/User');
const Post = require('../module/Post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = asyncHandler(async (req, res) => {

const user = await User.find().select('-password').lean()

if(!user?.length){
    return res.status(400).json({message: "User not found"})
}


res.json(user)
})

const getUserID = asyncHandler(async (req, res) => {

    try{
        const user = await User.findById(req.params.id);
    
        if(!user) return next(errorHandler(404, 'User not found'));
      
        const {password: pass, ...rest} = user._doc;
    
        res.status(200).json(rest);
      }catch(error){
        next(error);
      }

})



const update = asyncHandler(async (req, res) => {

  const id = req.params.id
  
  const {username, email, password} = req.body

  if(!id || !username || !email || !password){
      return res.status(400).json({message: "All fields are required"})
  }

  const user =  await User.findById(id).exec()

  if(!user){
      return res.status(400).json({message: "That user is not exist"})
  }

  user.username = username
  user.email = email

  if(password){
      user.password = await bcrypt.hash(password, 10)
  }

  const UpdateUser = await user.save();

  
  const age = 1000 * 60 * 60 * 24 * 7;


  const token = jwt.sign({id: UpdateUser._id}, process.env.JWT_SECRET, {expiresIn: age});

  const {password: Validpass, ...rest} = UpdateUser._doc;

  res.cookie("access_token", token, {httpOnly:true, secure:true, maxAge: age}).status(200).json(rest)

})


const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id

  const user = await User.findById(id).exec()

  //const posts = await Post.find({author: id}).exec()

  if(!id){
    return res.status(400).json({message: "User not found"})
  }


    res.clearCookie('access_token');
    res.status(200).json({message:"Your account is deleted"})

    const result = await user.deleteOne();

    await Post.deleteMany({author: id});


    res.json({message:`Пользователь ${result.username} был успешно удалён`})

})


module.exports = {getUsers, getUserID, update, deleteUser}