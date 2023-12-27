const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
    {
        id: 1,
        name: "Course 1",
    },
    {
        id: 2,
        name: "Course 2",
    },
    {
        id: 3,
        name: "Course 3",
    },
];

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

app.post("/api/courses", (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
    });
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        // bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(courses);
});

app.get("/api/posts/:year/:month", (req, res) => {
    res.send(req.params);
});

//  /api/query/:year/:month?sortBy=name
app.get("/api/query/:year/:month", (req, res) => {
    res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Loading server on ${port}.....!`));
