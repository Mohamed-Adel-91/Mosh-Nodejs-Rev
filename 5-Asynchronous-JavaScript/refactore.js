console.log("before");

// this is callback function hell >> nested function or it called christmas tree function
getUser(1, (user) => {
    console.log(user);
    getRepo(user.githubUserName, (repo) => {
        console.log(`${user.githubUserName} is working on ${repo}`);
        getCommit(repo[0], (commit) => {
            console.log(
                `The last commit was made by @${user.githubUserName} and its ${commit}`
            );
        });
    });
});

// we can handel it in flat beauty code with promises
getUser(1)
    .then((user) => getRepo(user.githubUserName))
    .then((repo) => getCommit(repo[0]))
    .then((commits) => console.log("commits", commits))
    .catch((err) => new Error(err.message));

// we can handel this promise using async and await approach
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repo = await getRepo(user.githubUserName);
        const commit = await getCommit(repo[0]);
        console.log(commit);
    } catch {
        console.error(err.message);
    }
}
displayCommits();

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
