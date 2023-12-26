const http = require("http");
/*
const server = http.createServer();

server.on("connection", (socket) => {
    console.log(`New connection: ${socket.remoteAddress}:${socket.remotePort}`);
});
server.listen(3000);
console.log("Listening on port : 3000 ....");
*/

// the last code is the low level code we can use
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        // send response to client
        res.write("Hello world ...");
        res.end();
    }
    if (req.url === "/api/courses") {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

server.listen(3003);
console.log("Listening on port : 3003 ....");
