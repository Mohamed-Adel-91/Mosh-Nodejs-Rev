const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
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

const courses = [
    { id: 1, name: "Course 1" },
    { id: 2, name: "Course 2" },
    { id: 3, name: "Course 3" },
];

// refactoring validation function
function validateCourses(course) {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
    });
    return Joi.validate(course, schema);
}

//********************** Get Request **************************** /
app.get("/", (req, res) => {
    res.render("index", {
        title: "My Express App",
        message: `Server Listening on Port ${port} , Hello World!`,
    });
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course)
        return res
            .status(404)
            .send("The course with the given ID was not found.");
    res.send(`your course is : ${course.name}`);
});

//********************** Post Request **************************** /
app.post("/api/courses", (req, res) => {
    // Validate
    const { error } = validateCourses(req.body);
    // If invalid, return 404 , Bad request
    if (error) {
        // bad request
        res.status(400).send(error.details[0].message);
        return;
    }
    // Add data from body to array and add +1 in id
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    // push it in array
    courses.push(course);
    // send data
    res.send(courses);
});

//**************************** Put Request (update) ******************/
app.put("/api/courses/:id", (req, res) => {
    //Lookup the course.
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    //If not existing, return 404
    if (!course)
        return res
            .status(404)
            .send("The course with the given ID was not found.");

    // Validate
    const { error } = validateCourses(req.body);
    // If invalid, return 404 , Bad request
    if (error) {
        // bad request
        return res.status(400).send(error.details[0].message);
    }

    // Update Course
    course.name = req.body.name;
    // Return the update course
    res.send(course);
});

//**************************** Delete Request ******************/
app.delete("/api/courses/:id", (req, res) => {
    //Lookup the course.
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    //If not existing, return 404
    if (!course)
        return res
            .status(404)
            .send("The course with the given ID was not found.");

    // Delete Course
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    // Return the update course
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Loading server on ${port}.....!`));
