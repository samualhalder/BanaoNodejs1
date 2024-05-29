import express from "express";
import {
  addComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { isAuth } from "../utils/isAuth.js";
const router = express.Router();

router
  .post("/add-comment", isAuth, addComment)
  .delete("/delete-comment/:userID/:commentID", isAuth, deleteComment);
export default router;
