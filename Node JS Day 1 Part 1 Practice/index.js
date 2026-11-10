const fs = require("fs");
const path = require("path");

let finalPath = path.join (__dirname,"data","message.txt");

const data = fs.readFileSync(finalPath,"utf8");

console.log(data.length);

console.log(data.split(" ").length -1);