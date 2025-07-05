const mongoose = require('mongoose');


const DBconnection = async () => {

    try{
        mongoose.connect(process.env.DATABASE_URL)
    }catch(error){
        console.log(error)
    }

}

module.exports = DBconnection;