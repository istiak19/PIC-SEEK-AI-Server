const express = require("express");
const { postUserComment } = require("../controllers/comment.controller");
const commentRouter = express.Router();

commentRouter.post('/create-comment',postUserComment)

module.exports = commentRouter;