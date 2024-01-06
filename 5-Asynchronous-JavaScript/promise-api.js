const p = Promise.resolve({ id: 1 });
p.then((result) => console.log(result)); // {id: 1}

const pp = Promise.reject(new Error("reason for rejection ..... !! "));
pp.catch((err) => console.log(err.message));

//running more than one promise in parallel

const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("Async operation 1 ...!");
        resolve(1);
    }, 2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("Async operation 2 ...!");
        resolve(2);
    }, 2000);
});

Promise.all([p1, p2])
    .then((result) => console.log(result))
    .catch((error) => console.log(error.message));

Promise.race([p1, p2])
    .then((result) => console.log(result))
    .catch((error) => console.log(error.message));
