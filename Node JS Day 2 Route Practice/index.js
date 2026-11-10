import express  from "express";

const app = express();

// --------------------- /restaurant route --------------------

// GET Handler 

app.get("/restaurant" , (req,response) => {
    console.log("GET request recieved on /restaurant route");
    response.send("Got your GET request...");
});

// POST Handler

app.post("/restaurant" , (req,response) => {
    console.log("POST request recieved on /restaurant route");
    response.send("Got your POST request...");
});

// PUT Handler

app.put("/restaurant" ,(req,response) => {
    console.log("PUT request recieved on /restaurant route");
    response.send("Got your PUT request...")
});

// Delete Handler 

app.delete("/restaurant", (req,response) => {
    console.log("DELETE request recieved on /restaurant route");
    response.send("Got your DELETE request...");
});

app.listen(8080, () => {
    console.log("Server is running on PORT 8080");
});


// -------------------------- /me route -------------------------

// GET Handler 

app.get("/me" , (req,response) => {
    console.log("GET request recieved on /me route");
    response.send("Got your GET request...");
});

// POST Handler

app.post("/me" , (req,response) => {
    console.log("POST request recieved on /me route");
    response.send("Got your POST request...");
});

// PUT Handler

app.put("/me" ,(req,response) => {
    console.log("PUT request recieved on /me route");
    response.send("Got your PUT request...")
});

// Delete Handler 

app.delete("/me", (req,response) => {
    console.log("DELETE request recieved on /me route");
    response.send("Got your DELETE request...");
});

app.listen(8080, () => {
    console.log("Server is running on PORT 8080");
});