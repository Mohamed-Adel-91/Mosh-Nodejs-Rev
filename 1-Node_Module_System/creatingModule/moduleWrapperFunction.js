// this is behind screen works with node js
(function (exports, require, module, __filename, __dirname) {
    console.log(__dirname);
    console.log(__filename);
    console.log(require);
    console.log(module);
    var url = "http://myLogger.io/log";
    function log(message) {
        // create a new HttpRequest object
        console.log(message);
    }
    // we can export in different kinds
    module.exports = log;
    module.exports.log = log;
    exports.log = log;
    // but not like this
    // exports = log;
    console.log(url);
});
