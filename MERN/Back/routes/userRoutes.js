const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers')


router.route('/')
.get(userControllers.getAllUsers)


router.post('/register', userControllers.createNewUser)

router.post('/login', userControllers.loginUser)

router.patch('/update', userControllers.UpdateUser)

router.delete('/delete', userControllers.DeleteUser)


module.exports = router;