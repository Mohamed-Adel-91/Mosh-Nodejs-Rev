console.log("before");

getUser(1, (user) => {
    console.log(user);
    getRepo(user.githubUserName, (repo) => {
        console.log(`${user.githubUserName} is working on ${repo}`);
    });
});

console.log("after");

function getUser(id, callback) {
    setTimeout(() => {
        console.log("reading users from database ...!");
        callback({ id: id, githubUserName: "mohamed-adel-91" });
    }, 2000);
}

function getRepo(username, callback) {
    setTimeout(() => {
        callback(["repo1", "repo2", "repo3"]);
    }, 3000);
}
