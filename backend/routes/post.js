const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const postsCtrl = require('../controllers/post');
// const multer = require("multer");
// const upload = multer();

router.get('/', postsCtrl.readPost);
router.post('/images',  multer, postsCtrl.createPost);
router.put('/:id', postsCtrl.updatePost);
router.delete('/:id', postsCtrl.deletePost);
router.patch('/like/:id', postsCtrl.likePost);
router.patch('/dislike/:id', postsCtrl.disLikePost)

router.patch('/comment-post/:id', postsCtrl.commentPost);
router.patch('/edit-comment-post/:id', postsCtrl.editCommentPost);
router.patch('/delete-comment-post/:id', postsCtrl.deleteCommentPost)

module.exports = router;