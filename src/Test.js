import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

// ─── Q&A Data with detailed answers and code snippets ────────
const qaData = [
  {
    q: "Hoisting",
    a: "Hoisting is JavaScript's default behavior of moving declarations to the top of their scope before code execution. var declarations are hoisted and initialized with undefined. let and const are hoisted but remain uninitialized (Temporal Dead Zone).",
    code: `// var hoisting
console.log(a); // undefined (not an error)
var a = 5;

// let/const hoisting - TDZ
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 10;

// Function hoisting - entire function is hoisted
greet(); // "Hello!" - works fine
function greet() {
  console.log("Hello!");
}

// Function expression - NOT hoisted
sayBye(); // TypeError: sayBye is not a function
var sayBye = function() {
  console.log("Bye!");
};`,
  },
  {
    q: "let, const, var",
    a: "var is function-scoped and can be re-declared and updated. let is block-scoped and cannot be re-declared in the same scope but can be updated. const is block-scoped, must be initialized at declaration, and cannot be reassigned (but object properties can be mutated).",
    code: `// var - function scoped
function testVar() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10 - accessible outside the if block
}

// let - block scoped
function testLet() {
  if (true) {
    let y = 20;
  }
  console.log(y); // ReferenceError: y is not defined
}

// const - block scoped, no reassignment
const PI = 3.14;
PI = 3; // TypeError: Assignment to constant variable

// But object mutation is allowed
const user = { name: "Alice" };
user.name = "Bob"; // ✅ allowed
user = {};         // ❌ TypeError`,
  },
  {
    q: "Temporal Dead Zone",
    a: "The Temporal Dead Zone (TDZ) is the period between entering a block scope and the point where a let or const variable is declared and initialized. Accessing the variable during this zone throws a ReferenceError.",
    code: `{
  // TDZ starts here for 'name'
  console.log(name); // ReferenceError: Cannot access 'name' before initialization

  let name = "Alice"; // TDZ ends here
  console.log(name); // "Alice"
}

// typeof does NOT save you in TDZ
console.log(typeof foo); // ReferenceError (let)
let foo = 1;

// var has NO TDZ
console.log(typeof bar); // "undefined" (safe)
var bar = 2;`,
  },
  {
    q: "JS Engine",
    a: "A JavaScript engine is a program that interprets and executes JavaScript code. Modern engines like V8 (Chrome/Node.js), SpiderMonkey (Firefox), and JavaScriptCore (Safari) use JIT (Just-In-Time) compilation to convert JS into optimized machine code at runtime.",
    code: `// JS Engine pipeline:
// Source Code → Parser → AST → Interpreter (Ignition)
//   → Bytecode → Profiler → Compiler (TurboFan) → Machine Code

// Example: V8 optimizes hot functions
function add(a, b) {
  return a + b;
}

// Called many times → V8 compiles it to optimized machine code
for (let i = 0; i < 1000000; i++) {
  add(i, i + 1);
}

// Deoptimization example - type change breaks optimization
function addMixed(a, b) {
  return a + b;
}
addMixed(1, 2);       // V8 assumes numbers
addMixed("a", "b");   // V8 deoptimizes (type changed)`,
  },
  {
    q: "JS Runtime Environment",
    a: "The JS Runtime Environment is the complete ecosystem where JavaScript runs. It includes the JS Engine (executes code), Web APIs (browser-provided features like setTimeout, fetch, DOM), the Call Stack, Memory Heap, Callback Queue, Microtask Queue, and the Event Loop.",
    code: `// JS Runtime components working together:

// 1. Call Stack - executes synchronous code
function main() {
  console.log("1. Sync start");

  // 2. Web API - setTimeout goes to browser API
  setTimeout(() => {
    console.log("4. Macro task (setTimeout)");
  }, 0);

  // 3. Microtask - Promise queued in microtask queue
  Promise.resolve().then(() => {
    console.log("3. Microtask (Promise)");
  });

  console.log("2. Sync end");
}

main();
// Output order:
// 1. Sync start
// 2. Sync end
// 3. Microtask (Promise)
// 4. Macro task (setTimeout)`,
  },
  {
    q: "Call Stack",
    a: "The Call Stack is a LIFO (Last In, First Out) data structure that tracks function execution. When a function is called, a new frame is pushed onto the stack. When it returns, the frame is popped. Stack overflow occurs when the stack exceeds its limit (e.g., infinite recursion).",
    code: `function third() {
  console.log("Inside third");
  // Stack: [main, second, third]
}

function second() {
  third();
  // Stack: [main, second]
}

function main() {
  second();
  // Stack: [main]
}

main(); // Stack: []

// Stack overflow example
function infinite() {
  return infinite(); // RangeError: Maximum call stack size exceeded
}
infinite();`,
  },
  {
    q: "Microtask Queue",
    a: "The Microtask Queue holds microtasks such as Promise callbacks (.then/.catch/.finally) and queueMicrotask(). Microtasks have higher priority than the Callback Queue — the event loop drains the entire microtask queue before moving to the next macrotask.",
    code: `console.log("Start");

setTimeout(() => console.log("Timeout"), 0);   // Macrotask

Promise.resolve()
  .then(() => console.log("Promise 1"))         // Microtask
  .then(() => console.log("Promise 2"));        // Microtask

queueMicrotask(() => console.log("queueMicrotask")); // Microtask

console.log("End");

// Output:
// Start
// End
// Promise 1
// queueMicrotask
// Promise 2
// Timeout  ← macrotask runs LAST`,
  },
  {
    q: "Callback Queue",
    a: "The Callback Queue (also called Macrotask Queue) stores callbacks from asynchronous Web APIs like setTimeout, setInterval, and DOM events. The event loop picks from this queue only when the call stack and microtask queue are both empty.",
    code: `// Macrotask examples: setTimeout, setInterval, I/O, UI events

setTimeout(() => console.log("setTimeout 1"), 0);
setTimeout(() => console.log("setTimeout 2"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("Sync");

// Output:
// Sync
// Promise       ← microtask runs first
// setTimeout 1  ← macrotask
// setTimeout 2  ← macrotask

// setInterval example
const id = setInterval(() => {
  console.log("tick");
}, 1000);

setTimeout(() => clearInterval(id), 3500); // stops after ~3 ticks`,
  },
  {
    q: "Event Loop",
    a: "The Event Loop continuously monitors the Call Stack and the task queues. If the Call Stack is empty, it first drains all microtasks, then picks one macrotask from the Callback Queue, executes it, then repeats. This is how JavaScript achieves non-blocking async behavior despite being single-threaded.",
    code: `// Event Loop pseudo-code:
// while (true) {
//   execute all synchronous code (call stack)
//   drain microtask queue completely
//   pick ONE macrotask from callback queue
//   repeat
// }

// Practical example:
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve()
  .then(() => {
    console.log("C");
    // Adding another microtask from inside a microtask
    return Promise.resolve();
  })
  .then(() => console.log("D"));

console.log("E");

// Output: A, E, C, D, B`,
  },
  {
    q: "Promise",
    a: "A Promise is an object representing the eventual completion or failure of an async operation. It has three states: pending, fulfilled, and rejected. Promises solve callback hell by allowing chaining with .then(), .catch(), and .finally().",
    code: `// Creating a Promise
const fetchData = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve({ id: 1, name: "Alice" });
  } else {
    reject(new Error("Failed to fetch"));
  }
});

// Consuming
fetchData
  .then(data => {
    console.log("Data:", data); // { id: 1, name: "Alice" }
    return data.name;
  })
  .then(name => console.log("Name:", name)) // "Alice"
  .catch(err => console.error("Error:", err))
  .finally(() => console.log("Done"));

// Real-world fetch example
fetch("https://api.example.com/users")
  .then(res => res.json())
  .then(users => console.log(users))
  .catch(err => console.error(err));`,
  },
  {
    q: "Async / Await",
    a: "async/await is syntactic sugar over Promises that makes async code look and behave like synchronous code. An async function always returns a Promise. await pauses execution inside the async function until the Promise settles, without blocking the main thread.",
    code: `// Promise-based vs Async/Await
// Promise version:
function getUser() {
  return fetch("/api/user")
    .then(res => res.json())
    .then(user => user.name);
}

// Async/Await version (cleaner):
async function getUser() {
  const res = await fetch("/api/user");
  const user = await res.json();
  return user.name;
}

// Error handling with try/catch
async function loadData() {
  try {
    const response = await fetch("https://api.example.com/data");
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Failed:", error.message);
  } finally {
    console.log("Request complete");
  }
}

// Parallel execution with async/await
async function parallel() {
  const [users, posts] = await Promise.all([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
  ]);
  console.log(users, posts);
}`,
  },
  {
    q: "Promise.all, allSettled, any, race",
    a: "These are static Promise combinators for handling multiple promises. Promise.all fails fast if any rejects. Promise.allSettled waits for all regardless of outcome. Promise.any resolves with the first fulfilled value. Promise.race resolves/rejects with whichever settles first.",
    code: `const p1 = Promise.resolve("A");
const p2 = Promise.resolve("B");
const p3 = Promise.reject("Error C");

// Promise.all - ALL must resolve
Promise.all([p1, p2])
  .then(values => console.log(values)); // ["A", "B"]

Promise.all([p1, p3])
  .catch(err => console.log(err)); // "Error C" (fails fast)

// Promise.allSettled - waits for all
Promise.allSettled([p1, p2, p3])
  .then(results => results.forEach(r => console.log(r)));
// { status: "fulfilled", value: "A" }
// { status: "fulfilled", value: "B" }
// { status: "rejected", reason: "Error C" }

// Promise.any - first fulfilled wins
Promise.any([p3, p1, p2])
  .then(val => console.log(val)); // "A"

// Promise.race - first settled wins
Promise.race([
  new Promise(res => setTimeout(() => res("slow"), 1000)),
  new Promise(res => setTimeout(() => res("fast"), 100)),
]).then(val => console.log(val)); // "fast"`,
  },
  {
    q: "Event Bubbling",
    a: "Event bubbling is the propagation of an event from the target element up through its ancestors to the root. By default, most DOM events bubble. You can stop bubbling using event.stopPropagation().",
    code: `// HTML structure: div > button
// Click on button → event bubbles up to div → document

document.querySelector("div").addEventListener("click", () => {
  console.log("DIV clicked"); // runs 2nd
});

document.querySelector("button").addEventListener("click", (e) => {
  console.log("BUTTON clicked"); // runs 1st
  // e.stopPropagation(); // would prevent DIV from firing
});

// Event Delegation using bubbling (efficient pattern)
document.querySelector("ul").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("Clicked item:", e.target.textContent);
  }
});
// One listener handles clicks on ALL <li> children`,
  },
  {
    q: "Event Capturing",
    a: "Event capturing (trickling) is the opposite of bubbling — the event starts at the root and travels down to the target. You opt into capturing mode by passing true (or { capture: true }) as the third argument to addEventListener.",
    code: `// Enable capturing with third arg = true
document.querySelector("div").addEventListener(
  "click",
  () => console.log("DIV - capturing phase"), // runs 1st
  true // capture: true
);

document.querySelector("button").addEventListener(
  "click",
  () => console.log("BUTTON - target phase") // runs 2nd
);

// Full flow for a button click:
// Capturing: document → html → body → div → button
// Target:    button
// Bubbling:  button → div → body → html → document

// Stop capturing propagation
document.addEventListener("click", (e) => {
  e.stopPropagation(); // prevents all further capturing/bubbling
}, true);`,
  },
  {
    q: "Pure Functions",
    a: "A pure function always returns the same output for the same inputs and has no side effects (doesn't modify external state, no I/O, no mutations). Pure functions are predictable, testable, and the foundation of functional programming.",
    code: `// ✅ Pure function - same input → same output, no side effects
function add(a, b) {
  return a + b;
}
add(2, 3); // always 5

// ✅ Pure - returns new array instead of mutating
function addItem(arr, item) {
  return [...arr, item];
}

// ❌ Impure - depends on external state
let total = 0;
function addToTotal(n) {
  total += n; // side effect: modifies external variable
  return total;
}

// ❌ Impure - random output
function getRandom() {
  return Math.random(); // different output each time
}

// ❌ Impure - I/O side effect
function logAndReturn(x) {
  console.log(x); // side effect
  return x;
}`,
  },
  {
    q: "Higher Order Functions",
    a: "A Higher Order Function (HOF) is a function that either takes one or more functions as arguments, or returns a function as its result. They enable powerful abstractions like map, filter, reduce, and function composition.",
    code: `// HOF that takes a function as argument
function applyTwice(fn, value) {
  return fn(fn(value));
}
applyTwice(x => x * 2, 3); // 12

// HOF that returns a function (closure / currying)
function multiplier(factor) {
  return (num) => num * factor;
}
const double = multiplier(2);
const triple = multiplier(3);
double(5); // 10
triple(5); // 15

// Built-in HOFs
const numbers = [1, 2, 3, 4, 5];

numbers.map(n => n * 2);           // [2, 4, 6, 8, 10]
numbers.filter(n => n % 2 === 0);  // [2, 4]
numbers.reduce((acc, n) => acc + n, 0); // 15

// Function composition
const compose = (f, g) => (x) => f(g(x));
const addOne = x => x + 1;
const square = x => x * x;
const addOneThenSquare = compose(square, addOne);
addOneThenSquare(4); // (4+1)² = 25`,
  },
  {
    q: "Prototype & Prototypal Inheritance",
    a: "Every JavaScript object has an internal [[Prototype]] link to another object. When you access a property, JS looks up the prototype chain until it finds it or reaches null. This is prototypal inheritance — objects inheriting directly from other objects.",
    code: `// Every object has a prototype
const animal = {
  breathe() { console.log("Breathing..."); }
};

const dog = Object.create(animal); // dog's prototype = animal
dog.bark = function() { console.log("Woof!"); };

dog.bark();    // "Woof!" - own method
dog.breathe(); // "Breathing..." - inherited from animal

// Prototype chain: dog → animal → Object.prototype → null

// Constructor function + prototype
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  console.log(\`Hi, I'm \${this.name}\`);
};

const alice = new Person("Alice");
alice.greet(); // "Hi, I'm Alice"
alice.hasOwnProperty("name");  // true
alice.hasOwnProperty("greet"); // false (on prototype)

// ES6 class is syntactic sugar over this
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
    a: "These are the three most common JavaScript error types. TypeError occurs when a value is not of the expected type. ReferenceError occurs when accessing an undeclared variable. SyntaxError occurs when the code structure is invalid and is caught at parse time.",
    code: `// TypeError - wrong type operation
null.toString();         // TypeError: Cannot read properties of null
undefined();             // TypeError: undefined is not a function
const x = 5;
x();                     // TypeError: x is not a function

// ReferenceError - variable not declared
console.log(foo);        // ReferenceError: foo is not defined
let bar;
console.log(baz);        // ReferenceError: baz is not defined

// TDZ also causes ReferenceError
console.log(myLet);      // ReferenceError (TDZ)
let myLet = 10;

// SyntaxError - invalid syntax (caught before execution)
// eval("if (true) {");  // SyntaxError: Unexpected end of input
// const 1abc = 5;       // SyntaxError: Invalid identifier

// Catching errors
try {
  null.toString();
} catch (e) {
  console.log(e instanceof TypeError); // true
  console.log(e.message); // "Cannot read properties of null"
}`,
  },
  {
    q: "Garbage Collector",
    a: "JavaScript uses automatic memory management via a Garbage Collector (GC). The most common algorithm is Mark-and-Sweep — the GC marks all reachable objects from roots (global, stack), then sweeps (frees) everything unreachable. V8 uses generational GC with young (Scavenger) and old (Major GC) generations.",
    code: `// Memory is automatically freed when no references remain

// Object created → allocated in heap
let user = { name: "Alice" };

// Reference reassigned → old object eligible for GC
user = null; // { name: "Alice" } can now be collected

// Circular references are handled by modern GC
function createCircle() {
  const a = {};
  const b = {};
  a.ref = b;
  b.ref = a;
  // Both go out of scope → GC collects them
}
createCircle();

// Memory leak examples (GC can't collect these):
// 1. Forgotten global variable
window.leak = { bigData: new Array(1000000) };

// 2. Forgotten event listener
const el = document.getElementById("btn");
el.addEventListener("click", handler);
// Fix: el.removeEventListener("click", handler);

// 3. Closure holding large scope
function outer() {
  const bigArray = new Array(1000000).fill(0);
  return function inner() { return bigArray[0]; };
}
const leak = outer(); // bigArray never freed`,
  },
  {
    q: "Memory Leak",
    a: "A memory leak occurs when memory that is no longer needed is not released, causing the application to consume more and more memory over time. Common causes include forgotten event listeners, global variables, closures holding large scopes, and uncleared timers.",
    code: `// 1. Global variable leak
function badFunction() {
  leakedVar = "I'm global!"; // no let/const/var → window.leakedVar
}

// 2. Forgotten timer
const intervalId = setInterval(() => {
  console.log("running...");
}, 1000);
// Fix:
clearInterval(intervalId);

// 3. Detached DOM node
let detachedDiv = document.createElement("div");
document.body.appendChild(detachedDiv);
document.body.removeChild(detachedDiv);
// detachedDiv still holds reference → memory not freed
detachedDiv = null; // Fix: clear the reference

// 4. Closure leak
function setupHandler() {
  const largeData = new Array(1000000).fill("data");
  document.getElementById("btn").addEventListener("click", function() {
    console.log(largeData[0]); // closure keeps largeData alive
  });
}

// 5. Event listener not removed
class Component {
  constructor() {
    this.handler = () => console.log("clicked");
    document.addEventListener("click", this.handler);
  }
  destroy() {
    document.removeEventListener("click", this.handler); // ✅ fix
  }
}`,
  },
  {
    q: "Web Workers",
    a: "Web Workers run JavaScript in background threads, separate from the main thread. They cannot access the DOM but can perform heavy computations without blocking the UI. Communication happens via postMessage and the onmessage event.",
    code: `// main.js
const worker = new Worker("worker.js");

// Send data to worker
worker.postMessage({ numbers: [1, 2, 3, 4, 5] });

// Receive result from worker
worker.onmessage = (event) => {
  console.log("Result from worker:", event.data);
};

worker.onerror = (err) => {
  console.error("Worker error:", err.message);
};

// Terminate when done
// worker.terminate();

// ─── worker.js ───────────────────────────────
self.onmessage = (event) => {
  const { numbers } = event.data;

  // Heavy computation (won't block UI)
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  const squared = numbers.map(n => n * n);

  self.postMessage({ sum, squared });
};
// Result: { sum: 15, squared: [1, 4, 9, 16, 25] }`,
  },
  {
    q: "CORS",
    a: "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts HTTP requests made from one origin (domain/port/protocol) to another. The server must include specific headers to allow cross-origin requests. CORS is enforced by the browser, not the server.",
    code: `// A request is cross-origin if any of these differ:
// Protocol (http vs https), Domain, Port

// Browser blocks this by default:
fetch("https://api.otherdomain.com/data") // cross-origin!
  .then(res => res.json());

// Server must respond with these headers:
// Access-Control-Allow-Origin: https://yourdomain.com
// Access-Control-Allow-Methods: GET, POST, PUT
// Access-Control-Allow-Headers: Content-Type, Authorization

// Preflight request (OPTIONS) is sent for:
// - Methods: PUT, DELETE, PATCH
// - Custom headers
// - Content-Type: application/json

// Node.js / Express CORS setup:
const cors = require("cors");
app.use(cors({
  origin: "https://yourdomain.com",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Credentials (cookies) need:
fetch(url, { credentials: "include" });
// + server header: Access-Control-Allow-Credentials: true`,
  },
  {
    q: "Primitive vs Non-Primitive Data Types",
    a: "Primitives are immutable values stored directly on the stack, copied by value. Non-primitives (objects, arrays, functions) are stored on the heap; variables hold a reference to the memory location. This distinction affects how assignment and comparison work.",
    code: `// ── Primitives (copied by value) ──────────────────
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (unchanged)

// Primitives: Number, String, Boolean, null,
//             undefined, Symbol, BigInt

const sym1 = Symbol("id");
const sym2 = Symbol("id");
sym1 === sym2; // false - always unique

const big = 9007199254740991n; // BigInt

// ── Non-Primitives (copied by reference) ──────────
let obj1 = { name: "Alice" };
let obj2 = obj1;       // same reference
obj2.name = "Bob";
console.log(obj1.name); // "Bob" - obj1 also changed!

// Deep copy to avoid mutation
const copy = JSON.parse(JSON.stringify(obj1));
// or: const copy = structuredClone(obj1); // modern

// Array reference behavior
const arr1 = [1, 2, 3];
const arr2 = arr1;
arr2.push(4);
console.log(arr1); // [1, 2, 3, 4] - both changed!

// Comparison
console.log({} === {}); // false (different references)
console.log("hi" === "hi"); // true (same primitive value)`,
  },
  {
    q: "Local Storage, Session Storage & Cookies",
    a: "All three are client-side storage mechanisms but differ in persistence, capacity, and how they're sent to the server. localStorage persists until cleared. sessionStorage clears on tab close. Cookies have expiry dates and are sent with every HTTP request.",
    code: `// ── localStorage ──────────────────────────────────
localStorage.setItem("user", JSON.stringify({ name: "Alice" }));
const user = JSON.parse(localStorage.getItem("user"));
localStorage.removeItem("user");
localStorage.clear();
// Persists across sessions | ~5-10MB | Not sent to server

// ── sessionStorage ─────────────────────────────────
sessionStorage.setItem("token", "abc123");
const token = sessionStorage.getItem("token");
// Cleared on tab/browser close | ~5MB | Not sent to server

// ── Cookies ────────────────────────────────────────
// Set cookie with expiry
document.cookie = "username=Alice; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";

// HttpOnly cookies (set by server, can't access via JS):
// Set-Cookie: session=xyz; HttpOnly; Secure; SameSite=Strict

// Read cookies
const cookies = document.cookie; // "username=Alice; theme=dark"

// ── Comparison ─────────────────────────────────────
// Feature      | localStorage | sessionStorage | Cookie
// Capacity     | ~5-10MB      | ~5MB           | ~4KB
// Expiry       | Never        | Tab close      | Custom
// Sent to srvr | No           | No             | Yes (every req)
// Accessible   | JS           | JS             | JS + Server`,
  },
  {
    q: "for...in, for...of, forEach",
    a: "for...in iterates over enumerable property keys of an object. for...of iterates over values of any iterable (arrays, strings, Maps, Sets). forEach is an Array method that executes a callback for each element — it cannot be broken out of with break.",
    code: `// ── for...in (object keys) ────────────────────────
const person = { name: "Alice", age: 25, city: "Paris" };
for (let key in person) {
  console.log(key, ":", person[key]);
}
// name : Alice  |  age : 25  |  city : Paris

// ⚠️ Avoid for...in on arrays (iterates prototype too)
Array.prototype.custom = () => {};
const arr = [1, 2, 3];
for (let i in arr) console.log(i); // "0", "1", "2", "custom" ⚠️

// ── for...of (iterable values) ────────────────────
for (let val of [10, 20, 30]) console.log(val); // 10, 20, 30
for (let char of "hello") console.log(char);     // h, e, l, l, o

const map = new Map([["a", 1], ["b", 2]]);
for (let [key, val] of map) console.log(key, val);

// ✅ Can use break/continue in for...of
for (let n of [1, 2, 3, 4, 5]) {
  if (n === 3) break; // exits loop
  console.log(n); // 1, 2
}

// ── forEach (array method) ────────────────────────
[1, 2, 3].forEach((val, index) => {
  console.log(\`[\${index}] = \${val}\`);
});
// ❌ Cannot break or return out of forEach
// ❌ Returns undefined`,
  },
  {
    q: "Closures",
    a: "A closure is a function that retains access to its outer lexical scope even after the outer function has returned. Closures are the foundation of data encapsulation, currying, memoization, and many design patterns in JavaScript.",
    code: `// Basic closure
function outer() {
  let count = 0; // enclosed variable
  return function inner() {
    count++;
    return count;
  };
}
const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3 - count persists!

// Practical: private variables
function createBank(initialBalance) {
  let balance = initialBalance; // private!
  return {
    deposit: (n) => { balance += n; },
    withdraw: (n) => { balance -= n; },
    getBalance: () => balance,
  };
}
const account = createBank(100);
account.deposit(50);
account.getBalance(); // 150
// account.balance → undefined (truly private)

// Closure in loops (classic gotcha)
// ❌ Wrong - all share same i
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3
}

// ✅ Fix with let (block-scoped)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2
}`,
  },
  {
    q: "Scope & Scope Chain",
    a: "Scope determines where variables are accessible. JavaScript has global, function, and block scope. The Scope Chain is the hierarchy of scopes — when a variable is not found in the current scope, JS walks up the chain to outer scopes until global scope.",
    code: `// Global scope
const globalVar = "I'm global";

function outer() {
  const outerVar = "I'm outer";

  function inner() {
    const innerVar = "I'm inner";

    // Scope chain lookup:
    console.log(innerVar);  // ✅ own scope
    console.log(outerVar);  // ✅ outer scope
    console.log(globalVar); // ✅ global scope
    console.log(unknown);   // ❌ ReferenceError
  }

  inner();
  // console.log(innerVar); // ❌ not accessible
}

// Block scope with let/const
{
  let blockVar = "block";
  var funcVar = "function";
}
// console.log(blockVar); // ❌ ReferenceError
console.log(funcVar);     // ✅ "function" (var ignores blocks)

// Lexical scoping - scope defined at write time, not call time
function init() {
  const name = "Alice";
  function display() {
    console.log(name); // "Alice" - lexically scoped
  }
  return display;
}
init()(); // "Alice"`,
  },
];

