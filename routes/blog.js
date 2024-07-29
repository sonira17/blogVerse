const express=require('express');
const router=express.Router();

const {dummy}=require('../controller/dummy');
const {createComment}=require('../controller/commentController');
const {createPost}=require('../controller/postController');
const {updatePost}=require('../controller/updatePost');
const { likePost, unlikePost } = require('../controller/likeController');
router.post('/comment/create',createComment);
router.post('/create/post',createPost);
router.get('/dummy',dummy);
router.post('/update/post',updatePost);
router.post('/like', likePost);
router.post('/unlike', unlikePost);

module.exports=router;