const Product = require('../modules/Product')
const asyncHandler = require('express-async-handler');



const getAllProducts = asyncHandler(async (req, res) => {

    const products = await Product.find().select('-ticket').lean()

    if(!products.length){
        return res.status(400).json({message:"Продукт не найден"})
    }

    res.json(products)

})


const createNewProduct = asyncHandler(async (req, res) => {

    const {productName, productPrice, productDescription, deliver, author} = req.body

    if(!productName || !productPrice || !productDescription || typeof deliver !== "boolean" || !author){
        return res.status(400).json({message:"Все данные должны быть заполнены"})
    }

    const newProduct = {productName, productPrice, productDescription, deliver, author}

    const product = await Product.create(newProduct);

    if(product){
        return res.status(201).json({message:"Прдукт был успешно создан"})
    }else{
        return res.status(400).json({message:"При создании продукта что-то пошло не так"})
    }


})

const updareProducts = asyncHandler(async (req, res) => {
    const {id, productName, productPrice, productDescription, deliver, author} = req.body


    if(!id || !productName || !productPrice || !productDescription || typeof deliver != "boolean" || !author){
        return res.status(400).json({message:"Все данные должны быть заполнены"})
    }

    const product = await Product.findById(id).exec();

    if(!product){
        return res.status(400).json({message: "Таких продуктов нет"})
    }

    product.productName = productName
    product.productPrice = productPrice
    product.productDescription = productDescription
    product.deliver = deliver

    const UpdatedProduct = await product.save()

    res.json({message:`Прдукт ${UpdatedProduct.productName} был обновлён`})
})

const DeleteProduct = asyncHandler(async (req, res) =>{
    const {id} = req.body
    
    if(!id){
        return res.status(400).json({message:"Все данные должны быть заполнены"})
    }

    const product = await Product.findById(id).exec()

    if(!product){
        return res.status(400).json({message:"Такого продукта не существует"})
    }

    const deletProduct = await Product.deleteOne()

    res.json({messgae:`Продукт ${deletProduct.productName} был удалён`})

    
})




module.exports = {getAllProducts, createNewProduct, updareProducts, DeleteProduct}