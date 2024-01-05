const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const courses = require("./routes/courses");
const home = require("./routes/home");
const logger = require("./middleware/logger");
const Authentication = require("./middleware/auth");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true })); //key=value&key=value
app.use(express.static("public"));
app.use(helmet());
app.use(bodyParser.json()); // support json encoded bodies
app.use(cors({ optionsSuccessStatus: 200 })); // enable C

app.use("/api/courses", courses);
app.use("/", home);

app.use(logger);
app.use(Authentication);
console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
console.log(`app : ${app.get("env")}`);
if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    startupDebugger("morgan Enabled ....!");
}
dbDebugger("Connected to the database ....!");

// configuration
console.log("Application name : " + config.get("name"));
console.log("Mail server : " + config.get("mail.host"));
console.log("Mail password : " + config.get("mail.password"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Loading server on ${port}.....!`));
