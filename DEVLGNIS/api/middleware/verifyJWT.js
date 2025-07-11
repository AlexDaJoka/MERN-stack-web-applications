const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization


    if(!authHeader?.startsWith('WOW ')){
        return res.status(401).json({message:"Не зарегестрирован"})
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.status(401).json({message: "Forbidden"})
            req.user = decoded.UserInfo.username
        next()
        }

    )
}

module.exports = verifyJWT;