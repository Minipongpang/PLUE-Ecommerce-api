const express = require("express");
const upload = require("../middlewares/upload");
const postController = require("../controllers/createPost-controller");

const postRouter = express.Router();

postRouter.post(
  "/",
  upload.array("productImages", 6),
  postController.createPost
);
module.exports = postRouter;
