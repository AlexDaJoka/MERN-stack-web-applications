const allowedOrigin = require('./allowedOrigin')


const corsOption = {
    origin: (origin, callback) => {
        if(allowedOrigin.indexOf(origin) !== -1 || !origin){
            callback(null)
        }else{
            callback(new Error('Подключение не разрешенно CORS!'))
        }
    },
    credential: true,
    optionsSuccessStatus: 200
}

module.exports = corsOption