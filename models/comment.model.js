import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    postID: { type: String, require: true },
    userID: { type: String, require: true },
    content: { type: String, require: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
