const express = require("express");
const { postUserComment, getUserComment, getSingleUserComment } = require("../controllers/comment.controller");
const commentRouter = express.Router();

commentRouter.get('/get-comment', getUserComment)
commentRouter.get('/get-comment/:id', getSingleUserComment)
commentRouter.post('/create-comment', postUserComment)

module.exports = commentRouter;