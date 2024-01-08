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
// create model
const Course = mongoose.model("course", courseSchema);

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
createCourse();

// Query Document and how to get and filter something in course document
async function getCourses() {
    // filtering in mongodb > comparison query operation
    // eq >> Equal
    // ne >> not Equal
    // gt >> Greater than
    // gte >> greater Than or Equal to
    // lt >> less than
    // lte >> Less Than or Equal to
    // in
    // nin >> Not In
    // filtering in mongodb >> logical query operation
    // and
    // or
    // filtering in mongodb >> regular expressions
    //start with  >> .find({author: /^Mosh/}) >> case sensitive
    //start with  >> .find({author: /^Mosh/i})>> case insensitive
    // ends with >> .find({author: /Mosh$/}) >> case sensitive
    // ends with >> .find({author: /Mosh$/i}) >> case insensitive
    // contain something >> .find({author: /.*Mosh.*/}) >> case sensitive
    // contain something >> .find({author: /.*Mosh.*/i})>> case insensitive
    //.count(); >> to show result of count of documents
    // pagination >> .skip(); >>   we can find ex. in line
    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10
    const courses = await Course.find({
        // we can use them like this in .find
        price: { $gt: 10, $lt: 20 },
        tags: { $in: ["react.js", "Node.js", "Angular"] },
        author: "Mike Williams",
        isPublished: true,
    })
        .or({ author: "Mosh" }, { isPublished: true })
        .and({ author: "Mosh" }, { isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ date: -1 }) // sort by date descending
        .select({ name: 1, author: 1, tags: 1 });
    dbDebugger(courses);
}
getCourses();
