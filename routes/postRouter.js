const express = require('express');
const postCtrl = require('../controllers/postCtrl');
const { isAdmin } = require('../middleware/isAdmin');
const isSignedIn = require('../middleware/isSignedIn');
const router = express.Router({ mergeParams: true });

router.get('/', postCtrl.getAllPosts);
router.get('/postId', postCtrl.getSinglePost);
router.post('/', isSignedIn, isAdmin, postCtrl.createPost);
router.put('/postId', isSignedIn, isAdmin, postCtrl.updatePost);
router.delete('/postId', isSignedIn, isAdmin, postCtrl.deletePost);


module.exports = router