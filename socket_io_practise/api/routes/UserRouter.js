const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//const validUser = require('../config/verifyUser');

router.get('/' ,userController.getUsers)
router.get('/:id', userController.getUserByID)
router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router;