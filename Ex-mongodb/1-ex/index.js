const mongoose = require("mongoose");
const dbDebugger = require("debug")("app:db");

// connecting to the database local
mongoose
    .connect("mongodb://localhost/mongo-exercises")
    .then(() => dbDebugger("connecting to the database...!!"))
    .catch((err) => dbDebugger(err));

// create schema
const courseSchema = new mongoose.Schema({
    tags: [String],
    date: { type: Date, default: Date.now },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
});

//create model
const Course = mongoose.model("courses", courseSchema);

// get some data
async function getCourse() {
    const course = await Course.find({ tags: "backend", isPublished: true })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });
    dbDebugger(course);
}
getCourse();
