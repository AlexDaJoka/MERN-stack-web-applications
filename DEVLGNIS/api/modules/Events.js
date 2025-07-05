const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({

    eventName:{
        type:String,
        required:true
    },
    eventTime:{
        type:Date,
        require:true
    },
    eventTipe:{
        type:String,
        require:true,
    },
    eventAgeGroup:Number,
    
    eventFreeOrPay:{
        type:String,
    },
    eventPlace:{
        type:String,
        required:true
    },
    eventDescription:{
        type:String,
        required:true
    },
    eventAuthor:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },
    eventAuthorPhone:{
        type: mongoose.Schema.Types.Number,
        required:true,
        ref: "User"
    },
    eventAuthorEmail:{
        type:mongoose.Schema.Types.String,
        required:true,
        ref: "User"
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Events', eventSchema)