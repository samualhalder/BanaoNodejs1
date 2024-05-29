import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  likePost,
  updatePost,
} from "../controllers/post.controller.js";
import { isAuth } from "../utils/isAuth.js";

const router = express.Router();
router
  .post("/create", isAuth, createPost)
  .get("/get", isAuth, getPosts)
  .put("/update-post/:userID/:postID", isAuth, updatePost)
  .delete("/delete-post/:userID/:postID", isAuth, deletePost)
  .post("/like/:userID/:postID", isAuth, likePost);

export default router;
