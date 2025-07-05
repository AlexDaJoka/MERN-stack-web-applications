const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController')


router.get('/', postController.getAllPosts);
router.get('/:id', postController.getIdPosts);
router.post('/:id', postController.createPosts);
router.get('/yourposts/:id', postController.yourPosts);
router.patch('/:id', postController.updatePosts);
router.delete('/:id', postController.deletePost)


module.exports = router