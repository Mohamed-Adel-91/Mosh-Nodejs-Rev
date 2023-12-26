const EventEmitter = require("events");
const emitter = new EventEmitter();

// Register a listener
// we also can use >> e , event , eventArg
emitter.on("messageLogged", function (arg) {
    console.log("Listener Called", arg);
});

// Raise an Event
emitter.emit("messageLogged", { id: 1, url: "http://" });

// ex.1
emitter.on("logging", (eventArg) => {
    console.log("Logging called", eventArg);
});

const data = { id: 1, data: "message" };
emitter.emit("logging", data);
