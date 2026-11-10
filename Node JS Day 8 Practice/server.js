import express, { application } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import z from "zod";
import { userModel } from "./utils/db.js";

// Structure for Sign-Up //

const signupBodySchema = z.object({
  email: z.string().min(5).max(20),
  username: z
    .string()
    .min(5)
    .max(10)
    .regex(/^(?!.*\s)(?=.*[A-Z]).*$/),
});

dotenv.config();

// Middleware for Authentication //

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers["token"];

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) {
      res.json({
        msg: "Either the token is invalid or the sign-in details haven't been entered",
      });
    }

    req.userId = payload.userId;

    next();
  } catch (error) {
    res.json({
      msg: "The input cannot be empty , token must be provided",
    });
  }
};

// Using Mongoose Library //

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("The database has been connected succesfully...");
  })
  .catch((err) => {
    console.log("There is an error while connecting to databse: ", err);
  });

const app = express();

app.use(express.json());

// POST request for Signup route //

app.post("/signup", async (req, res) => {
  const result = signupBodySchema.safeParse(req.body);

  if (!result.success) {
    res.json({
      msg: "invalid format of data",
      error: result.error.message,
    });
  }

  const { username, email, password } = req.body;

  const alreadyExistsUser = userModel.find({
    username: username,
  });

  if (alreadyExistsUser !== null) {
    res.json({
      msg: "username already exists...!",
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  const feedback = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  res.json({
    msg: "signup request received...",
    feedback,
  });
});

// POST request for Sign-In route //

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const foundUser = await userModel.findOne({
    username,
  });

  // Password Logic with bcrypt using salt //

  if (foundUser == null) {
    res.json({
      msg: "User not found ...",
    });
  }

  // If the passwords match //

  const passwordMatch = await bcrypt.compare(password, foundUser.password);

  if (!passwordMatch) {
    res.json({
      msg: "Invalid Username or Password",
    });
  }

  // Token Code //

  const token = jwt.sign(
    {
      userId: foundUser._id,
    },
    process.env.JWT_SECRET,
  );

  res.json({
    msg: "signed in successfull...",
    token,
  });
});

// Todo routes //

app.use(authMiddleware);

// GET request for /me route //

app.get("/me", async (req, res) => {
  const user = await userModel.findById(req.userId).select("-password");

  if (user === null) {
    res.status(404).json({
      msg: "user not found",
    });
    return;
  }

  res.json({
    data: user,
  });
});

// GET request for /todo route //

app.get("/todo", async (req, res) => {
  const userId = req.userId;

  const data = await todoModel.find({ userId });

  res.json({
    msg: "Available Todos",
    data,
  });
});

// POST request for /todo route //

app.post("/todo", async (req, res) => {
  const { todo_name, isDone } = req.body;
  let userId = req.userId;

  let feedback = await todoModel.create({ userId, todo_name, isDone });

  res.json({
    msg: "todo added successfully...",
    feedback,
  });
});

// PUT request for /todo route //

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
    msg: "todo updated successfully",
    feedback,
  });
});

// DELETE request for /todo route //

app.delete("/todo/:id", async (req, res) => {
  let userId = req.userId;

  const { id } = req.params;

  const feedback = await todoModel.deleteOne({
    _id: id,
    userId: userId,
  });

  res.json({
    msg: "todo deleted succssfully...",
    feedback,
  });
});

// Port //

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("The Server is listening on Port:", PORT);
});