// ─── Editable Code Block ─────────────────────────────────────
function CodeBlock({ initialCode }) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="code-block">
      <div className="code-toolbar">
        <span className="code-label">JS</span>
        <button className="code-btn" onClick={handleCopy}>
          {copied ? "✅ Copied" : "📋 Copy"}
        </button>
      </div>
      <textarea
        className="code-editor"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        rows={code.split("\n").length + 1}
      />
    </div>
  );
}

// ─── Accordion Item ──────────────────────────────────────────
function AccordionItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`accordion-item ${open ? "open" : ""}`}>
      <button className="accordion-question" onClick={() => setOpen(!open)}>
        <span className="q-number">Q{index + 1}</span>
        <span className="q-text">{item.q}</span>
        <span className="q-arrow">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="accordion-answer">
          <p className="answer-text">{item.a}</p>
          {item.code && <CodeBlock initialCode={item.code} />}
        </div>
      )}
    </div>
  );
}

// ─── Q&A Page ────────────────────────────────────────────────
function QAPage() {
  const [search, setSearch] = useState("");
  const filtered = qaData.filter((item) =>
    item.q.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="qa-page">
      <h1 className="qa-title">JavaScript Interview Q&A</h1>
      <p className="qa-subtitle">
        Click any question to reveal a detailed answer + code example
      </p>
      <input
        className="qa-search"
        placeholder="🔍 Search topics..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="accordion">
        {filtered.length > 0 ? (
          filtered.map((item, i) => (
            <AccordionItem key={item.q} item={item} index={i} />
          ))
        ) : (
          <p className="no-results">No topics found for "{search}"</p>
        )}
      </div>
    </div>
  );
}

