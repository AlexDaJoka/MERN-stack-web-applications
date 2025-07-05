const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
//const verifyToken = require('../config/verifyUser')

router.get('/', userController.getUsers)
router.get('/:id', userController.getUserID)
router.patch('/:id', userController.update)
router.delete('/:id', userController.deleteUser)


module.exports = router