import express from "express"

const app = express();

// GET Request //

app.get("/mul/:a/:b", (req,res) => {
    const { a,b } = req.params;

    let result = parseInt(a) * parseInt(b);

    res.json( {
        msg: "Multiply request recieved on server",
        sum: result,
    })
} )


// POST Request //

app.post("/mul/:a/:b", (req, res) => {
    let result = req.params.a * req.params.b;
    res.json({ 
        msg: "Mulitply request recieved on server",
        sum: result,
     });
});

// Use this URL : "http://localhost:8080/mul/5/6"



// PUT Request //

app.put('/mul/:a/:b', (req, res) => {
    let { a, b } = req.params;
    let result = a * b;
    res.json({ 
        msg: "Mulitply request recieved on server",
        sum: result,
    });
});

// Use this URL : "http://localhost:8080/mul/5/10"


// DELETE Request //


app.delete("mul/:a/:b" , (req,res) => {

})



app.listen("8080", () => {
    console.log("The Server is listening on Port : 8080");
})