// ─── Logic Functions ─────────────────────────────────────────
function findMinMax(arr) {
  return { min: Math.min(...arr), max: Math.max(...arr) };
}
function findRepeatedWords(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g);
  const map = {};
  words.forEach((w) => (map[w] = (map[w] || 0) + 1));
  return Object.entries(map)
    .filter(([, c]) => c > 1)
    .map(([w, c]) => `${w} (${c} times)`);
}
function encodeString(str) {
  const words = str.split(" ");
  const map = {},
    encoded = [];
  let idx = 1;
  words.forEach((w) => {
    if (!map[w]) map[w] = idx++;
    encoded.push(map[w]);
  });
  return { encoded: encoded.join(" "), map };
}
function decodeString(encodedStr, map) {
  const rev = {};
  for (let k in map) rev[map[k]] = k;
  return encodedStr
    .split(" ")
    .map((n) => rev[n])
    .join(" ");
}

// ─── Demo Sections ───────────────────────────────────────────
function MinMaxSection() {
  const [result, setResult] = useState("");
  return (
    <div className="section">
      <h2>Find Min & Max</h2>
      <button
        onClick={() => {
          const { min, max } = findMinMax([5, 10, 2, 8, 20, 1]);
          setResult(`Array: [5,10,2,8,20,1] | Min: ${min}, Max: ${max}`);
        }}
      >
        Run
      </button>
      <div className="output">{result}</div>
    </div>
  );
}
function RepeatedWordsSection() {
  const [text, setText] = useState(
    "This is a test. This test is simple. Simple test example."
  );
  const [result, setResult] = useState("");
  return (
    <div className="section">
      <h2>Find Repeated Words</h2>
      <textarea
        rows={4}
        cols={50}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button
        onClick={() =>
          setResult(findRepeatedWords(text).join(", ") || "No repeated words")
        }
      >
        Find
      </button>
      <div className="output">{result}</div>
    </div>
  );
}
function EncodeDecodeSection() {
  const [text, setText] = useState("hello world hello");
  const [output, setOutput] = useState("");
  const [gMap, setGMap] = useState({});
  const [gEncoded, setGEncoded] = useState("");
  return (
    <div className="section">
      <h2>Encode / Decode String</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button
        onClick={() => {
          const { encoded, map } = encodeString(text);
          setGMap(map);
          setGEncoded(encoded);
          setOutput(`Encoded: ${encoded}`);
        }}
      >
        Encode
      </button>
      <button
        onClick={() => {
          if (!gEncoded) {
            setOutput("Please encode first!");
            return;
          }
          setOutput(`Decoded: ${decodeString(gEncoded, gMap)}`);
        }}
      >
        Decode
      </button>
      <div className="output">{output}</div>
    </div>
  );
}
function HomePage() {
  return (
    <>
      <h1>JavaScript Functions Demo</h1>
      <MinMaxSection />
      <RepeatedWordsSection />
      <EncodeDecodeSection />
    </>
  );
}

