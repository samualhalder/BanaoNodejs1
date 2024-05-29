import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";
export const isAuth = async (req, res, next) => {
  console.log(req.cookies);
  const token = req.headers.cookies;
  console.log(req.header);
  if (!token) {
    return next(errorHandler(401, "no such user"));
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return next(errorHandler(401, "no such user"));
    }
    req.user = user;
    next();
  });
};
