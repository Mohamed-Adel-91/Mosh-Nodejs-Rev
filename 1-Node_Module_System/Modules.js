var sayHello = function () {};

window.sayHello();

// the problem we have in global scope :
/*
- when we defined the function in the global scope in anther file it will be override so we need to built Modules
- we export this functions in the modules to make it global from Private mode (defined to anther files)

- so in node every file is a module and the variable and functions defined in that file are a scope to that module
and that not available outside of that file until you export it
*/

// we have built in modules in node js we will find it in this link :  https://nodejs.org/dist/latest-v20.x/docs/api/
// the most important module in node js is :
/*
- Buffer 
- File system : handling fs
- HTTP : create web server
- Query strings : useful with building http services
- Stream : its allow us to work with stream of data
- OS : operating system
- Path : function to work with path
- Process : that give us information about current  process
- Errors
- Events
- DNS
*/

console.log(module);
