const express = require('express');
const postCtrl = require('../controllers/postCtrl');
const commentCtrl = require('../controllers/commentCtrl');

const isAdmin = require('../middleware/isAdmin');
const isSignedIn = require('../middleware/isSignedIn');
const isAuthorizedToComment = require('../middleware/isAuthorizedToComment');
const router = express.Router({ mergeParams: true });

router.get('/', postCtrl.getAllPosts);
router.get('/:postId', postCtrl.getSinglePost);

router.use(isSignedIn);

router.post('/:postId/comments', commentCtrl.createComment);
router.put('/:postId/comments/:commentId', isAuthorizedToComment, commentCtrl.updateComment);
router.delete('/:postId/comments/:commentId', isAuthorizedToComment, commentCtrl.deleteComment);


router.use(isAdmin);

router.post('/', postCtrl.createPost);
router.put('/:postId', postCtrl.updatePost);
router.delete('/:postId', postCtrl.deletePost);




module.exports = router