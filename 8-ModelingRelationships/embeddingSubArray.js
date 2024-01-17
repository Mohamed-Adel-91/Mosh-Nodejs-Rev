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
        authors: {
            type: [authorSchema],
            required: true,
        },
    })
);

async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors,
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

// createCourse("Node Course", [
//     new Author({ name: "Mosh" }),
//     new Author({ name: "Mac" }),
// ]);

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);
    // Add the author to the course's authors array
    course.authors.push(author);
    // Save the updated model back to the database
    const updateResult = await course.save();
    console.log(updateResult);
}

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);
    /** first method
    // Find and remove the specified author from the authors array using pull operator
    // https://docs.mongodb.com/manual/reference/operator/pull/
    course.authors.pull({ _id: authorId });
    const updateResult = await course.save();
    if (!updateResult) {
        return false;
    }
    return true; 
     */
    // second method
    // An alternative approach is to use findOneAndUpdate which will do an atomic find & modify
    // This method returns the updated document rather than just a success indicator
    // const removedAuthor = course.authors.id(authorId);
    // if (!removedAuthor) {
    //     throw new Error(`Author not found`);
    // }
    // return await Course.findOneAndUpdate(
    //     { _id: courseId },
    //     { $pull: { authors: { _id: authorId } } },
    //     { new: true }
    // );
    // third method
    const author = course.authors.id(authorId);
    author.deleteOne();
    course.save();
}

// addAuthor("65a7fefd71f90e740517d54d", new Author({ name: "foz" }));
removeAuthor("65a7fefd71f90e740517d54d", "65a800f244daad9c56817e3d");
