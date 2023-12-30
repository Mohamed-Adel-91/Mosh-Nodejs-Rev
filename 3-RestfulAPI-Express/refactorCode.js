const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

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
    res.send("Hello World!");
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
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
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
