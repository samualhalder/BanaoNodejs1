import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, require: true },
    userID: { type: String, require: true },
    content: { type: String, require: true },
    like: { type: Number, default: 0 },
    likes: { type: Array, default: [] },
    photoURL: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaL-b4CbZ3ldmfjDrdN-Xm4EaBxzWi3OXhCA&s",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
