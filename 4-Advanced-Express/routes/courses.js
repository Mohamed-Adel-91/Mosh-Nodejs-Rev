const express = require("express");
const router = express.Router();
const Joi = require("joi");

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

router.get("/", (req, res) => {
    res.send(courses);
});

router.get("/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course)
        return res
            .status(404)
            .send("The course with the given ID was not found.");
    res.send(`your course is : ${course.name}`);
});

//********************** Post Request **************************** /
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

module.exports = router;
