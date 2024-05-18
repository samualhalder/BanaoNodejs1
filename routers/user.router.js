import express from "express";
import {
  forgetPassword,
  resetPassword,
  signIn,
  signUp,
} from "../controllers/user.controller.js";
const router = express.Router();

router
  .post("/signup", signUp)
  .post("/signin", signIn)
  .post("/forget-password", forgetPassword)
  .post("/reset-password", resetPassword);

export default router;
