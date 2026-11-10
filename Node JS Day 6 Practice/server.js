import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();

const JWT_SECRET = "I love Biryani";

app.use(cors());
app.use(express.json());

let userArr = [];

// Authentication Middleware //

const authMiddleware = (req, res, next) => {
  const userToken = req.headers["token"];

  const verifyPayload = jwt.verify(userToken, JWT_SECRET);

  if (!verifyPayload) {
    res.status(401).json({
      msg: "Inavlid Token !",
    });
  }

  req.payload = verifyPayload;
  next();
};

// Creating a POST request for Signup Route //

app.post("/signup", (req, res) => {
  const { username, password, email } = req.body;

  userArr.push({ username, password, email });

  console.log(userArr);

  res.status(201).json({
    msg: "User Registered Successfully",
  });
});

// Creating a POST request for Signin route //

app.post("/signin", (req,res) => {
  const { username, password } = req.body;

  let foundUser = userArr.find((userObj) => {
    if (userObj.username === username && userObj.password === password) {
      return true;
    } else {
      return false;
    }
  });

  if (!foundUser) {
    res.status(401).json({
      msg: "Invalid Username or Password",
    });
  }

  // Creating Token //

  const token = jwt.sign(
    {
      username: foundUser.username,
      message: "This token is for authentication...",
    },
    JWT_SECRET,
  );

  res.json({
    msg: "Signed In Successfully",
    token,
  });
});

app.use(authMiddleware);

app.get("/courses", authMiddleware, (req, res) => {
  const { username } = req.payload;

  res.json({
    data: {
      courseId: "77",
      courseName: "Data Analysis",
      material: "PYTHON, SQL",
    },
  });
});

app.listen("8080", () => {
  console.log("Server is listening on Port: 8080");
});
