//Mongoose- Modeling Relationships between Connected Data
// we can chose the way of relations depend on trading off between query performance and consistency
// 1- Using References (Normalization) -> consistency : that mean if i want to change name it will be updated in all references  have same id of this author - how ever every time i query course we need to do an extra query to load the related author

let author = {
    name: "mosh",
};

let course = {
    author: "id", //we use reference id of author to make relation with courses
    authors: [
        // we can use multiple ids as a reference
        "id1",
        "id2",
        "id3",
    ],
};
// sometime that extra query may not be a big deal, but in certain situations you want to make sure that your query is run as fast as possible

// 2- Using Embedded Documents ( Denormalization) -> performance
// in this case we can load a course object and its author using single query you don't have to do an additional query to load author because author in the same course object or the course document
// however with this approach, if tomorrow i decide to change the name of the author from mosh to mosh hamadani > chances are there are multiple course documents that need to be updated and if our updated operation doesn't complete successfully its possible that we will have some courses document that are not updated , so we will end up with inconsistent data
let courses = {
    author: {
        name: "mosh",
    },
};

// 3- hybrid
let authors = {
    name: "mosh",
    //50 other properties
};

let course3 = {
    author: {
        id: "ref_authorId",
        name: "mosh",
    },
};
