import express from "express";
import rateLimitterMiddleware from "./src/middlewares/rateLimitterMiddleware.js";
import reqCounterMiddleware from "./src/middlewares/reqCounterMidlleware.js";
import { div, mul, sum, sub } from "./src/controllers/CalculatorController.js";
import requestLoggerMiddleware from "./src/middlewares/loggerMiddleware.js";
import authenticateMiddleware from "./src/middlewares/protectedDataMiddleware.js"
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use(requestLoggerMiddleware);
app.use(reqCounterMiddleware);
app.use(rateLimitterMiddleware);
app.use(authenticateMiddleware);

app.get("/sum/:a/:b", sum);

app.get("/mul/:a/:b", mul);

app.get("/div/:a/:b", div);

app.get("/sub/:a/:b", sub);

app.get("/protected-data", (req,res) => {
    res.json ( {
        secretData: " I love Biryani ",
    });
});



app.listen("8080", ()=> {
    console.log("The Server is listening on Port: 8080");
});

