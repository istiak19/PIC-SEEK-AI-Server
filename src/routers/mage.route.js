const express = require("express");
const { insertAiImage, getAiImage, getSingleImage } = require("../controllers/image.controller");
const imageRouter = express.Router();
imageRouter.post("/create", insertAiImage);
imageRouter.get("/all", getAiImage);
imageRouter.get("/all/:id", getSingleImage);

module.exports = imageRouter;