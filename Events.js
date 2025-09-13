import EventEmitter from "events";

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
// Only do this once so we don't loop forever
myEmitter.once("newListener", (event, listener) => {
  if (event === "event") {
    // Insert a new listener in front
    myEmitter.on("event", () => {
      console.log("B");
    });
  }
});
myEmitter.on("event", () => {
  console.log("A");
});
myEmitter.emit("event");

// ======================================================================================================
//  Handing Arguments within the lislener

// First listener
myEmitter.on("event", function firstListener() {
  console.log("Helloooo! first listener");
});
// Second listener
myEmitter.on("event", function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on("event", function thirdListener(...args) {
  const parameters = args.join(", ");
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners("event"));

myEmitter.emit("event", 1, 2, 3, 4, 5);

// ======================================================================================================

// Symbols and event names

const myEE = new EventEmitter();
myEE.on("foo", () => {});
myEE.on("bar", () => {});

const sym = Symbol("symbol");
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]

// ===================================================================================================

//  prepending the listner

myEE.on("foo", () => console.log("a"));
myEE.prependListener("foo", () => console.log("b"));
myEE.emit("foo");

//  using once for prepending listneer
myEE.once("foo", () => console.log("a"));
myEE.prependOnceListener("foo", () => console.log("b"));
myEE.emit("foo");

// =======================================================================================================

//  Removing the Listeners

const callback = (stream) => {
  console.log("someone connected!");
};
server.on("connection", callback);
// ...
server.removeListener("connection", callback);

//  Removing Listener conditionly

const callbackA = () => {
  console.log("A");
  myEmitter.removeListener("event", callbackB);
};

const callbackB = () => {
  console.log("B");
};

myEmitter.on("event", callbackA);

myEmitter.on("event", callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit("event");
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit("event");
// Prints:
//   A

// ==========================================================================================================

//  Most recent one will be removed

const ee = new EventEmitter();

function pong() {
  console.log("pong");
}

ee.on("ping", pong);
ee.once("ping", pong);
ee.removeListener("ping", pong);

ee.emit("ping");
ee.emit("ping");
