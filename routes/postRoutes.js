const express = require('express');
const postController = require('../controllers/postController');
const postRouter = express.Router();

postRouter.param('id', postController.checkID);

postRouter
    .route('/')
    .get(postController.getAllPosts)
    .post(postController.createPost);

postRouter
    .route('/:id')
    .get(postController.getPost)
    .patch(postController.updatePost)
    .delete(postController.deletePost);

module.exports = postRouter;