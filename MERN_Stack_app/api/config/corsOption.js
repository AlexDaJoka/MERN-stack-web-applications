const allowedOrigin = require('./allowedCors')

const corsOption = {
    origin:(origin, callback) => {
        if(allowedOrigin.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error('Not allowe by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOption