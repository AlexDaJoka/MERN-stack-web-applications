const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const productSchema = new mongoose.Schema({
    
    productName:{
        type:String,
        required:true,
    },
    productPrice:{
        type:Number,
        required:true,
        max:100000,
        min:1
    },
    productDescription:{
        type:String,
        required:true,
    },

    deliver: Boolean,

    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
},{
    timestamps: true
})

productSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
})


module.exports = mongoose.model('Products', productSchema);