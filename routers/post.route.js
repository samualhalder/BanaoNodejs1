import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();
router
  .post("/create", createPost)
  .get("/get", getPosts)
  .put("/update-post/:userID/:postID", updatePost)
  .delete('/delete-post/:userID/:postID',deletePost)

export default router;
