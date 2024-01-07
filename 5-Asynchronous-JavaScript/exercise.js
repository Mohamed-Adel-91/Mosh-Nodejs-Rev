// getCustomer(1, (customer) => {
//     console.log("Customer: ", customer);
//     if (customer.isGold) {
//         getTopMovies((movies) => {
//             console.log("Top movies: ", movies);
//             sendEmail(customer.email, movies, () => {
//                 console.log("Email sent...");
//             });
//         });
//     }
// });

// refactor using async - await
async function sendingEmailGoldMovies() {
    try {
        const customer = await getCustomer(1);
        console.log("Customer: ", customer.name);
        if (customer.isGold) {
            const movies = await getTopMovies();
            console.log("Top movies: ", movies);
            const sendingEmail = await sendEmail(customer.email, movies);
            console.log(`${sendingEmail} has been sent.`);
        }
    } catch (err) {
        console.log("Error", err.message);
    }
}
sendingEmailGoldMovies();

function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: "Mohamed Adel",
                isGold: true,
                email: "Mohamed-Mail",
            });
        }, 4000);
    });
}

function getTopMovies() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(["movie1", "movie2"]);
        }, 4000);
    });
}

function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(email);
        }, 4000);
    });
}
