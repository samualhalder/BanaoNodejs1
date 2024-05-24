import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./routers/user.router.js";
import PostRouter from "./routers/post.route.js";
import CommentRouter from "./routers/comment.route.js";
dotenv.config();
const app = express();
app.use(express.json());
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Data Base is connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, (req, res) => {
  console.log(`server is connectes at post ${process.env.PORT}`);
});

app.use("/api/user", UserRouter);
app.use("/api/post", PostRouter);
app.use("/api/comment", CommentRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errMessege = err.message || "Interanl server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    errMessege,
  });
});
