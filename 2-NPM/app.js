var _ = require("underscore");
// "underscore": "^1.13.6"   >> "^Major,Minor,Patch"
// "^1.13.6"  === "1.x"
// "~1.13.6" === "1.13.x"
// "1.13.6" === "1.13.6" only with no updated versions

var result = _.contains([1, 2, 3], 2);
console.log(result);
