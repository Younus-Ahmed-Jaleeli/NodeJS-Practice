import express from "express";

const app = express();

app.use(express.json());




// GET Request //

app.get("/sum", (req, res) => {
  const { a, b } = req.query;

  let result = Number(a) + Number(b);

  res.json({
    msg: "Sum requested was recieved on server",
    sum: result,
  });
});



// POST Request //

app.post("/sum", (req, res) => {
  let { a, b } = req.query;

  let result = Number(a) + Number(b);

  res.json({
    a: Number(a),
    b: Number(b),
    sum: result,
  });
});

// Post this URL: "http://localhost:8080/sum?a=5&b=20" //




//EDIT Request //

app.put("/sum", (req, res) => {
  const a = Number(req.query.a) || 0;
  const b = Number(req.query.b) || 0;
  const sum = a + b;

  res.json({ a, b, sum });
});

// Post this URL : "http://localhost:8080/sum?a=5&b=20" //

// Post this in JSON Application : {
//   "a": 5,
//   "b": 10
// } 



// DELETE Request //

app.delete('/sum', (req, res) => {
 
  const { a, b } = req.query;

  res.json({
    receivedA: a,
    receivedB: b,
    status: "deleted"
  });
});


// Post this URL : "http://localhost:8080/sum?a=5&b=10" //

// Post this in JSON Application : {
//   "a": 5,
//   "b": 10
// }



app.listen("8080", () => {
  console.log("Server is listening on Port 8080");
});
