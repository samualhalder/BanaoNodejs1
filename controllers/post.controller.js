import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async (req, res, next) => {
  const { userID, title, content, photoURL } = req.body;
  if (!userID || !title || !content) {
    return next(errorHandler(404, "Please eneter all the fields."));
  }
  try {
    const newPost = new Post({
      title,
      userID,
      content,
      photoURL,
    });
    const response = await newPost.save();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const response = await Post.find();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  const { userID, postID } = req.params;
  try {
    const post = await Post.findById({ _id: postID });
    console.log(post);
    if (post.userID !== userID) {
      return next(errorHandler(401, "you are not allowed to update."));
    }
    const response = await Post.findByIdAndUpdate(
      postID,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          photoURL: req.body.photoURL,
        },
      },
      { new: true }
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const { userID, postID } = req.params;
  try {
    const post = await Post.findById({ _id: postID });
    console.log(post);
    if (post.userID !== userID) {
      return next(errorHandler(401, "you are not allowed to delete."));
    }
    const response = await Post.findByIdAndDelete(postID);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
