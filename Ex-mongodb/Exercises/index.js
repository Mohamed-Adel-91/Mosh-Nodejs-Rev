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
async function getCourses() {
    return await Course.find({ isPublished: true })
        .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
        .sort("-price")
        .select("name author price");
}
async function run() {
    const courses = await getCourses();
    dbDebugger(courses);
}

run().catch((err) => console.log(err));
