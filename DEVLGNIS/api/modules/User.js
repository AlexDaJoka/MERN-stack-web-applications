const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    username:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    age:Number,
    gender:String,
    phone:String,
    about:String,
    TG:String,
    password:{
        type:String,
        required:true
    }
},{
    timestamps: true
})


module.exports = mongoose.model("User", userSchema);