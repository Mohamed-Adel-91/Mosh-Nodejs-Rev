const mongoose = require("mongoose");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const dbDebuggerErr = require("debug")("app:dbErr");

mongoose
    .connect("mongodb://localhost/playground")
    .then(() => dbDebugger("Connecting to the database ....!!"))
    .catch((err) => dbDebuggerErr(err));

//in relational database sql we have >> (tables , rows) but in nonrelational database noSql we have (collection , documents)
// create schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
});

const Course = mongoose.model("course", courseSchema);
// create model
async function createCourse() {
    const course = new Course({
        name: "Building React Applications",
        author: "Mike Williams",
        tags: ["react.js", "javascript"],
        isPublished: true,
    });
    const result = await course.save();
    startupDebugger(result);
}

// Query Document and how to get and filter something in course document
async function getCourses() {
    const courses = await Course.find({
        author: "Mike Williams",
        isPublished: true,
    })
        .limit(10)
        .sort({ date: -1 }) // sort by date descending
        .select({ name: 1, author: 1, tags: 1 });
    dbDebugger(courses);
}
getCourses();
