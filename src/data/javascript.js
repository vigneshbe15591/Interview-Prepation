export const meta = {
  id: "javascript",
  label: "JavaScript",
  icon: "⚡",
  color: "#f0c040",
  desc: "The language of the web. Core concepts every developer must master.",
};

export const qaData = [
  {
    q: "Hoisting",
    a: "Hoisting is JavaScript's default behavior of moving declarations to the top of their scope before code execution. var declarations are hoisted and initialized with undefined. let and const are hoisted but remain uninitialized (Temporal Dead Zone).",
    code: `// var hoisting
console.log(a); // undefined (not an error)
var a = 5;

// let/const hoisting - TDZ
console.log(b); // ReferenceError
let b = 10;

// Function hoisting
greet(); // "Hello!" - works fine
function greet() {
  console.log("Hello!");
}

// Function expression - NOT hoisted
sayBye(); // TypeError
var sayBye = function() {
  console.log("Bye!");
};`,
  },
  {
    q: "let, const, var",
    a: "var is function-scoped and can be re-declared and updated. let is block-scoped and cannot be re-declared in the same scope. const is block-scoped, must be initialized, and cannot be reassigned (but object properties can be mutated).",
    code: `// var - function scoped
function testVar() {
  if (true) { var x = 10; }
  console.log(x); // 10
}

// let - block scoped
function testLet() {
  if (true) { let y = 20; }
  console.log(y); // ReferenceError
}

// const
const PI = 3.14;
PI = 3; // TypeError

const user = { name: "Alice" };
user.name = "Bob"; // ✅ allowed
user = {};         // ❌ TypeError`,
  },
  {
    q: "Temporal Dead Zone",
    a: "The TDZ is the period between entering a block and the point where let/const is initialized. Accessing the variable during this zone throws a ReferenceError.",
    code: `{
  console.log(name); // ReferenceError - TDZ
  let name = "Alice";
  console.log(name); // "Alice"
}

console.log(typeof foo); // ReferenceError (let in TDZ)
let foo = 1;

console.log(typeof bar); // "undefined" (var - safe)
var bar = 2;`,
  },
  {
    q: "JS Engine",
    a: "A JavaScript engine parses and executes JS code. Modern engines like V8 use JIT compilation to convert JS into optimized machine code at runtime.",
    code: `// V8 Pipeline:
// Source → Parser → AST → Ignition (bytecode)
//        → Profiler → TurboFan (machine code)

function add(a, b) { return a + b; }

// Called many times → V8 compiles to optimized machine code
for (let i = 0; i < 1000000; i++) add(i, i + 1);

// Deoptimization - type change breaks optimization
function addMixed(a, b) { return a + b; }
addMixed(1, 2);     // V8 assumes numbers
addMixed("a", "b"); // V8 deoptimizes`,
  },
  {
    q: "JS Runtime Environment",
    a: "The JS Runtime Environment is the complete ecosystem where JavaScript runs: JS Engine, Web APIs, Call Stack, Memory Heap, Callback Queue, Microtask Queue, and the Event Loop.",
    code: `function main() {
  console.log("1. Sync start");

  setTimeout(() => console.log("4. Macro task"), 0);

  Promise.resolve().then(() => console.log("3. Microtask"));

  console.log("2. Sync end");
}
main();
// 1. Sync start → 2. Sync end → 3. Microtask → 4. Macro task`,
  },
  {
    q: "Call Stack",
    a: "The Call Stack is a LIFO data structure that tracks function execution. When a function is called, a frame is pushed. When it returns, it is popped. Stack overflow occurs with infinite recursion.",
    code: `function third() { console.log("third"); }
function second() { third(); }
function main() { second(); }
main();
// Stack frames: main → second → third → (unwind)

// Stack overflow
function infinite() { return infinite(); }
infinite(); // RangeError: Maximum call stack size exceeded`,
  },
  {
    q: "Microtask Queue",
    a: "The Microtask Queue holds Promise callbacks and queueMicrotask(). It is drained completely after each task before the next macrotask runs.",
    code: `console.log("Start");
setTimeout(() => console.log("Timeout"), 0);   // Macrotask
Promise.resolve().then(() => console.log("Promise 1"))
                 .then(() => console.log("Promise 2")); // Microtasks
queueMicrotask(() => console.log("queueMicrotask"));
console.log("End");

// Output: Start → End → Promise 1 → queueMicrotask → Promise 2 → Timeout`,
  },
  {
    q: "Callback Queue",
    a: "The Callback Queue stores callbacks from setTimeout, setInterval, and DOM events. The event loop picks from it only when the call stack and microtask queue are empty.",
    code: `setTimeout(() => console.log("setTimeout 1"), 0);
setTimeout(() => console.log("setTimeout 2"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("Sync");

// Output: Sync → Promise → setTimeout 1 → setTimeout 2

const id = setInterval(() => console.log("tick"), 1000);
setTimeout(() => clearInterval(id), 3500); // stops after ~3 ticks`,
  },
  {
    q: "Event Loop",
    a: "The Event Loop monitors the Call Stack and queues. When the stack is empty, it drains all microtasks, then picks one macrotask, then repeats. This enables non-blocking async behavior in single-threaded JS.",
    code: `console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve()
  .then(() => { console.log("C"); return Promise.resolve(); })
  .then(() => console.log("D"));
console.log("E");

// Output: A → E → C → D → B`,
  },
  {
    q: "Promise",
    a: "A Promise represents the eventual completion or failure of an async operation. States: pending, fulfilled, rejected. Solved callback hell with .then(), .catch(), .finally() chaining.",
    code: `const fetchData = new Promise((resolve, reject) => {
  const success = true;
  if (success) resolve({ id: 1, name: "Alice" });
  else reject(new Error("Failed"));
});

fetchData
  .then(data => { console.log(data); return data.name; })
  .then(name => console.log("Name:", name))
  .catch(err => console.error(err))
  .finally(() => console.log("Done"));`,
  },
  {
    q: "Async / Await",
    a: "async/await is syntactic sugar over Promises. An async function always returns a Promise. await pauses execution until the Promise settles without blocking the main thread.",
    code: `// Promise version
function getUser() {
  return fetch("/api/user").then(r => r.json());
}

// Async/Await version
async function getUser() {
  const res = await fetch("/api/user");
  return await res.json();
}

// Error handling
async function loadData() {
  try {
    const res = await fetch("https://api.example.com/data");
    if (!res.ok) throw new Error("Network error");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("Failed:", err.message);
  } finally {
    console.log("Done");
  }
}

// Parallel
async function parallel() {
  const [users, posts] = await Promise.all([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
  ]);
}`,
  },
  {
    q: "Promise.all, allSettled, any, race",
    a: "Static Promise combinators: all() fails fast on any rejection. allSettled() waits for all. any() resolves with first fulfilled. race() resolves/rejects with whichever settles first.",
    code: `const p1 = Promise.resolve("A");
const p2 = Promise.resolve("B");
const p3 = Promise.reject("Error");

Promise.all([p1, p2]).then(v => console.log(v)); // ["A","B"]
Promise.all([p1, p3]).catch(e => console.log(e)); // "Error"

Promise.allSettled([p1, p2, p3]).then(r => console.log(r));
// [{status:"fulfilled",value:"A"}, ..., {status:"rejected",reason:"Error"}]

Promise.any([p3, p1, p2]).then(v => console.log(v)); // "A"

Promise.race([
  new Promise(r => setTimeout(() => r("slow"), 1000)),
  new Promise(r => setTimeout(() => r("fast"), 100)),
]).then(v => console.log(v)); // "fast"`,
  },
  {
    q: "Event Bubbling",
    a: "Events propagate from the target element upward through ancestors to the root. Use event delegation to handle events on multiple children with one listener on the parent.",
    code: `document.querySelector("div").addEventListener("click", () => {
  console.log("DIV clicked"); // runs 2nd
});
document.querySelector("button").addEventListener("click", (e) => {
  console.log("BUTTON clicked"); // runs 1st
  // e.stopPropagation(); // prevents DIV from firing
});

// Event Delegation
document.querySelector("ul").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("Clicked:", e.target.textContent);
  }
});`,
  },
  {
    q: "Event Capturing",
    a: "Event capturing travels from root down to the target (opposite of bubbling). Enabled by passing true or { capture: true } as the third argument to addEventListener.",
    code: `document.querySelector("div").addEventListener(
  "click",
  () => console.log("DIV - capturing"), // runs 1st
  true
);
document.querySelector("button").addEventListener(
  "click",
  () => console.log("BUTTON - target") // runs 2nd
);

// Full flow: capture down → target → bubble up
// Stop with: e.stopPropagation()`,
  },
  {
    q: "Pure Functions",
    a: "A pure function always returns the same output for the same inputs and has no side effects. They are predictable, testable, and the foundation of functional programming.",
    code: `// ✅ Pure
function add(a, b) { return a + b; }
function addItem(arr, item) { return [...arr, item]; }

// ❌ Impure - modifies external state
let total = 0;
function addToTotal(n) { total += n; return total; }

// ❌ Impure - random
function getRandom() { return Math.random(); }

// ❌ Impure - side effect
function logAndReturn(x) { console.log(x); return x; }`,
  },
  {
    q: "Higher Order Functions",
    a: "A Higher Order Function takes functions as arguments or returns a function. They enable map, filter, reduce, currying, and function composition.",
    code: `function applyTwice(fn, value) { return fn(fn(value)); }
applyTwice(x => x * 2, 3); // 12

function multiplier(factor) { return (num) => num * factor; }
const double = multiplier(2);
double(5); // 10

const nums = [1, 2, 3, 4, 5];
nums.map(n => n * 2);            // [2,4,6,8,10]
nums.filter(n => n % 2 === 0);   // [2,4]
nums.reduce((acc, n) => acc + n, 0); // 15

// Composition
const compose = (f, g) => x => f(g(x));
const addOneThenSquare = compose(x => x * x, x => x + 1);
addOneThenSquare(4); // 25`,
  },
  {
    q: "Prototype & Prototypal Inheritance",
    a: "Every JS object has a [[Prototype]] link. When a property is not found, JS walks the prototype chain. ES6 classes are syntactic sugar over this mechanism.",
    code: `const animal = { breathe() { console.log("Breathing"); } };
const dog = Object.create(animal);
dog.bark = function() { console.log("Woof!"); };

dog.bark();    // "Woof!" - own method
dog.breathe(); // "Breathing" - from prototype
// Chain: dog → animal → Object.prototype → null

function Person(name) { this.name = name; }
Person.prototype.greet = function() {
  console.log(\`Hi, I'm \${this.name}\`);
};
const alice = new Person("Alice");
alice.greet(); // "Hi, I'm Alice"

class Animal {
  constructor(name) { this.name = name; }
  speak() { console.log(\`\${this.name} speaks\`); }
}
class Dog extends Animal {
  bark() { console.log("Woof!"); }
}`,
  },
  {
    q: "TypeError, ReferenceError, SyntaxError",
    a: "TypeError: wrong type operation. ReferenceError: accessing undeclared variable. SyntaxError: invalid syntax caught at parse time before execution.",
    code: `// TypeError
null.toString();    // TypeError: Cannot read properties of null
const x = 5; x();  // TypeError: x is not a function

// ReferenceError
console.log(foo);   // ReferenceError: foo is not defined
console.log(myLet); // ReferenceError (TDZ)
let myLet = 10;

// SyntaxError (caught before execution)
// eval("if (true) {"); // SyntaxError

// Catching errors
try {
  null.toString();
} catch (e) {
  console.log(e instanceof TypeError); // true
  console.log(e.message);
}`,
  },
  {
    q: "Garbage Collector",
    a: "JS uses automatic memory management via Mark-and-Sweep. The GC marks all reachable objects from roots, then frees everything unreachable. V8 uses generational GC.",
    code: `let user = { name: "Alice" };
user = null; // eligible for GC

// Circular references handled by modern GC
function createCircle() {
  const a = {}; const b = {};
  a.ref = b; b.ref = a;
} // both collected when out of scope

// Memory leaks GC CANNOT collect:
window.leak = { bigData: new Array(1000000) }; // global
const el = document.getElementById("btn");
el.addEventListener("click", handler); // forgotten listener
// Fix: el.removeEventListener("click", handler)`,
  },
  {
    q: "Memory Leak",
    a: "Memory leaks happen when memory no longer needed is not released. Common causes: global variables, forgotten timers, detached DOM nodes, closures holding large scopes.",
    code: `// 1. Accidental global
function bad() { leakedVar = "global!"; }

// 2. Forgotten timer
const id = setInterval(() => console.log("tick"), 1000);
clearInterval(id); // ✅ fix

// 3. Detached DOM node
let div = document.createElement("div");
document.body.appendChild(div);
document.body.removeChild(div);
div = null; // ✅ clear reference

// 4. Event listener not removed
class Component {
  constructor() {
    this.handler = () => console.log("clicked");
    document.addEventListener("click", this.handler);
  }
  destroy() {
    document.removeEventListener("click", this.handler); // ✅
  }
}`,
  },
  {
    q: "Web Workers",
    a: "Web Workers run JS in background threads. Cannot access DOM. Communicate via postMessage/onmessage. Used for heavy computation without blocking the UI.",
    code: `// main.js
const worker = new Worker("worker.js");
worker.postMessage({ numbers: [1, 2, 3, 4, 5] });
worker.onmessage = (e) => console.log("Result:", e.data);
worker.onerror = (e) => console.error("Error:", e.message);

// worker.js
self.onmessage = (e) => {
  const { numbers } = e.data;
  const sum = numbers.reduce((a, n) => a + n, 0);
  const squared = numbers.map(n => n * n);
  self.postMessage({ sum, squared });
};
// Result: { sum: 15, squared: [1, 4, 9, 16, 25] }`,
  },
  {
    q: "CORS",
    a: "CORS (Cross-Origin Resource Sharing) restricts HTTP requests between different origins. The server must include specific headers to allow cross-origin requests. Enforced by the browser.",
    code: `// Cross-origin = different protocol, domain, or port
fetch("https://api.otherdomain.com/data"); // blocked by default

// Required server headers:
// Access-Control-Allow-Origin: https://yourdomain.com
// Access-Control-Allow-Methods: GET, POST
// Access-Control-Allow-Headers: Content-Type

// Express CORS setup
const cors = require("cors");
app.use(cors({
  origin: "https://yourdomain.com",
  methods: ["GET", "POST"],
}));

// With credentials
fetch(url, { credentials: "include" });
// + server: Access-Control-Allow-Credentials: true`,
  },
  {
    q: "Primitive vs Non-Primitive Data Types",
    a: "Primitives are immutable, stored by value on the stack. Non-primitives (objects, arrays, functions) are stored on the heap; variables hold a reference.",
    code: `// Primitives - copied by value
let a = 10; let b = a; b = 20;
console.log(a); // 10 (unchanged)

// Non-primitives - copied by reference
let obj1 = { name: "Alice" };
let obj2 = obj1;
obj2.name = "Bob";
console.log(obj1.name); // "Bob" - both changed!

// Deep copy
const copy = structuredClone(obj1); // modern
const copy2 = JSON.parse(JSON.stringify(obj1));

// Comparison
console.log({} === {}); // false (different refs)
console.log("hi" === "hi"); // true (same value)`,
  },
  {
    q: "Local Storage, Session Storage & Cookies",
    a: "Three client-side storage options differing in persistence, capacity, and server communication. localStorage persists until cleared. sessionStorage clears on tab close. Cookies are sent with every HTTP request.",
    code: `// localStorage
localStorage.setItem("user", JSON.stringify({ name: "Alice" }));
const user = JSON.parse(localStorage.getItem("user"));
localStorage.removeItem("user");

// sessionStorage
sessionStorage.setItem("token", "abc123");
const token = sessionStorage.getItem("token");

// Cookies
document.cookie = "username=Alice; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";

// Comparison:
// localStorage  | ~5-10MB | Never        | Not sent to server
// sessionStorage| ~5MB    | Tab close    | Not sent to server
// Cookie        | ~4KB    | Custom expiry| Sent with every request`,
  },
  {
    q: "for...in, for...of, forEach",
    a: "for...in iterates object keys. for...of iterates iterable values (arrays, strings, Maps). forEach is an array method with a callback — cannot use break.",
    code: `// for...in - object keys
const person = { name: "Alice", age: 25 };
for (let key in person) console.log(key, person[key]);

// for...of - iterable values
for (let val of [10, 20, 30]) console.log(val);
for (let char of "hi") console.log(char); // h, i

const map = new Map([["a", 1], ["b", 2]]);
for (let [k, v] of map) console.log(k, v);

// Can use break in for...of
for (let n of [1,2,3,4,5]) {
  if (n === 3) break;
  console.log(n); // 1, 2
}

// forEach - no break allowed
[1, 2, 3].forEach((val, i) => console.log(\`[\${i}] = \${val}\`));`,
  },
  {
    q: "Closures",
    a: "A closure is a function that retains access to its outer lexical scope even after the outer function has returned. Foundation of data encapsulation, currying, and memoization.",
    code: `function outer() {
  let count = 0;
  return function inner() { return ++count; };
}
const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3

// Private variables via closure
function createBank(balance) {
  return {
    deposit: (n) => { balance += n; },
    withdraw: (n) => { balance -= n; },
    getBalance: () => balance,
  };
}
const acc = createBank(100);
acc.deposit(50);
acc.getBalance(); // 150

// Classic loop gotcha
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3,3,3 ❌
}
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0,1,2 ✅
}`,
  },
  {
    q: "Scope & Scope Chain",
    a: "Scope determines variable accessibility. JS has global, function, and block scope. The Scope Chain is the lookup hierarchy — JS walks up from current scope to global when a variable isn't found.",
    code: `const globalVar = "global";

function outer() {
  const outerVar = "outer";
  function inner() {
    const innerVar = "inner";
    console.log(innerVar);  // ✅ own scope
    console.log(outerVar);  // ✅ outer scope
    console.log(globalVar); // ✅ global scope
    console.log(unknown);   // ❌ ReferenceError
  }
  inner();
}

// Block scope
{
  let blockVar = "block";
  var funcVar = "function";
}
// console.log(blockVar); // ❌ ReferenceError
console.log(funcVar);     // ✅ var ignores blocks

// Lexical scoping
function init() {
  const name = "Alice";
  return function display() { console.log(name); };
}
init()(); // "Alice"`,
  },
];
