const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("done"); //pending => resolve , fulfilled
        reject(new Error("This is Error message")); //pending => rejected
    }, 2000);
});
p.then((data) => console.log(data)) // done
    .catch((error) => console.log(error.message)); // Error: This is Error message