// ─── Navbar ──────────────────────────────────────────────────
function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar">
      <span className="nav-brand">⚡ JS Demo</span>
      <div className="nav-links">
        <Link
          to="/"
          className={location.pathname === "/" ? "nav-link active" : "nav-link"}
        >
          Home
        </Link>
        <Link
          to="/qa"
          className={
            location.pathname === "/qa" ? "nav-link active" : "nav-link"
          }
        >
          Q&A
        </Link>
      </div>
    </nav>
  );
}

// ─── App ─────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Syne:wght@400;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Syne', sans-serif; background: white; color: #e8e8e8; min-height: 100vh; }

        .navbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 40px; background: #111; border-bottom: 1px solid #222; position: sticky; top: 0; z-index: 100; }
        .nav-brand { font-size: 1.2rem; font-weight: 800; color: #f0c040; letter-spacing: 1px; }
        .nav-links { display: flex; gap: 12px; }
        .nav-link { text-decoration: none; color: #888; font-weight: 600; padding: 8px 20px; border-radius: 6px; border: 1px solid transparent; transition: all 0.2s; font-size: 0.95rem; }
        .nav-link:hover { color: #f0c040; border-color: #f0c040; }
        .nav-link.active { color: #0d0d0d; background: #f0c040; border-color: #f0c040; }

        h1 { color: #f0c040; margin: 30px 40px 20px; font-size: 1.8rem; }
        .section { background: #1a1a1a; padding: 20px 24px; margin: 0 40px 20px; border-radius: 10px; border: 1px solid #2a2a2a; }
        .section h2 { color: #ccc; font-size: 1rem; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px; }
        input, textarea { background: #111; border: 1px solid #333; color: #e8e8e8; padding: 8px 12px; border-radius: 6px; font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; width: 100%; max-width: 480px; }
        button { margin-top: 10px; margin-right: 8px; padding: 8px 18px; background: #f0c040; color: #0d0d0d; border: none; border-radius: 6px; font-weight: 700; cursor: pointer; font-family: 'Syne', sans-serif; transition: opacity 0.2s; }
        button:hover { opacity: 0.85; }
        .output { margin-top: 12px; font-family: 'JetBrains Mono', monospace; font-size: 0.88rem; color: #f0c040; }

        /* Q&A Page */
        .qa-page { padding: 40px; max-width: 900px; margin: 0 auto; }
        .qa-title { color: #f0c040; font-size: 2rem; font-weight: 800; margin-bottom: 6px; }
        .qa-subtitle { color: #555; font-size: 0.9rem; margin-bottom: 20px; font-family: 'JetBrains Mono', monospace; }
        .qa-search { display: block; width: 100%; max-width: 100%; padding: 12px 16px; margin-bottom: 28px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: #e8e8e8; font-size: 1rem; font-family: 'Syne', sans-serif; outline: none; transition: border-color 0.2s; }
        .qa-search:focus { border-color: #f0c040; }
        .no-results { color: #555; font-family: 'JetBrains Mono', monospace; padding: 20px 0; }

        /* Accordion */
        .accordion { display: flex; flex-direction: column; gap: 10px; }
        .accordion-item { border: 1px solid #222; border-radius: 10px; overflow: hidden; transition: border-color 0.2s; }
        .accordion-item:hover { border-color: #f0c04055; }
        .accordion-item.open { border-color: #f0c040; }
        .accordion-question { margin-top:0; width: 100%; display: flex; align-items: center; gap: 14px; padding: 16px 20px; background: #1a1a1a; border: none; color: #e8e8e8; cursor: pointer; text-align: left; font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 600; transition: background 0.2s; }
        .accordion-question:hover { background: #222; }
        .accordion-item.open .accordion-question { background: #1f1a00; color: #f0c040; }
        .q-number { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #f0c040; background: #2a2200; padding: 3px 8px; border-radius: 4px; white-space: nowrap; min-width: 42px; text-align: center; }
        .q-text { flex: 1; }
        .q-arrow { font-size: 0.75rem; color: #555; }
        .accordion-item.open .q-arrow { color: #f0c040; }

        /* Answer area */
        .accordion-answer { padding: 20px 24px; background: #111; border-top: 1px solid #222; animation: slideDown 0.2s ease; }
        .answer-text { color: #aaa; font-size: 0.95rem; line-height: 1.75; margin-bottom: 16px; }

        /* Code Block */
        .code-block { border-radius: 8px; overflow: hidden; border: 1px solid #2a2a2a; }
        .code-toolbar { display: flex; align-items: center; justify-content: space-between; padding: 8px 14px; background: #1a1a1a; border-bottom: 1px solid #2a2a2a; }
        .code-label { font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #f0c040; background: #2a2200; padding: 2px 8px; border-radius: 4px; }
        .code-btn { margin: 0; padding: 4px 12px; font-size: 0.78rem; background: #2a2a2a; color: #ccc; border: 1px solid #444; border-radius: 5px; font-family: 'JetBrains Mono', monospace; cursor: pointer; transition: all 0.2s; }
        .code-btn:hover { background: #333; color: #f0c040; border-color: #f0c040; opacity: 1; }
        .code-editor { width: 100%; padding: 16px; background: #0d0d0d; color: #a8d8a8; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; line-height: 1.65; border: none; outline: none; resize: vertical; min-height: 120px; }

        @keyframes slideDown { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 600px) {
          .navbar { padding: 12px 20px; }
          h1, .section { margin-left: 16px; margin-right: 16px; }
          .qa-page { padding: 20px 16px; }
        }
      `}</style>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/qa" element={<QAPage />} />
      </Routes>
    </>
  );
}
