const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({

messageAuthor:{
    type:mongoose.Schema.Types.String,
    required:true,
    ref: "User"
},

message:String


}, {
    timestamps: true
})


module.exports = mongoose.model('Message', messageSchema)