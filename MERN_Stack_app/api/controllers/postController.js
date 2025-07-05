const asyncHandler = require('express-async-handler');
const Post = require('../module/Post')
const User = require('../module/User')


const getAllPosts = asyncHandler(async (req, res) => {
    
    const posts = await Post.find().lean()

    if(!posts.length){
        return res.status(400).json({message: "No products founds"})
    }

    res.json(posts)
    
})


const createPosts = asyncHandler(async (req, res) => {

    const id = req.params.id

    const {postName, place, price, bedrooms, bathrooms, author} = req.body

    if(!id || !postName || !place || !price || !bedrooms || !bathrooms){
        return res.status(400).json({message: "All fields are required"})
    }

    const user = await User.findById(id).lean().exec()

    if(!user){
        return res.status(400).json({message:"User not found"})
    }

    const newPost = {postName, place, price, bedrooms, bathrooms, "author": id}

    const posts = await Post.create(newPost);

    if(posts){
        return res.status(200).json({message:"Post are created"})
    }else{
        return res.status(400).json({message:"Something went wrong"})
    }

})

const getIdPosts = asyncHandler(async (req, res) => {
    const id = req.params.id

    if(!id){
        return res.status(400).json({message: "Post dosent found"})
    }

    const posts = await Post.findById(id).lean().exec()


    if(!posts){
        return res.status(400).json({message:"Post not found"})
    }


res.json(posts)

})





const yourPosts = asyncHandler(async (req, res) => {

    const id = req.params.id

    if(!id){
        return res.status(400).json({message: "User not found"})
    }

    const post = await Post.find({author: id}).lean().exec()

    if(!post){
        return res.status(400).json({message:"Post not found"})
    }


    res.json(post)
})



const updatePosts = asyncHandler(async (req, res) => {

    const id = req.params.id

    const {postName, place, price, bedrooms, bathrooms} = req.body

    if(!id || !postName || !place || !price || !bedrooms || !bathrooms){
        return res.status(400).json({message: "All fields are required"})
    }

    const posts = await Post.findById(id).exec()


    posts.postName = postName
    posts.place = place
    posts.price = price
    posts.bedrooms = bedrooms
    posts.bathrooms = bathrooms


    const updatedPosts = await posts.save()

    res.json({message:`Post ${updatedPosts.postName} was abdated`})


})



const deletePost = asyncHandler(async (req, res) => {

    const id = req.params.id

    const posts = await Post.findById(id).exec()
    

    if(!posts){
        return res.status(400).json({message:"Post not found"})
    }

    const deletePost = await posts.deleteOne();

    res.json({message:`Post ${deletePost.postName} was deleted`})

})



module.exports = {getAllPosts, getIdPosts, createPosts, yourPosts, updatePosts, deletePost}