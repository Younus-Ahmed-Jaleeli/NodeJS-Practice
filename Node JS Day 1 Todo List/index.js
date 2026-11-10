import fs from "fs";
import Path from "path";
import { program } from "commander";
import path from "path";

// Program Description //

program

  .name("TodoCLI")
  .description("CLI to add, print, edit, delete your daily todos or tasks")
  .version("1.0.0");

const currentDir = import.meta.dirname;

const filePath = path.join(currentDir, "data", "todos.json");

const data = fs.readFileSync(filePath, "utf8");

const todoArr = JSON.parse(data);

// Print Command //

program

  .command("print")
  .description("This Command is used to print available todos")
  .action(() => {
    todoArr.forEach((element, index) => {
      console.log(`These are your Current Todos ${index + 1} : ${element}`);
    });
  });

// Add Command //

program

  .command("add")
  .description("This command is used to add new todos")
  .argument("<newTodo>", "This argument contains a new todo")
  .action((newTodo) => {
    todoArr.push(newTodo);

    fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf8");
    console.log("Todo Added");
  });

// Edit Command //

program

  .command("edit")
  .description("This Command is used to edit the existing todos")
  .argument("<existingTodo>", "This argument contains the existing todo")
  .argument("<newTodo>", "This argument contains the new todo")
  .action((existingTodo, newTodo) => {
    const indexofOldTodo = todoArr.indexOf(existingTodo);

    todoArr.splice(indexofOldTodo, 1, newTodo);

    fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf8");

    console.log("Todo has been updated :", existingTodo, "➡️  ", newTodo);
  });

// Delete Command //

program

  .command("delete")
  .description("This Command is used to delete existing todos")
  .argument("<existingTodo>", "This argument contains the existing Todo")
  .action((existingTodo) => {
    const indexofOldTodo = todoArr.indexOf(existingTodo);

    todoArr.splice(indexofOldTodo, 1);

    fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf8");

    console.log("Todo has been sucessfully deleted :", existingTodo);
  });

program.parse();
