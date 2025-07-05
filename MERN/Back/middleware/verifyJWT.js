const jwt = require('jsonwebtoken')


const createToken = (_id) => {

   return jwt.sign({_id}, 'fghjkgfhjkjhgfgjkljhgfghjkljhghfghjk', {expiresIn: '1d'})

}

module.exports = createToken;