import express from "express";

const app = express();

app.use(express.json());

const todoArr = ["Go to College","Go to TDC","Go to Market"];

// GET Handler 

app.get("/todo", (req,res) => {

    console.log("GET request recieved on /todo route...");

    // RESPONSE //
   
    res.json( {
        todos: todoArr,
    });
});

// POST Handler

app.post("/todo", (req,res) => {
   
    console.log("POST request recieved on /todo route...");

    // console.log(req.body);

    let newTodo = req.body.newTodo;
    todoArr.push(newTodo);
   
    res.json( {
        "msg": "New Todo Added Successfully...",
    });
});

// PUT handler

app.put("/todo", (req,res) => {
   
    let old_todo = req.body.old_todo;
    let new_todo = req.body.new_Todo;

    const targetelemind = todoArr.indexOf(old_todo);
    todoArr.splice(targetelemind,1,new_todo);
   
    res.json( {
        msg: "Todo updated succesfully...",
    });
});

// DELETE Handler

app.delete("/todo", (req,res) => {
    
    let target_todo = req.body.target_todo;
    const targetelemind = todoArr.indexOf(target_todo);
    todoArr.splice(targetelemind,1);
    
    res.json( {
        msg: "Todo deleted successfully..."
    });
});

app.listen(8080, () => {
    console.log("Server is listening on Port 8080");
});