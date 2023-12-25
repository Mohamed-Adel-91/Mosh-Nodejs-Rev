const fs = require("node:fs");

// we not use synchronous methods with node js
const files = fs.readdirSync("./");
console.log(files);

// we use  Asynchronous methods with node js because its a single thread
fs.readdir("./", function (err, file) {
    if (err) console.log("Error", err);
    else console.log("Result", file);
});
