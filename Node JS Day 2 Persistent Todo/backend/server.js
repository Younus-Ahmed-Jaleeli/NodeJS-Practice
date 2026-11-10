import express from "express";
import fs from "fs";
import path from "path";

const filePath = path.join(import.meta.dirname, "data", "todo.json");
const app = express();

app.use(express.json());

const data = fs.readFileSync(filePath, "utf8");
const todoArr = JSON.parse(data);

// ----------------------- /todo route ------------------------

// GET handler //

app.get("/todo", (req, res) => {
  console.log("Get Request Recieved on /todo route...");

  res.json({
    todos: todoArr,
  });
});

// POST handler //

app.post("/todo", (req, res) => {
  console.log("POST request recieved on /todo route...");

  let newTodo = req.body.newTodo;

  todoArr.push(newTodo);

  fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf8");

  res.json({
    msg: "New Todo Added Successfully",
  });
});

// PUT handler //

app.put("/todo", (req, res) => {
  const { old_todo, new_todo } = req.body;

  const targetElementIndex = todoArr.indexOf(old_todo);

  todoArr.splice(targetElementIndex, 1, new_todo);

  fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf8");

  res.json({
    msg: "Todo updated successfully...",
  });
});

// DELETE handler //]

app.delete("/todo", (req, res) => {
  const { target_todo } = req.body;

  const targetElementIndex = todoArr.indexOf(target_todo);

  todoArr.splice(targetElementIndex, 1);

  fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf8");

  res.json({
    msg: "Todo Deleted Successfully",
  });
});

app.listen("8080", () => {
  console.log("Server is listening on PORT: 8080");
});
