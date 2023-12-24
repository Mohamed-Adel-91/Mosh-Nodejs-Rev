var url = "http://myLogger.io/log";

function log(message) {
    // create a new HttpRequest object
    console.log(message);
}

//module.exports.log = log; // to export log function

module.exports = log; // we can export single function like this

module.exports.endpoint = url; // to export url endpoint variable
