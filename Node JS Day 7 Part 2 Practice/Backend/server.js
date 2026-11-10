import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { todoModel, userModel } from "./utils/db.js";

dotenv.config();

// Auhtentication Middleware //

const authMiddleware = (req, res, next) => {
  const token = req.headers["token"];

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  if (!payload) {
    res.json({
      msg: "The token you have is invalid...",
    });
  }

  req.userId = payload.userId;

  next();
};

// Mongoose //

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Databse has been connected Successfully...");
  })
  .catch((err) => {
    console.log("There is an error when connecting to Database...", err);
  });

const app = express();

app.use(express.json());

// POST request for SignUp Route //

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const feedback = await userModel.create({ username, email, password });
  res.json({
    msg: "Your SignUp request has been received...",
    feedback,
  });
});

// POST request for SignIn Route //

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await userModel.findOne({
    username,
    password,
  });

  if (foundUser == null) {
    res.json({
      msg: "Please enter a valid username or password",
    });
  }

  const token = jwt.sign(
    {
      userId: foundUser._id,
    },
    process.env.JWT_SECRET,
  );

  res.json({
    msg: "You have Signed in Successfully...",
    token,
  });
});

// Todo Routes //

app.use(authMiddleware);

// GET request for todo route //

app.get("/todo", async (req, res) => {
  const userId = req.userId;
  const data = await todoModel.find({ userId });

  res.json({
    msg: "These are the available todos",
    data,
  });
});

// POST request for todo route //

app.post("/todo", async (req, res) => {
  const { todo_name, isDone } = req.body;
  let userId = req.userId;

  let feedback = await todoModel.create({ userId, todo_name, isDone });

  res.json({
    msg: "Todo has been added Succesfully...",
    feedback,
  });
});

// PUT request for todo route //

app.put("/todo", async (req, res) => {
  const { old_todo_name, new_todo_name, old_isDone, new_isDone } = req.body;

  const userId = req.userId;

  const feedback = await todoModel.findOneAndUpdate(
    { userId: userId, todo_name: old_todo_name, isDone: old_isDone },
    {
      userId: userId,
      todo_name: new_todo_name,
      isDone: new_isDone,
    },
  );

  res.json({
    msg: "todo has been updated successfully",
    feedback,
  });
});

// DELETE request for todo route //

app.delete("/todo/:id", async (req, res) => {
  let userId = req.userId;

  const { id } = req.params;

  const feedback = await todoModel.deleteOne({
    _id: id,
    userId: userId,
  });

  res.json({
    msg: "todo has been deleted succssfully...",
    feedback,
  });
});

// Server on Port//

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("The Server is listening on PORT:", PORT);
});
