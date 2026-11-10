import express from "express";

const app = express();

const userArr = [];

app.use(express.json());

const generateToken = () => {

    let options = [
          "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ]

    let token = "";

    for (let i = 0; i < 32; i++) {
        token = token + options[Math.floor(Math.random() * options.length)];
    }

    return token;

};

const authMidlleware = (req,res,next) => {

    // Extracting the token value for user //

    const userToken = req.headers["token"];

    // Verifying if the user token and token stored in database are same//

    const verifiedUser = userArr.find((userObj) => {
        if (userToken === userObj.token) {
            return true;
        } else {
            return false;
        }
    });

    // If the tokens match then we display the user object of the same token //

    if (verifiedUser) {
        req.verifiedUser = verifiedUser;
        next();
    } else {
        res.json ( {
            msg: "invalid token...!",
        });
    }
};

// Sign-Up Code when POST request //

app.post ("/signup", (req,res) => {
    const { username,password,email } = req.body;

    let userObj = {
        username,
        password,
        email,
    };

    userArr.push(userObj);
    console.log(userArr);

    res.json ({
        msg: "user created succesfully...",
        userObj,
    });
});

// Sign-In when POST Request //

app.post("/signin", (req,res) => {
    let {username,password} = req.body;

    const foundUser = userArr.find((user) => {
        if (user.username === username && user.password === password) {
            return true;
        } else {
            return false;
        }
    });

    if (!foundUser) {
        res.json ( {
            msg: "Inavlid Username or Password",
        });
    }

    const token = generateToken();

    foundUser.token = token;

    console.log(userArr);

    res.json ({
        msg: "Signed in sucessfully",
        token,
    });
});

app.use(authMidlleware);

// Creating a "courses" route with GET Request //

app.get("/courses", (req,res) => {
    res.json ({
        data: {
            courseId: "67",
            courseName: "Full Stack Development",
            material: "MERN",
        },
    });
});

// Creating a "me" route with GET Request //

app.get("/me", (req,res) => {
    let {verifiedUser} = req;

    res.json({
        msg: "We got your data",
        data: verifiedUser,
    });
});

app.listen("8080", () => {
    console.log("The Server is listening on port:  8080");
});