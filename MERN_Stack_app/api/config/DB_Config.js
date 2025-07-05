const mongoose = require('mongoose');

const DBconnect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
    }catch(error){
        console.log(error);
    }

}


module.exports = DBconnect;