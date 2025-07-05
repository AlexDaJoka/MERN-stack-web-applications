const mongoose = require('mongoose');


const postSchema = mongoose.Schema({

postName:{
    type:String,
    require:true
},
place:String,
price:Number,
bedrooms:Number,
bathrooms:Number,
author:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
}

},{
    timestamps:true
})


module.exports = mongoose.model('Post', postSchema);