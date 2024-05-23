import { errorHandler } from "../utils/error.js";
import EmailValidator from "email-validator";
import User from "../models/user.model.js";
import bycript from "bcryptjs";
import randomstring from "randomstring";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const mailSender = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: email, // list of receivers
      subject: "Reset password ", // Subject line
      html: `<p>Hello ${name} pls click this <a href="http://localhost:8080/api/user/reset-password?token=${token}">link<a/> to reset password`, // html body
    });
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !password ||
    !email ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(401, "Pls enter all the fields."));
  }
  if (password.length < 6) {
    return next(
      errorHandler(401, "pls enter a password with more than 5 charecters.")
    );
  }
  if (EmailValidator.validate(email) === false) {
    return next(errorHandler(401, "pls enter a valid email"));
  }
  const hashedPassword = bycript.hashSync(password, 10);
  const user = new User({
    email,
    username,
    password: hashedPassword,
  });
  user
    .save()
    .then(() => res.status(200).json("User Sign Up complited"))
    .catch((error) => {
      res.json(400).json(error);
    });
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(401, "pls enter all the fields."));
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json("user does not exists.");
  } else {
    bycript.compare(password, user.password).then((response) => {
      if (!response) {
        res.status(401).json("wrong credentials");
      } else {
        const token = jwt.sign({id: user._id }, process.env.SECRET_KEY);

        const { password, ...rest } = user._doc;
        console.log(rest);
        res
          .status(200)
          .cookie("acesses_token", token, {
            httpOnly: true,
          })
          .json(rest);
      }
    });
  }
};

export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email || email === "") {
    return next(errorHandler(401, "Pls enter a email address"));
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json("no such user");
    } else {
      const token = randomstring.generate();
      const data = await User.updateOne(
        { email },
        { $set: { token } },
        { new: true }
      );
      mailSender(data.name, email, token);
      res.status(200).json("reset password link has been sent to you email.");
    }
  } catch (error) {
    return next(errorHandler(400, error));
  }
};

export const resetPassword = async (req, res, next) => {
  const { password } = req.body;
  const token = req.query.token;
  if (!password || password === "") {
    return next(errorHandler(400, "pls enter your new password"));
  }
  try {
    const user = await User.findOne({ token });
    console.log(user);
    if (!user) {
      res.status(401).json("this link have expired!");
    } else {
      const newPassword = bycript.hashSync(password, 10);
      const data = await User.updateOne(
        { _id: user._id },
        { $set: { password: newPassword, token: "" } },
        { new: true }
      );
      res.status(200).json(data);
    }
  } catch (error) {
    return next(errorHandler(400, error.errMessage));
  }
};
