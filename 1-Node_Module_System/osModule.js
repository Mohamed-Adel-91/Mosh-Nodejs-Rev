const os = require("node:os");

// we have :
/*
os.freemem() : to free memory in machine
os.totalmem(): returns the total amount of memory in bytes available to this process.
os.userInfo([options]): to get information of current user
os.uptime(): to get  up time of this machine 
*/

var freemem = os.freemem();
console.log(`Free Memory is ${freemem} Bytes`);
var totalmem = os.totalmem();
console.log(`Total Memory is ${totalmem} Bytes`);

// before ES6 : we  concatenate template string to log( "string" + variable )/ now we do that (`string ${variable}`)
