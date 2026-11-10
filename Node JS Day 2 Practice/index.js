import express from "express";

const app = express();

// --------------------- /menu route -------------------------

// GET Handler

app.get("/menu", (request, response) => {
  console.log("Get request recieved on /menu route");

  response.send("I got your request...");
});

// POST Handler

app.post("/menu", (request, response) => {
  console.log("POST request recieved on /menu route");

  response.send("I recieved your POST request...");
});

// PUT Handler

app.put("/menu", (request, response) => {
  console.log("PUT request recieved on /menu route");

  response.send("I recieved your PUT request...");
});

// Delete Handler

app.delete("/menu", (request, response) => {
  console.log("DELETE request recieved on /menu route");

  response.send("I got your delete request...");
});

app.listen(8080, () => {
  console.log("Server is running on Port 8080");
});
