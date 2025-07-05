const mongoose = require('mongoose');


const DBconnection = async () => {

    try{
        mongoose.connect(process.env.DB)
    }catch(error){
        console.log(error);
    }

}

module.exports = DBconnection;