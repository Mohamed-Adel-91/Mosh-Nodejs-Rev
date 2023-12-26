/*Event >> A signal that something has happened
- every Request sent from http it called Event
- EventEmitter : not a function and not simple value it's a class
- create an object with methods to emit events, add listeners for those events.
- A class vs Object >>> 
class >> a human
object >> a person like John , Mary and so on >> it's actual instance of this class
 */
const EventEmitter = require("events"); // it's a class and defined what EventEmitter can do
const emitter = new EventEmitter(); // create an object of this class

// Register a listener
// emitter.on == emitter.addListener
emitter.on("messageLogged", function () {
    console.log("Listener Called");
});

// Raise an Event
emitter.emit("messageLogged");
// it use to rise an event  (emit) >>means>>making nose or , produce something > in this case you are making noise in your application you are signaling that an event has happened
// when we log this code nothing happened >> because we Raise an Event but nowhere  in application we have registered a listener that interested  of that event
// a listener is a function that will be called when that event raised
// we must put the listener before raise an event to call the function
