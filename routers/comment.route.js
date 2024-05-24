import express from "express";
import {
  addComment,
  deleteComment,
} from "../controllers/comment.controller.js";
const router = express.Router();

router
  .post("/add-comment", addComment)
  .delete("/delete-comment/:userID/:commentID", deleteComment);
export default router;
