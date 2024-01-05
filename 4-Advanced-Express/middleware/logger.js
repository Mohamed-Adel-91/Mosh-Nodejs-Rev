function log(req, res, next) {
    console.log("Logging middleware ....!");
    next();
}
module.exports = log;
