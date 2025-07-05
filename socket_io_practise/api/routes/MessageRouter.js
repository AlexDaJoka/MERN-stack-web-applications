const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/', messageController.getMessages);
router.get('/:id', messageController.getCurrentMessage);
router.post('/:id', messageController.createMessage);
router.patch('/:id', messageController.updatedMessage);
router.delete(':/id', messageController.deleteMessage);

module.exports = router;