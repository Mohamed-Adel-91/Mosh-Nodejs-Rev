const mongoose = require("mongoose");

//connecting to database
mongoose
    .connect("mongodb://localhost/playground2")
    .then(() => console.log("Connecting to the database ....!!"))
    .catch((err) => console.log(err));

// create schema
const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number,
});

// create model
const Course = mongoose.model("courses", courseSchema);

// create documents
async function createCourse() {
    const course = new Course({
        name: "Node js",
        author: "Mosh Hamadani",
        tags: ["node.js", "express.js", "javascript"],
        isPublished: true,
        price: 15,
    });
    try {
        // course.validate((error) => {
        //     if (error) {
        //         console.log(`Error in validation ${error}`);
        //     }
        // });
        const isValidate = await course.validate();
        if (!isValidate) {
            console.log("Do some thing to solve the problem");
        }
        const result = await course.save();
        console.log(result);
    } catch (error) {
        console.log(error.message);
    }
}
createCourse();

//getData from Document
async function getCourses() {
    const courses = await Course.find({
        isPublished: true,
    })
        .sort({ date: -1 }) // sort by date descending
        .select({ name: 1, author: 1, tags: 1, price: 1 });
    console.log(courses);
}
getCourses();
