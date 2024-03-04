import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createComment } from '../controllers/comment.controller.js';
import {
    createComment,
    getPostComments,likeComment,editComment
  } from '../controllers/comment.controller.js';

const router = express.Router();


router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);


export default router;