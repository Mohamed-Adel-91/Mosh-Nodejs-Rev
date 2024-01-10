const mongoose = require("mongoose");

//connecting to database
mongoose
    .connect("mongodb://localhost/playground2")
    .then(() => console.log("Connecting to the database ....!!"))
    .catch((err) => console.log(err));

// create schema
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        match: /.*js.*/, //this mean it must have js in the name of the course
    },
    category: {
        type: String,
        required: true,
        enum: ["Web development", "Data base", "Graphic design"], // it means the category we have set must be in this values
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: async function (value) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        // Do some asynchronous work
                        const result = value && value.length > 0;
                        resolve(result);
                    }, 1000);
                });
            },
            message: "A course should be have at least one tag.",
        },
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        min: 10,
        max: 50, // min & max only for numbers and dates
        required: function () {
            return this.isPublished; //return true if published else false
        },
    },
});

// create model
const Course = mongoose.model("courses", courseSchema);

// create documents
async function createCourse() {
    const course = new Course({
        name: "Node js",
        category: "Web development",
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
        // if (!isValidate) {
        //     console.log("Do some thing to solve the problem");
        // }
        const result = await course.save();
        console.log(result);
    } catch (error) {
        for (field in error.errors)
            console.log(`${field}: ${error.errors[field].message}`);
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
// getCourses();
