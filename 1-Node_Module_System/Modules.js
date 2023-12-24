var sayHello = function () {};

window.sayHello();

// the problem we have in global scope :
/*
- when we defined the function in the global scope in anther file it will be override so we need to built Modules
- we export this functions in the modules to make it global from Private mode (defined to anther files)

- so in node every file is a module and the variable and functions defined in that file are a scope to that module
and that not available outside of that file until you export it
*/

console.log(module);
