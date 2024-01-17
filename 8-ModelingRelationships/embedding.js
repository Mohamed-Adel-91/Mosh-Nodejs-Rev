const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost/playground")
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
    "Course",
    new mongoose.Schema({
        name: String,
        author: {
            type: authorSchema,
            required: true,
        },
    })
);

async function createCourse(name, author) {
    const course = new Course({
        name,
        author,
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

// async function updateAuthor(courseId) {
//     // Get the existing course
//     const course = await Course.findById(courseId);
//     // Update the course with the new author
//     course.author.name = "mosh hamadani";
//     course.save();
// }

// anther way we can update it directly
// async function updateAuthor(courseId) {
//     const course = await Course.updateOne(
//         { _id: courseId },
//         {
//             $set: {
//                 "author.name": "Mosh H",
//             },
//         }
//     );
// }

// if we need the author property
async function updateAuthor(courseId) {
    const course = await Course.updateOne(
        { _id: courseId },
        {
            $unset: {
                author: "",
            },
        }
    );
}

// Call each of the above functions in order
updateAuthor("65a7f7b6d6bc7956ad6b35f1");

// createCourse("Node Course", new Author({ name: "Mosh" }));
