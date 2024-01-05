console.log("before");

getUser(1, (user) => {
    console.log(user);
    getRepo(user.githubUserName, (repo) => {
        console.log(`${user.githubUserName} is working on ${repo}`);
    });
});

console.log("after");

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("reading users from database ...!");
            resolve({ id: id, githubUserName: "mohamed-adel-91" });
            reject(new Error("This is Error message getUser"));
        }, 2000);
    });
}

function getRepo(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(["repo1", "repo2", "repo3"]);
            reject(new Error("This is Error message getRepo"));
        }, 3000);
    });
}

function getCommit(commit) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(["Commit"]);
            reject(new Error("This is Error message getCommit"));
        });
    });
}
