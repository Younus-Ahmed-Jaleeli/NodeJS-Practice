import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import { TodoModel, userModel } from "./utils/db.js";
dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.headers["token"];

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  if (!payload) {
    res.json({
      msg: "Inavlid Toekn...!",
    });
  }

  req.userId = payload.userId;
  next();
};

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database Connected Successfully...");
  })
  .catch((err) => {
    console.log("Error While Connecting Database: ", err);
  });

const app = express();

app.use(express.json());

// Sign-Up Route --- Post Request //

app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  const feedback = await userModel.create({ username, password, email });

  res.json({
    msg: "User has been registered successfully in Database",
    feedback,
  });
});

// Sign-In Route --- Post Request //

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const founduser = await userModel.findOne({
    username: username,
    password: password,
  });

  if (founduser == null) {
    res.json({
      msg: "Enter a Valid Username or Password",
    });
  }

  const token = jwt.sign(
    {
      userId: founduser._id,
    },
    process.env.JWT_SECRET,
  );

  res.json({
    msg: "Login has been Successfull...",
    token,
  });
});

// Todo Routes //

app.use(authMiddleware);

// GET request for Todo Route //

app.get("/todo", async (req, res) => {
  const userId = req.userId;

  const data = await TodoModel.find({
    userId,
  });

  res.json({
    msg: "todo fetched successfully",
    data,
  });
});

// POST request for Todo Route //

app.post("/todo", async (req, res) => {
  const { todo_name, isDone } = req.body;
  let userId = req.userId;

  let feedback = await TodoModel.create({ userId, todo_name, isDone });

  res.json({
    msg: "todo added successfully...",
    feedback,
  });
});

app.listen("8080", () => {
  console.log("The Server is listening on Port : 8080");
});
