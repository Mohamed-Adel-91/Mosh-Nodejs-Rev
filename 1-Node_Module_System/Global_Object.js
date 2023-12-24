// global object
console.log();
window.console.log(); // but in javascript we delete window and write directly in global scope

setTimeout();
clearTimeout();

setInterval();
clearInterval();

global.message();

var message = "";
console.log(global.message); // it will be undefined
