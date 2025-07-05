const mongoose = require('mongoose');


const Dbconnect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_PATH);
    }catch(err){
        console.log(err)
    }
}

module.exports = Dbconnect;