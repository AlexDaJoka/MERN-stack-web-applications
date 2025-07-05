const express = require('express')
const router = express.Router();
const messageController = require('../controllers/messageController')

router.get('/', messageController.getMessage)
router.post('/:id', messageController.createMessage)
router.patch('/:id', messageController.editMessage)
router.delete('/:id', messageController.deleteMessage)



module.exports = router;