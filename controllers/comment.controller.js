import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";
export const addComment = async (req, res, next) => {
  const { userID, postID, content } = req.body;
  try {
    const newComment = new Comment({
      userID,
      postID,
      content,
    });
    newComment
      .save()
      .then((response) => res.status(200).json(response))
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const { userID, commentID } = req.params;
  try {
    const comment = await Comment.findById(commentID);
    console.log(comment);
    if (comment.userID !== userID) {
      return next(
        errorHandler(401, "you are not allowed to delete this comment")
      );
    }
    const response = await Comment.findByIdAndDelete(commentID, { new: true });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
