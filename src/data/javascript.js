export const meta = {
  id: "javascript",
  label: "JavaScript",
  icon: "⚡",
  color: "#f0c040",
  desc: "The language of the web. Core concepts every developer must master.",
};

export const qaData = [
  {
    q: "What is a JS Engine?",
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
    q: "what is a JS Runtime Environment?",
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
    q: "What is the Call Stack?",
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
    q: "what is Callback Queue?",
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
    q: "what is the Event Loop in JS?",
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
    q: "what is a Promise?",
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
    q: "what is Async / Await?",
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
    q: "what are Promise.all, allSettled, any, race?",
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
    q: "what is Event Bubbling?",
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
    q: "what is Event Capturing?",
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
    q: "what are Pure Functions?",
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
    q: "what are Higher Order Functions?",
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
    q: "what is Prototype & Prototypal Inheritance?",
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
    q: "what are TypeError, ReferenceError, SyntaxError?",
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
    q: "what is the Garbage Collector?",
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
    q: "what is a Memory Leak?",
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
    q: "what are Web Workers?",
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
    q: "what is CORS?",
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
    q: "what are Primitive vs Non-Primitive Data Types?",
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
    q: "what are Local Storage, Session Storage & Cookies?",
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
    q: "what are for...in, for...of, forEach?",
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
    q: "what are Closures?",
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
    q: "what is Scope & Scope Chain?",
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
  
  // ─── BEGINNER ────────────────────────────────────────────
  {
    q: "What are the different data types in JavaScript?",
    a: "JavaScript has 7 primitive types: String, Number, BigInt, Boolean, Undefined, Null, Symbol — and 1 non-primitive: Object (which includes Arrays and Functions). Primitives are immutable and stored by value. Objects are stored by reference on the heap.",
    code: `// Primitives
let str    = "hello";           // String
let num    = 42;                // Number
let big    = 9007199254740991n; // BigInt
let bool   = true;              // Boolean
let undef  = undefined;         // Undefined
let empty  = null;              // Null
let sym    = Symbol("id");      // Symbol

// Non-primitive
let obj  = { name: "Alice" };   // Object
let arr  = [1, 2, 3];           // Array (type of object)
let fn   = function() {};       // Function (type of object)

// typeof
typeof "hi";        // "string"
typeof 42;          // "number"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof null;        // "object" ← famous JS bug
typeof [];          // "object"
typeof function(){}; // "function"
typeof Symbol();    // "symbol"
typeof 42n;         // "bigint"`,
  },
  {
    q: "What is the difference between == and ===?",
    a: "== is the loose equality operator — it performs type coercion before comparing. === is the strict equality operator — it checks both value and type with no coercion. Always prefer === to avoid unexpected bugs.",
    code: `// == (loose) - coerces types first
0   == false   // true  (false → 0)
1   == "1"     // true  ("1" → 1)
null == undefined // true (special case)
[]  == false   // true  ([] → "" → 0, false → 0)
""  == false   // true

// === (strict) - no coercion
0   === false  // false (different types)
1   === "1"    // false (different types)
null === undefined // false
[]  === false  // false

// Common gotcha
console.log(null == undefined);  // true
console.log(null === undefined); // false

// NaN is never equal to itself
NaN == NaN;  // false
NaN === NaN; // false
Number.isNaN(NaN); // true ← correct way`,
  },
  {
    q: "What is var, let, and const?",
    a: "var is function-scoped, hoisted with undefined, and can be re-declared. let is block-scoped, hoisted but in TDZ, cannot be re-declared. const is block-scoped, must be initialized, cannot be reassigned — but object properties can still be mutated.",
    code: `// var - function scoped
function testVar() {
  if (true) {
    var x = 10; // scoped to function, not block
  }
  console.log(x); // 10 ✅
}

// let - block scoped
function testLet() {
  if (true) {
    let y = 20;
  }
  console.log(y); // ReferenceError ❌
}

// const - block scoped, no reassign
const PI = 3.14;
PI = 3; // TypeError ❌

// But object/array mutation is allowed
const user = { name: "Alice" };
user.name = "Bob";   // ✅ mutating property
user = {};           // ❌ reassigning reference

const nums = [1, 2];
nums.push(3);        // ✅ [1, 2, 3]
nums = [];           // ❌ TypeError`,
  },
  {
    q: "What is hoisting in JavaScript?",
    a: "Hoisting is JavaScript's behavior of moving declarations to the top of their scope during the compile phase. var declarations are hoisted and initialized with undefined. Function declarations are fully hoisted. let/const are hoisted but placed in the Temporal Dead Zone.",
    code: `// var hoisting
console.log(a); // undefined (not ReferenceError)
var a = 5;
// JS sees it as:
// var a;           ← hoisted
// console.log(a);  ← undefined
// a = 5;

// Function declaration - fully hoisted
greet(); // "Hello!" ✅
function greet() { console.log("Hello!"); }

// Function expression - only var is hoisted
sayBye(); // TypeError: sayBye is not a function
var sayBye = function() { console.log("Bye!"); };

// let/const - hoisted but TDZ
console.log(b); // ReferenceError: Cannot access before init
let b = 10;

// Class - also in TDZ
const obj = new MyClass(); // ReferenceError
class MyClass {}`,
  },
  {
    q: "What is the Temporal Dead Zone (TDZ)?",
    a: "The TDZ is the period between entering a block scope and the point where a let or const variable is declared. During this time the variable exists in scope but cannot be accessed — doing so throws a ReferenceError.",
    code: `// TDZ demonstration
{
  // TDZ starts for 'name' here ↓
  console.log(name); // ReferenceError ❌
  // TDZ ends here ↓
  let name = "Alice";
  console.log(name); // "Alice" ✅
}

// typeof is NOT safe inside TDZ for let/const
console.log(typeof foo); // ReferenceError ❌
let foo = 1;

// typeof IS safe for truly undeclared vars
console.log(typeof bar); // "undefined" ✅ (bar never declared)

// var has no TDZ
console.log(typeof baz); // "undefined" ✅
var baz = 2;

// Function parameters also have TDZ with defaults
function test(a = b, b = 1) {} // ReferenceError
test(); // b is in TDZ when a's default is evaluated`,
  },
  {
    q: "What are truthy and falsy values?",
    a: "In JavaScript, every value has an inherent boolean meaning. Falsy values are coerced to false in boolean context. There are exactly 6 falsy values: false, 0, '' (empty string), null, undefined, NaN. Everything else is truthy.",
    code: `// The 6 falsy values
Boolean(false);     // false
Boolean(0);         // false
Boolean(-0);        // false
Boolean(0n);        // false (BigInt zero)
Boolean("");        // false
Boolean(null);      // false
Boolean(undefined); // false
Boolean(NaN);       // false

// Everything else is truthy
Boolean("0");       // true  ← "0" is truthy!
Boolean([]);        // true  ← empty array is truthy!
Boolean({});        // true  ← empty object is truthy!
Boolean(-1);        // true
Boolean("false");   // true

// Practical usage
const name = "";
const display = name || "Anonymous"; // "Anonymous"

const user = null;
if (user) {
  console.log(user.name); // skipped safely
}

// Nullish coalescing (??) only falsy on null/undefined
const val = 0 ?? "default"; // 0 (not "default"!)
const val2 = 0 || "default"; // "default"`,
  },
  {
    q: "What is type coercion in JavaScript?",
    a: "Type coercion is JavaScript's automatic or implicit conversion of a value from one type to another. It happens in comparisons (==), arithmetic (+, -, *), and boolean contexts. Understanding it prevents subtle bugs.",
    code: `// String coercion with +
"5" + 3;       // "53" (3 becomes string)
"5" + true;    // "5true"
"5" + null;    // "5null"

// Numeric coercion with -, *, /
"5" - 3;       // 2 (string becomes number)
"5" * "2";     // 10
true + true;   // 2
false + 1;     // 1
null + 1;      // 1
undefined + 1; // NaN

// Comparison coercion
"5" > 3;       // true ("5" → 5)
null > 0;      // false
null == 0;     // false  ← special rule
null >= 0;     // true   ← inconsistent!
undefined > 0; // false
undefined < 0; // false
undefined == 0;// false

// Explicit conversion (always prefer this)
Number("42");    // 42
Number(true);    // 1
Number(null);    // 0
Number("");      // 0
Number("hello"); // NaN
String(42);      // "42"
Boolean(1);      // true`,
  },
  {
    q: "What are arrow functions and how do they differ from regular functions?",
    a: "Arrow functions have a shorter syntax and do not have their own 'this', 'arguments', 'super', or 'new.target'. They cannot be used as constructors. Their 'this' is lexically inherited from the surrounding scope.",
    code: `// Regular function
function add(a, b) { return a + b; }

// Arrow function
const add = (a, b) => a + b;

// Single param - parens optional
const double = n => n * 2;

// No params - parens required
const greet = () => "Hello!";

// Multi-line - needs braces + return
const process = (x) => {
  const result = x * 2;
  return result + 1;
};

// 'this' difference - KEY distinction
function Timer() {
  this.seconds = 0;

  // ❌ Regular function - 'this' is undefined/window
  setInterval(function() {
    this.seconds++; // 'this' is wrong here
  }, 1000);

  // ✅ Arrow function - 'this' is the Timer instance
  setInterval(() => {
    this.seconds++; // 'this' is correctly Timer
  }, 1000);
}

// Arrow functions cannot be constructors
const Person = (name) => { this.name = name; };
new Person("Alice"); // TypeError: Person is not a constructor`,
  },
  {
    q: "What is the difference between null and undefined?",
    a: "undefined means a variable has been declared but not assigned a value — it's the default state. null is an intentional assignment representing 'no value'. Both are falsy and loosely equal to each other, but strictly not equal.",
    code: `// undefined - default uninitialized state
let x;
console.log(x); // undefined

function greet(name) {
  console.log(name); // undefined if not passed
}
greet();

const obj = { a: 1 };
console.log(obj.b); // undefined (property doesn't exist)

// null - intentional absence of value
let user = null; // deliberately empty

// Comparison
null == undefined;  // true  (loose)
null === undefined; // false (strict)

typeof null;      // "object" (historical bug)
typeof undefined; // "undefined"

// Nullish coalescing
const a = null ?? "default";      // "default"
const b = undefined ?? "default"; // "default"
const c = 0 ?? "default";         // 0 (0 is not null/undefined)

// Optional chaining
const user2 = null;
console.log(user2?.name); // undefined (no error)`,
  },
  {
    q: "What are template literals?",
    a: "Template literals use backticks and allow embedded expressions with ${}, multi-line strings, and tagged templates. They are cleaner than string concatenation and support any JavaScript expression inside ${}.",
    code: `// Basic interpolation
const name = "Alice";
const age = 25;
console.log(\`Hello, \${name}! You are \${age} years old.\`);

// Expressions inside \${}
console.log(\`2 + 2 = \${2 + 2}\`);
console.log(\`Today: \${new Date().toLocaleDateString()}\`);
console.log(\`\${age >= 18 ? "Adult" : "Minor"}\`);

// Multi-line strings
const html = \`
  <div>
    <h1>\${name}</h1>
    <p>Age: \${age}</p>
  </div>
\`;

// Tagged templates (advanced)
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) =>
    acc + str + (values[i] ? \`<mark>\${values[i]}</mark>\` : ""), "");
}
const result = highlight\`Hello \${name}, you are \${age}!\`;
// "Hello <mark>Alice</mark>, you are <mark>25</mark>!"

// Raw strings
console.log(String.raw\`Hello\\nWorld\`); // "Hello\\nWorld" (no newline)`,
  },
  // ─── INTERMEDIATE ─────────────────────────────────────────
  {
    q: "What is a closure and how is it used?",
    a: "A closure is a function that retains access to its lexical scope even after the outer function has finished executing. Closures power data encapsulation, currying, memoization, and the module pattern.",
    code: `// Basic closure
function makeCounter(start = 0) {
  let count = start;
  return {
    increment: () => ++count,
    decrement: () => --count,
    reset:     () => { count = start; },
    value:     () => count,
  };
}
const counter = makeCounter(10);
counter.increment(); // 11
counter.increment(); // 12
counter.value();     // 12
// count is private — not accessible from outside ✅

// Closure for private state
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  return {
    deposit:  (n) => { balance += n; return balance; },
    withdraw: (n) => {
      if (n > balance) throw new Error("Insufficient funds");
      balance -= n;
      return balance;
    },
    getBalance: () => balance,
  };
}

// Loop closure gotcha
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3,3,3 ❌
}
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0,1,2 ✅
}
// Fix with var using IIFE:
for (var i = 0; i < 3; i++) {
  ((j) => setTimeout(() => console.log(j), 100))(i); // 0,1,2`,
  },
  {
    q: "Explain the prototype chain and prototypal inheritance.",
    a: "Every JS object has an internal [[Prototype]] link to another object. When a property isn't found on the object, JS walks up the chain until null is reached. ES6 classes are syntactic sugar over this prototype mechanism.",
    code: `// Object.create - explicit prototype chain
const animal = {
  breathe() { return \`\${this.name} is breathing\`; },
};
const dog = Object.create(animal);
dog.name = "Rex";
dog.bark = function() { return "Woof!"; };

dog.bark();    // "Woof!" - own method
dog.breathe(); // "Rex is breathing" - from prototype
// Chain: dog → animal → Object.prototype → null

// Constructor function style
function Person(name, age) {
  this.name = name;
  this.age  = age;
}
Person.prototype.greet = function() {
  return \`Hi, I'm \${this.name}\`;
};

const alice = new Person("Alice", 25);
alice.greet();                    // "Hi, I'm Alice"
alice.hasOwnProperty("name");     // true
alice.hasOwnProperty("greet");    // false (on prototype)

// ES6 class - same thing, cleaner syntax
class Animal {
  constructor(name) { this.name = name; }
  speak() { return \`\${this.name} makes a sound\`; }
}
class Dog extends Animal {
  speak() { return \`\${this.name} barks\`; } // override
  fetch() { return "Fetching!"; }
}
const d = new Dog("Rex");
d.speak();                  // "Rex barks"
d instanceof Dog;           // true
d instanceof Animal;        // true`,
  },
  {
    q: "What is 'this' keyword and how does it work?",
    a: "'this' refers to the object that is currently executing the function. Its value depends on how the function is called — not where it is defined (except arrow functions, which inherit 'this' lexically).",
    code: `// 1. Global context
console.log(this); // window (browser) / {} (Node module)

// 2. Object method - 'this' = the object
const user = {
  name: "Alice",
  greet() { return \`Hi, I'm \${this.name}\`; }
};
user.greet(); // "Hi, I'm Alice"

// 3. Regular function - 'this' = undefined (strict) / window
function show() { console.log(this); }
show(); // undefined in strict mode

// 4. Arrow function - lexical 'this'
const obj = {
  name: "Bob",
  greet: () => \`Hi, I'm \${this.name}\`, // 'this' is outer scope!
};
obj.greet(); // "Hi, I'm undefined"

// 5. call / apply / bind - explicit binding
function intro(city, country) {
  return \`\${this.name} from \${city}, \${country}\`;
}
const person = { name: "Carol" };
intro.call(person, "Paris", "France");    // immediate call
intro.apply(person, ["Paris", "France"]); // same, array args
const bound = intro.bind(person, "Paris");
bound("France"); // creates new function

// 6. new keyword - 'this' = new object
function Car(model) { this.model = model; }
const car = new Car("Tesla"); // this = new Car instance`,
  },
  {
    q: "What is the event loop and how does async JavaScript work?",
    a: "JavaScript is single-threaded but non-blocking thanks to the event loop. The call stack runs sync code. Web APIs handle async tasks. Microtasks (Promises) drain completely before macrotasks (setTimeout). The event loop coordinates all of this.",
    code: `// Execution order
console.log("1 - sync");

setTimeout(() => console.log("5 - macrotask"), 0);

Promise.resolve()
  .then(() => console.log("3 - microtask 1"))
  .then(() => console.log("4 - microtask 2"));

queueMicrotask(() => console.log("3a - microtask"));

console.log("2 - sync");

// Output: 1 → 2 → 3 → 3a → 4 → 5

// Why? Event loop algorithm:
// 1. Execute all synchronous code (call stack)
// 2. Drain entire microtask queue (Promises, queueMicrotask)
// 3. Pick ONE macrotask (setTimeout, setInterval, I/O)
// 4. Repeat from step 2

// Practical: async/await under the hood
async function fetchUser() {
  console.log("A"); // sync
  const data = await fetch("/api/user"); // yields here
  console.log("C"); // runs after fetch resolves
}
fetchUser();
console.log("B"); // runs before "C"
// Output: A → B → C`,
  },
  {
    q: "What are Promises and how do they work?",
    a: "A Promise is an object representing the eventual completion or failure of an async operation. It has 3 states: pending, fulfilled, rejected. Promises solve callback hell through chaining. Promise combinators handle multiple promises.",
    code: `// Creating a Promise
const fetchUser = (id) => new Promise((resolve, reject) => {
  if (id <= 0) {
    reject(new Error("Invalid ID"));
    return;
  }
  setTimeout(() => resolve({ id, name: "Alice" }), 500);
});

// Consuming: .then / .catch / .finally
fetchUser(1)
  .then(user  => { console.log(user); return user.name; })
  .then(name  => console.log("Name:", name))
  .catch(err  => console.error("Error:", err.message))
  .finally(()  => console.log("Done"));

// Promise combinators
const p1 = Promise.resolve("A");
const p2 = new Promise(r => setTimeout(() => r("B"), 100));
const p3 = Promise.reject("Error");

// all: fails fast if any reject
Promise.all([p1, p2]).then(console.log); // ["A","B"]
Promise.all([p1, p3]).catch(console.error); // "Error"

// allSettled: waits for all regardless
Promise.allSettled([p1, p2, p3]).then(results =>
  results.forEach(r => console.log(r.status, r.value ?? r.reason))
);

// any: first fulfilled
Promise.any([p3, p1, p2]).then(console.log); // "A"

// race: first settled (fulfilled OR rejected)
Promise.race([p2, p1]).then(console.log); // "A" (resolves first)`,
  },
  {
    q: "What is async/await and how does error handling work?",
    a: "async/await is syntactic sugar over Promises that makes async code look synchronous and easier to read. An async function always returns a Promise. await pauses execution inside the function without blocking the main thread.",
    code: `// Basic async/await
async function getUser(id) {
  const res  = await fetch(\`/api/users/\${id}\`);
  const user = await res.json();
  return user; // Promise<user> returned automatically
}

// Error handling with try/catch
async function loadDashboard(userId) {
  try {
    const user  = await getUser(userId);
    const posts = await fetch(\`/api/posts?user=\${userId}\`).then(r => r.json());
    return { user, posts };
  } catch (err) {
    console.error("Dashboard failed:", err.message);
    return null;
  } finally {
    console.log("Loading complete");
  }
}

// Parallel execution (don't await sequentially if independent)
async function loadAll() {
  // ❌ Sequential - slow (waits for each)
  const user  = await fetchUser();
  const posts = await fetchPosts();

  // ✅ Parallel - fast
  const [user2, posts2] = await Promise.all([fetchUser(), fetchPosts()]);
}

// Async iteration
async function processItems(ids) {
  for (const id of ids) {
    const item = await fetchItem(id); // sequential intentionally
    console.log(item);
  }
}

// Top-level await (ES2022, in modules)
const config = await fetch("/config.json").then(r => r.json());`,
  },
  {
    q: "What is destructuring in JavaScript?",
    a: "Destructuring is a syntax for extracting values from arrays or properties from objects into variables. It supports default values, renaming, nested destructuring, and rest patterns.",
    code: `// Array destructuring
const [a, b, c] = [1, 2, 3];
const [x, , z] = [1, 2, 3];        // skip index 1
const [first, ...rest] = [1,2,3,4]; // rest=[2,3,4]

// Default values
const [p = 10, q = 20] = [5];  // p=5, q=20

// Swap variables
let m = 1, n = 2;
[m, n] = [n, m]; // m=2, n=1 ✅

// Object destructuring
const { name, age, city = "Unknown" } = { name: "Alice", age: 25 };

// Rename while destructuring
const { name: userName, age: userAge } = { name: "Bob", age: 30 };

// Nested destructuring
const { address: { street, zip } } = { address: { street: "Main St", zip: "12345" } };

// Rest in objects
const { id, ...rest2 } = { id: 1, name: "Alice", role: "admin" };
// rest2 = { name: "Alice", role: "admin" }

// Function parameter destructuring
function display({ name, age = 0, role = "user" }) {
  return \`\${name} (\${age}) - \${role}\`;
}
display({ name: "Alice", age: 25 });

// Array from function return
function getMinMax(arr) {
  return [Math.min(...arr), Math.max(...arr)];
}
const [min, max] = getMinMax([3, 1, 4, 1, 5, 9]);`,
  },
  {
    q: "What is the spread operator and rest parameters?",
    a: "The spread operator (...) expands an iterable into individual elements. Rest parameters collect multiple arguments into an array. Both use the same syntax but in opposite directions — spread expands, rest collects.",
    code: `// Spread: expand array
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];    // [1,2,3,4,5,6]
const copy     = [...arr1];             // shallow copy

// Spread: expand object
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = { ...obj1, ...obj2 };    // { a:1, b:3, c:4 }
// Note: b is overwritten by obj2

// Spread in function calls
Math.max(...arr1);    // 3
Math.min(...arr1);    // 1
console.log(...arr1); // 1 2 3

// Rest parameters: collect args
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4, 5); // 15

function first(a, b, ...others) {
  console.log(a, b, others);
}
first(1, 2, 3, 4, 5); // 1, 2, [3,4,5]

// Clone and modify
const user  = { name: "Alice", age: 25 };
const admin = { ...user, role: "admin", age: 26 }; // override age
// user is unchanged ✅

// Spread with strings
const chars = [..."hello"]; // ["h","e","l","l","o"]`,
  },
  {
    q: "What are higher-order functions? Explain map, filter, reduce.",
    a: "Higher-order functions either accept functions as arguments or return functions. map transforms each element, filter selects elements, and reduce accumulates values. They are the pillars of functional programming in JavaScript.",
    code: `const users = [
  { name: "Alice", age: 25, active: true,  score: 85 },
  { name: "Bob",   age: 17, active: false, score: 92 },
  { name: "Carol", age: 30, active: true,  score: 78 },
  { name: "Dave",  age: 22, active: true,  score: 95 },
];

// map - transform every element, returns new array
const names = users.map(u => u.name);
// ["Alice", "Bob", "Carol", "Dave"]

const withLabel = users.map(u => ({
  ...u,
  label: u.age >= 18 ? "Adult" : "Minor"
}));

// filter - keep elements that pass test
const adults  = users.filter(u => u.age >= 18);
const active  = users.filter(u => u.active);
const topScorers = users.filter(u => u.score >= 90);

// reduce - accumulate into single value
const totalScore = users.reduce((acc, u) => acc + u.score, 0); // 350
const avgScore   = totalScore / users.length; // 87.5

// reduce to group by property
const byActive = users.reduce((acc, u) => {
  const key = u.active ? "active" : "inactive";
  acc[key] = acc[key] || [];
  acc[key].push(u.name);
  return acc;
}, {});
// { active: ["Alice","Carol","Dave"], inactive: ["Bob"] }

// Chaining
const result = users
  .filter(u => u.active && u.age >= 18)
  .map(u => u.name)
  .sort();
// ["Alice", "Carol", "Dave"]`,
  },
  {
    q: "What is the Module system in JavaScript (ES Modules)?",
    a: "ES Modules use import/export to split code into reusable files. Named exports can have multiple per file. Default exports have one per file. Tree-shaking removes unused exports during bundling.",
    code: `// ── math.js ──────────────────────────────────────
// Named exports
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }

// Default export
export default class Calculator {
  add(a, b) { return a + b; }
}

// ── utils.js ─────────────────────────────────────
// Re-export
export { add, multiply } from "./math.js";
export * from "./helpers.js";

// ── main.js ──────────────────────────────────────
// Import named
import { add, multiply, PI } from "./math.js";

// Import default
import Calculator from "./math.js";

// Import all as namespace
import * as Math2 from "./math.js";
Math2.add(1, 2);

// Import with rename
import { add as sum } from "./math.js";

// Dynamic import (lazy loading)
const module = await import("./heavy.js");
module.default();

// Conditional import
if (condition) {
  const { feature } = await import("./feature.js");
  feature();
}`,
  },

  // ─── INTERMEDIATE-ADVANCED ─────────────────────────────────
  {
    q: "What is currying and partial application?",
    a: "Currying transforms a function with multiple arguments into a sequence of functions each taking one argument. Partial application fixes some arguments of a function, returning a new function for the rest.",
    code: `// Currying manually
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}

const add = curry((a, b, c) => a + b + c);
add(1)(2)(3);   // 6
add(1, 2)(3);   // 6
add(1)(2, 3);   // 6
add(1, 2, 3);   // 6

// Practical currying
const multiply = a => b => a * b;
const double  = multiply(2);
const triple  = multiply(3);
double(5); // 10
triple(5); // 15

// Partial application with bind
function greet(greeting, name) {
  return \`\${greeting}, \${name}!\`;
}
const sayHello = greet.bind(null, "Hello");
sayHello("Alice"); // "Hello, Alice!"
sayHello("Bob");   // "Hello, Bob!"

// Real-world: reusable validators
const isGreaterThan = min => num => num > min;
const isAdult = isGreaterThan(17);
[15, 18, 21].filter(isAdult); // [18, 21]`,
  },
  {
    q: "What is memoization and how do you implement it?",
    a: "Memoization is an optimization technique that caches the results of expensive function calls and returns the cached result when the same inputs occur again. It trades memory for speed.",
    code: `// Simple memoize implementation
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("Cache hit!");
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Expensive function
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Without memo: fibonacci(40) takes ~1 second
// With memo: near instant after first call
const memoFib = memoize(function fib(n) {
  if (n <= 1) return n;
  return memoFib(n - 1) + memoFib(n - 2);
});

memoFib(40); // computed once
memoFib(40); // "Cache hit!" → instant

// React useMemo equivalent
const expensiveValue = useMemo(() => {
  return heavyComputation(data);
}, [data]); // only recomputes when data changes

// WeakMap for object-keyed cache (avoids memory leaks)
function memoizeObj(fn) {
  const cache = new WeakMap();
  return function(obj) {
    if (cache.has(obj)) return cache.get(obj);
    const result = fn(obj);
    cache.set(obj, result);
    return result;
  };
}`,
  },
  {
    q: "What is the difference between deep copy and shallow copy?",
    a: "A shallow copy duplicates only the top-level properties — nested objects still share references. A deep copy recursively duplicates all levels so there are no shared references between the copy and original.",
    code: `const original = {
  name: "Alice",
  address: { city: "Paris", zip: "75001" },
  hobbies: ["reading", "coding"],
};

// ── Shallow copy methods ──────────────────────
const spread    = { ...original };
const assign    = Object.assign({}, original);
const arrCopy   = [...original.hobbies]; // for arrays

spread.name = "Bob";         // ✅ doesn't affect original
spread.address.city = "Lyon"; // ❌ MUTATES original.address!

// ── Deep copy methods ─────────────────────────
// 1. structuredClone (modern, recommended)
const deep1 = structuredClone(original);
deep1.address.city = "Lyon"; // ✅ original unchanged

// 2. JSON (simple but loses functions, Date, undefined)
const deep2 = JSON.parse(JSON.stringify(original));
// ⚠️ Loses: functions, undefined, Date→string, circular refs

// 3. Manual recursive deep clone
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(deepClone);
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, deepClone(v)])
  );
}

const deep3 = deepClone(original);`,
  },
  {
    q: "What are generators and iterators?",
    a: "An iterator is an object with a next() method returning {value, done}. A generator function (function*) creates iterators using yield. Generators are lazy — they produce values on demand, enabling infinite sequences and async flow control.",
    code: `// Custom iterator
function range(start, end) {
  let current = start;
  return {
    next() {
      if (current <= end) return { value: current++, done: false };
      return { value: undefined, done: true };
    },
    [Symbol.iterator]() { return this; }
  };
}
for (const n of range(1, 5)) console.log(n); // 1,2,3,4,5

// Generator function
function* counter(start = 0) {
  while (true) {
    const reset = yield start++;
    if (reset) start = 0;
  }
}
const gen = counter(1);
gen.next();       // { value: 1, done: false }
gen.next();       // { value: 2, done: false }
gen.next(true);   // { value: 0, done: false } - reset!

// Finite generator
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
const fib = fibonacci();
Array.from({ length: 8 }, () => fib.next().value);
// [0,1,1,2,3,5,8,13]

// Generator for async flow (pre async/await era)
function* fetchUser(id) {
  const user = yield fetch(\`/api/users/\${id}\`);
  const posts = yield fetch(\`/api/posts?user=\${user.id}\`);
  return { user, posts };
}`,
  },
  {
    q: "What are WeakMap and WeakSet?",
    a: "WeakMap and WeakSet hold weak references to objects — if no other reference exists, the object can be garbage collected. They are not iterable and have no size property. Used for metadata caching and preventing memory leaks.",
    code: `// WeakMap - keys must be objects, values can be anything
const cache = new WeakMap();

function processUser(user) {
  if (cache.has(user)) return cache.get(user);
  const result = heavyProcess(user);
  cache.set(user, result);
  return result;
}

// When 'user' object is GC'd, cache entry auto-removed ✅
// With regular Map, the entry would keep 'user' alive ❌

// Use case: private data
const _private = new WeakMap();
class Person {
  constructor(name, age) {
    _private.set(this, { name, age });
  }
  getName() { return _private.get(this).name; }
  getAge()  { return _private.get(this).age; }
}

// WeakSet - only objects, no duplicates
const seen = new WeakSet();

function trackVisit(user) {
  if (seen.has(user)) {
    console.log("Already visited");
    return;
  }
  seen.add(user);
  console.log("First visit");
}

// WeakSet for circular reference detection
function deepEqual(a, b, visited = new WeakSet()) {
  if (visited.has(a)) return true; // circular
  visited.add(a);
  // ... comparison logic
}`,
  },
  {
    q: "What is event delegation?",
    a: "Event delegation attaches a single event listener to a parent element to handle events from multiple children, using event bubbling. It improves performance and automatically handles dynamically added elements.",
    code: `// ❌ Without delegation - many listeners (bad)
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", handleClick);
});
// 100 buttons = 100 listeners 😱

// ✅ With delegation - one listener on parent
document.querySelector("#button-container").addEventListener("click", (e) => {
  // Check if click was on a button
  if (e.target.matches(".btn")) {
    handleClick(e.target);
  }
  // Handle different child types
  if (e.target.matches(".delete-btn")) deleteItem(e.target.dataset.id);
  if (e.target.matches(".edit-btn"))   editItem(e.target.dataset.id);
});

// Works for dynamically added elements too ✅
document.querySelector("#list").addEventListener("click", (e) => {
  const li = e.target.closest("li"); // bubble up to li
  if (!li) return;
  li.classList.toggle("selected");
});

// e.target vs e.currentTarget
// e.target      = element that was clicked
// e.currentTarget = element with the listener attached

// Practical: table row selection
document.querySelector("table").addEventListener("click", (e) => {
  const row = e.target.closest("tr[data-id]");
  if (row) selectRow(row.dataset.id);
});`,
  },
  {
    q: "What is the difference between call, apply, and bind?",
    a: "All three explicitly set 'this' for a function. call() invokes immediately with args as comma-separated values. apply() invokes immediately with args as an array. bind() returns a new function with 'this' permanently bound.",
    code: `function introduce(city, country) {
  return \`I'm \${this.name} from \${city}, \${country}\`;
}
const person = { name: "Alice" };

// call - invoke immediately, args comma-separated
introduce.call(person, "Paris", "France");
// "I'm Alice from Paris, France"

// apply - invoke immediately, args as array
introduce.apply(person, ["Paris", "France"]);
// "I'm Alice from Paris, France"

// bind - returns NEW function, doesn't invoke
const aliceIntro = introduce.bind(person);
aliceIntro("Tokyo", "Japan"); // "I'm Alice from Tokyo, Japan"

// Partial application with bind
const aliceInParis = introduce.bind(person, "Paris");
aliceInParis("France"); // "I'm Alice from Paris, France"
aliceInParis("Spain");  // "I'm Alice from Paris, Spain"

// Practical: borrowing methods
const numbers = [5, 2, 8, 1, 9];
Math.max.apply(null, numbers);   // 9
Math.max(...numbers);             // 9 (modern way)

// Fixing 'this' for callbacks
class Timer {
  constructor() { this.seconds = 0; }
  start() {
    // bind fixes 'this' for the callback
    setInterval(this.tick.bind(this), 1000);
  }
  tick() { console.log(++this.seconds); }
}`,
  },
  {
    q: "What are Symbols in JavaScript?",
    a: "Symbol is a primitive type that creates unique, immutable values. No two symbols are ever equal. Used as unique property keys to avoid naming collisions, and well-known symbols customize built-in behaviors.",
    code: `// Every Symbol is unique
const s1 = Symbol("id");
const s2 = Symbol("id");
s1 === s2; // false

// As object keys (won't clash with string keys)
const ID    = Symbol("id");
const ADMIN = Symbol("admin");

const user = {
  name: "Alice",
  [ID]: 123,       // symbol key
  [ADMIN]: true,
};

user[ID];          // 123
user.name;         // "Alice"

// Symbol keys are hidden from most operations
Object.keys(user);        // ["name"] - no symbols
JSON.stringify(user);     // {"name":"Alice"} - no symbols
Object.getOwnPropertySymbols(user); // [Symbol(id), Symbol(admin)]

// Global Symbol registry
const s3 = Symbol.for("shared");
const s4 = Symbol.for("shared");
s3 === s4; // true (same registry entry)

// Well-known symbols
class MyArray {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}
[] instanceof MyArray; // true

// Custom iterator with Symbol.iterator
const range = {
  from: 1, to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    const last  = this.to;
    return { next: () => current <= last
      ? { value: current++, done: false }
      : { done: true } };
  }
};
[...range]; // [1,2,3,4,5]`,
  },
  {
    q: "What is Object.freeze() vs Object.seal()?",
    a: "Object.freeze() makes an object completely immutable — no adding, removing, or modifying properties. Object.seal() prevents adding or removing properties but allows modifying existing ones. Both are shallow.",
    code: `// Object.freeze - fully immutable
const config = Object.freeze({
  API_URL: "https://api.example.com",
  TIMEOUT: 5000,
  nested: { retries: 3 }, // ⚠️ nested is NOT frozen
});

config.API_URL = "other";    // silently fails (strict: TypeError)
config.NEW_KEY = "val";      // silently fails
delete config.TIMEOUT;       // silently fails

config.API_URL;    // still "https://api.example.com"
config.nested.retries = 10;  // ✅ works! (shallow freeze)

Object.isFrozen(config); // true

// Deep freeze
function deepFreeze(obj) {
  Object.getOwnPropertyNames(obj).forEach(name => {
    const val = obj[name];
    if (val && typeof val === "object") deepFreeze(val);
  });
  return Object.freeze(obj);
}

// Object.seal - can modify, can't add/delete
const user = Object.seal({ name: "Alice", age: 25 });
user.name = "Bob";   // ✅ allowed (modify existing)
user.email = "...";  // ❌ silently fails (add)
delete user.age;     // ❌ silently fails (delete)

Object.isSealed(user); // true

// const vs freeze
const obj = { x: 1 };
// const prevents reassignment of variable
// freeze prevents modification of object content`,
  },

  // ─── ADVANCED ───────────────────────────────────────────────
  {
    q: "What are Proxy and Reflect?",
    a: "Proxy creates a wrapper around an object to intercept and redefine fundamental operations like property access, assignment, and function calls. Reflect provides methods for the same operations. Together they enable meta-programming.",
    code: `// Basic Proxy
const handler = {
  get(target, prop) {
    console.log(\`Getting \${prop}\`);
    return prop in target ? target[prop] : \`Property \${prop} not found\`;
  },
  set(target, prop, value) {
    if (typeof value !== "number") throw new TypeError("Must be number");
    target[prop] = value;
    return true; // required for set
  },
  deleteProperty(target, prop) {
    console.log(\`Deleting \${prop}\`);
    return Reflect.deleteProperty(target, prop);
  }
};

const obj = new Proxy({ x: 1 }, handler);
obj.x;        // "Getting x" → 1
obj.y;        // "Getting y" → "Property y not found"
obj.z = 42;   // ✅
obj.z = "hi"; // TypeError

// Validation proxy
function createValidator(target, schema) {
  return new Proxy(target, {
    set(obj, prop, value) {
      if (schema[prop] && !schema[prop](value)) {
        throw new Error(\`Invalid value for \${prop}: \${value}\`);
      }
      obj[prop] = value;
      return true;
    }
  });
}
const user = createValidator({}, {
  age: val => Number.isInteger(val) && val > 0,
});
user.age = 25;   // ✅
user.age = -1;   // Error: Invalid value for age: -1

// Reflect mirrors proxy traps
Reflect.get(obj, "x");         // same as obj.x
Reflect.set(obj, "x", 2);      // same as obj.x = 2
Reflect.has(obj, "x");         // same as "x" in obj`,
  },
  {
    q: "What is the difference between microtasks and macrotasks?",
    a: "Macrotasks (setTimeout, setInterval, I/O, UI rendering) are scheduled in the macrotask queue. Microtasks (Promise callbacks, queueMicrotask, MutationObserver) run in the microtask queue after each macrotask, before the next macrotask. The microtask queue is fully drained between macrotasks.",
    code: `// Full execution order demonstration
console.log("1 script start");

setTimeout(() => console.log("7 setTimeout 1"), 0);
setTimeout(() => console.log("8 setTimeout 2"), 0);

Promise.resolve()
  .then(() => {
    console.log("4 promise 1");
    return Promise.resolve();
  })
  .then(() => console.log("6 promise 2"));

queueMicrotask(() => console.log("5 queueMicrotask"));

Promise.resolve().then(() => console.log("3 promise 3"));

console.log("2 script end");

// Output: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8

// Why microtasks matter: starvation risk
function infiniteMicrotasks() {
  Promise.resolve().then(infiniteMicrotasks); // ⚠️ blocks forever
}
// Never do this — blocks macrotasks (UI, timers) forever

// MutationObserver uses microtasks
const observer = new MutationObserver(mutations => {
  // runs as microtask after DOM changes
  console.log("DOM changed", mutations.length);
});
observer.observe(document.body, { childList: true });`,
  },
  {
    q: "What is function composition and the pipe pattern?",
    a: "Function composition combines functions so the output of one becomes the input of the next. compose() applies right-to-left; pipe() applies left-to-right. It's a core functional programming pattern for building data transformation pipelines.",
    code: `// compose: right-to-left
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

// pipe: left-to-right (more readable)
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

// Simple transforms
const trim       = str => str.trim();
const lowercase  = str => str.toLowerCase();
const removeSpaces = str => str.replace(/\s+/g, "-");
const addPrefix  = str => \`user-\${str}\`;

// Compose: addPrefix(removeSpaces(lowercase(trim(x))))
const createSlug = pipe(trim, lowercase, removeSpaces, addPrefix);
createSlug("  Hello World  "); // "user-hello-world"

// Real-world data pipeline
const processUsers = pipe(
  users => users.filter(u => u.active),
  users => users.map(u => ({ ...u, name: u.name.trim() })),
  users => users.sort((a, b) => a.name.localeCompare(b.name)),
  users => users.slice(0, 10),
);

// Async pipe
const asyncPipe = (...fns) => x => fns.reduce(
  async (v, f) => f(await v), Promise.resolve(x)
);
const processData = asyncPipe(
  fetchUser,
  enrichWithPosts,
  formatForDisplay
);`,
  },
  {
    q: "What is the Observer pattern in JavaScript?",
    a: "The Observer pattern defines a one-to-many relationship where multiple observers subscribe to a subject. When the subject changes state, all observers are notified automatically. Foundation of EventEmitter, RxJS, and reactive frameworks.",
    code: `// EventEmitter implementation
class EventEmitter {
  #listeners = new Map();

  on(event, listener) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set());
    }
    this.#listeners.get(event).add(listener);
    return () => this.off(event, listener); // returns unsubscribe fn
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper);
    };
    return this.on(event, wrapper);
  }

  off(event, listener) {
    this.#listeners.get(event)?.delete(listener);
  }

  emit(event, ...args) {
    this.#listeners.get(event)?.forEach(fn => fn(...args));
  }
}

// Usage
class Store extends EventEmitter {
  #state = {};
  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.emit("change", this.#state);
  }
  getState() { return this.#state; }
}

const store = new Store();
const unsub = store.on("change", state => console.log("State:", state));
store.setState({ user: "Alice" }); // "State: { user: 'Alice' }"
unsub(); // unsubscribe
store.setState({ user: "Bob" });   // no log`,
  },
  {
    q: "What is debounce and throttle?",
    a: "Debounce delays execution until after a specified time has elapsed since the last call — ideal for search inputs. Throttle limits execution to at most once per time period — ideal for scroll and resize events.",
    code: `// Debounce - wait until user stops typing
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const searchAPI = debounce(async (query) => {
  const results = await fetch(\`/api/search?q=\${query}\`);
  displayResults(await results.json());
}, 300);

// User types "hello" → only fires 300ms after last keystroke
input.addEventListener("input", e => searchAPI(e.target.value));

// Throttle - max once per interval
function throttle(fn, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn.apply(this, args);
    }
  };
}

// Fires at most once per 100ms during scroll
const handleScroll = throttle(() => {
  updateScrollPosition(window.scrollY);
}, 100);
window.addEventListener("scroll", handleScroll);

// Debounce with leading edge (fire immediately, then wait)
function debounceLeading(fn, delay) {
  let timer;
  return function(...args) {
    if (!timer) fn.apply(this, args); // fire immediately
    clearTimeout(timer);
    timer = setTimeout(() => { timer = null; }, delay);
  };
}`,
  },
  {
    q: "What are JavaScript design patterns?",
    a: "Design patterns are reusable solutions to common problems. The most important ones in JavaScript are Singleton, Factory, Observer, Module, Decorator, and Strategy patterns.",
    code: `// Singleton
class Database {
  static #instance = null;
  #connection;
  constructor(url) {
    if (Database.#instance) return Database.#instance;
    this.#connection = url;
    Database.#instance = this;
  }
  static getInstance(url) { return new Database(url); }
}
const db1 = Database.getInstance("mongodb://...");
const db2 = Database.getInstance("other");
db1 === db2; // true - same instance

// Factory
class UserFactory {
  static create(role) {
    const roles = {
      admin:   { permissions: ["read","write","delete"] },
      editor:  { permissions: ["read","write"] },
      viewer:  { permissions: ["read"] },
    };
    return { role, ...roles[role], createdAt: new Date() };
  }
}
const admin = UserFactory.create("admin");

// Strategy
class Sorter {
  constructor(strategy) { this.strategy = strategy; }
  sort(data) { return this.strategy(data); }
}
const bubbleSort  = data => [...data].sort((a,b) => a-b);
const reverseSort = data => [...data].sort((a,b) => b-a);
const sorter = new Sorter(bubbleSort);
sorter.sort([3,1,2]); // [1,2,3]
sorter.strategy = reverseSort;
sorter.sort([3,1,2]); // [3,2,1]`,
  },
  {
    q: "What is memory management and how to avoid memory leaks?",
    a: "JavaScript uses automatic garbage collection (Mark-and-Sweep). Memory leaks occur when references to unused objects are retained. Common causes: global variables, forgotten timers, detached DOM nodes, closures capturing large data.",
    code: `// ❌ Common memory leak patterns:

// 1. Accidental global
function leak() {
  leakedData = new Array(1000000); // no let/const/var!
}

// 2. Forgotten interval/timeout
class Component {
  mounted() {
    this.intervalId = setInterval(this.update, 1000);
  }
  // ❌ Never cleared → Component can't be GC'd
  destroyed() {
    clearInterval(this.intervalId); // ✅ always clean up
  }
}

// 3. Unremoved event listeners
const handler = () => console.log("clicked");
document.addEventListener("click", handler);
// ✅ Remove when done:
document.removeEventListener("click", handler);

// 4. Detached DOM with reference
let detached = document.getElementById("modal");
document.body.removeChild(detached);
// detached still holds reference → can't be GC'd
detached = null; // ✅ release

// 5. Closure capturing large scope
function outer() {
  const HUGE = new Array(1000000).fill(0);
  return function inner() {
    return HUGE[0]; // HUGE can never be GC'd
  };
}

// ✅ Monitor with Chrome DevTools:
// Performance tab → Memory → Take Heap Snapshot
// Look for detached DOM nodes and growing retained size`,
  },
  {
    q: "What are Web Workers and how do they enable multithreading?",
    a: "Web Workers run JavaScript in background threads separate from the main thread. They cannot access the DOM but enable CPU-intensive tasks without blocking the UI. Communication uses postMessage and onmessage.",
    code: `// main.js
const worker = new Worker("worker.js");

// Send data to worker (structured clone algorithm)
worker.postMessage({
  type: "SORT",
  data: Array.from({ length: 1000000 }, () => Math.random()),
});

// Receive result
worker.onmessage = ({ data }) => {
  if (data.type === "SORTED") {
    console.log("Sorted:", data.result.slice(0, 5));
  }
};

worker.onerror = (err) => console.error("Worker error:", err);
worker.terminate(); // stop worker

// ── worker.js ─────────────────────────────────
self.onmessage = ({ data }) => {
  if (data.type === "SORT") {
    const sorted = data.data.slice().sort((a, b) => a - b);
    self.postMessage({ type: "SORTED", result: sorted });
  }
};

// Inline Worker (no separate file needed)
const blob = new Blob([\`
  self.onmessage = ({ data }) => {
    const result = data.map(n => n * 2);
    self.postMessage(result);
  };
\`], { type: "application/javascript" });

const inlineWorker = new Worker(URL.createObjectURL(blob));
inlineWorker.postMessage([1, 2, 3, 4, 5]);`,
  },
  {
    q: "What is the Structured Clone Algorithm?",
    a: "The Structured Clone Algorithm is used by postMessage, IndexedDB, and structuredClone() to deep copy objects. It handles more types than JSON (Date, Map, Set, ArrayBuffer, RegExp) but cannot clone functions or DOM nodes.",
    code: `// structuredClone - modern deep copy (2022+)
const original = {
  name: "Alice",
  date: new Date("2024-01-01"),
  map:  new Map([["key", "value"]]),
  set:  new Set([1, 2, 3]),
  arr:  new Uint8Array([1, 2, 3]),
  regex: /hello/gi,
};

const clone = structuredClone(original);
clone.date.setFullYear(2000);
original.date.getFullYear(); // 2024 - unchanged ✅
clone.map.set("new", "entry");
original.map.size; // 1 - unchanged ✅

// What structuredClone CAN handle:
// ✅ Date, RegExp, Map, Set
// ✅ ArrayBuffer, TypedArrays
// ✅ Circular references
// ✅ Deeply nested objects

// What it CANNOT handle:
// ❌ Functions  → throws DataCloneError
// ❌ DOM nodes  → throws DataCloneError
// ❌ Class instances lose their prototype

try {
  structuredClone({ fn: () => {} }); // DataCloneError
} catch (e) {
  console.log(e.name); // "DataCloneError"
}

// vs JSON.parse(JSON.stringify())
// JSON: loses Date (→string), undefined, functions, Map, Set
// structuredClone: handles all above ✅`,
  },
  {
    q: "What are tagged template literals and how are they used?",
    a: "Tagged templates allow you to process template literals with a function. The tag function receives the string parts as an array and the interpolated values separately. Used for SQL sanitization, styled components, i18n, and GraphQL.",
    code: `// Tag function signature: (strings, ...values)
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    return result + (value !== undefined
      ? \`<mark>\${value}</mark>\`
      : "") + str;
  });
}

const name = "Alice";
const score = 95;
const msg = highlight\`Player \${name} scored \${score} points!\`;
// "Player <mark>Alice</mark> scored <mark>95</mark> points!"

// SQL sanitization (prevent injection)
function sql(strings, ...values) {
  const query = strings.join("?");
  return { query, params: values };
}
const userId = "1; DROP TABLE users;--";
const q = sql\`SELECT * FROM users WHERE id = \${userId}\`;
// { query: "SELECT * FROM users WHERE id = ?", params: ["1; DROP TABLE users;--"] }
// Value is parameterized, not interpolated ✅

// styled-components pattern
const Button = styled.button\`
  background: \${props => props.primary ? "#f0c040" : "white"};
  padding: \${props => props.size === "lg" ? "16px 32px" : "8px 16px"};
  border-radius: 6px;
\`;

// i18n
function i18n(strings, ...keys) {
  return strings.reduce((result, str, i) =>
    result + str + (translations[keys[i - 1]] || keys[i - 1] || ""), ""
  );
}`,
  },
  {
    q: "How does JavaScript handle concurrency with async iterators?",
    a: "Async iterators combine async/await with the iterator protocol for processing async data streams (paginated APIs, file streams, WebSockets). Use for-await-of to consume them. AsyncGenerator functions create them.",
    code: `// Async iterator protocol
const asyncRange = {
  from: 1, to: 3,
  [Symbol.asyncIterator]() {
    let current = this.from;
    const last  = this.to;
    return {
      async next() {
        await new Promise(r => setTimeout(r, 100)); // simulate async
        if (current <= last) return { value: current++, done: false };
        return { value: undefined, done: true };
      }
    };
  }
};

for await (const num of asyncRange) {
  console.log(num); // 1, 2, 3 (with 100ms gaps)
}

// Async generator function
async function* paginate(url) {
  let page = 1;
  while (true) {
    const res  = await fetch(\`\${url}?page=\${page}\`);
    const data = await res.json();
    if (!data.items.length) return;
    yield* data.items;
    if (!data.hasNext) return;
    page++;
  }
}

// Consume paginated API lazily
for await (const item of paginate("/api/users")) {
  console.log(item);
  if (item.id > 100) break; // stop early ✅
}

// Convert async iterable to array
const items = [];
for await (const item of paginate("/api/products")) {
  items.push(item);
}`,
  },
  {
    q: "What are the new features in ES2022/ES2023/ES2024?",
    a: "Recent ECMAScript versions brought class fields, private methods, top-level await, Array.at(), Object.hasOwn(), Error cause, Array.toSorted/toReversed (immutable), groupBy, and Promise.withResolvers.",
    code: `// ES2022: Class fields & private methods
class BankAccount {
  #balance = 0;        // private field
  #owner;              // private field
  static #count = 0;   // private static field

  constructor(owner, initial) {
    this.#owner   = owner;
    this.#balance = initial;
    BankAccount.#count++;
  }

  #validate(amount) { return amount > 0 && amount <= this.#balance; }

  withdraw(amount) {
    if (!this.#validate(amount)) throw new Error("Invalid");
    this.#balance -= amount;
    return this.#balance;
  }

  static getCount() { return BankAccount.#count; }
}

// ES2022: Array.at() - negative indexing
[1,2,3,4,5].at(-1);  // 5 (last)
[1,2,3,4,5].at(-2);  // 4

// ES2022: Object.hasOwn() (replaces .hasOwnProperty)
Object.hasOwn({ a: 1 }, "a"); // true

// ES2023: Array immutable methods
const arr = [3,1,2];
arr.toSorted();        // [1,2,3] - new array ✅
arr.toReversed();      // [2,1,3] - new array ✅
arr.toSpliced(1, 1);   // [3,2] - new array ✅
arr.with(0, 99);       // [99,1,2] - new array ✅

// ES2024: Object.groupBy
const items = [{type:"a",v:1},{type:"b",v:2},{type:"a",v:3}];
Object.groupBy(items, item => item.type);
// { a: [{type:"a",v:1},{type:"a",v:3}], b: [{type:"b",v:2}] }

// ES2024: Promise.withResolvers
const { promise, resolve, reject } = Promise.withResolvers();
setTimeout(() => resolve("done"), 1000);
await promise; // "done"`,
  },
  {
    q: "What is the difference between for...in and for...of?",
    a: "for...in iterates over enumerable string property keys of an object (including inherited). for...of iterates over values of any iterable (Array, String, Map, Set, Generator). Never use for...in on arrays.",
    code: `// for...in - iterates KEYS
const obj = { a: 1, b: 2, c: 3 };
for (const key in obj) {
  console.log(key, obj[key]); // "a" 1, "b" 2, "c" 3
}

// ⚠️ for...in on array includes prototype properties!
Array.prototype.custom = "oops";
const arr = [1, 2, 3];
for (const i in arr) {
  console.log(i); // "0", "1", "2", "custom" ← bad!
}
delete Array.prototype.custom;

// for...of - iterates VALUES
for (const val of [10, 20, 30]) console.log(val); // 10,20,30
for (const char of "hello") console.log(char);     // h,e,l,l,o

// for...of with Map (key-value pairs)
const map = new Map([["a",1],["b",2]]);
for (const [key, val] of map) console.log(key, val);

// for...of with Set
for (const val of new Set([1,2,2,3])) console.log(val); // 1,2,3

// for...of with entries() (index + value)
for (const [i, val] of ["a","b","c"].entries()) {
  console.log(i, val); // 0 "a", 1 "b", 2 "c"
}

// Can break/continue in for...of
for (const n of [1,2,3,4,5]) {
  if (n === 3) break;   // ✅ works
  console.log(n); // 1, 2
}`,
  },
  {
    q: "What is the nullish coalescing operator (??) and optional chaining (?.)?",
    a: "?? returns the right operand only when the left is null or undefined (unlike || which triggers on any falsy value). ?. safely accesses nested properties, returning undefined instead of throwing an error if the chain is nullish.",
    code: `// ?? vs ||
const count = 0;
count || "default";  // "default" (0 is falsy) ❌ often wrong
count ?? "default";  // 0 ← only null/undefined triggers ✅

const name = "";
name || "Anonymous"; // "Anonymous" (empty string falsy) ❌
name ?? "Anonymous"; // "" ← preserves empty string ✅

// Optional chaining ?.
const user = {
  profile: {
    address: {
      city: "Paris"
    }
  }
};

// Without ?.
const city = user && user.profile && user.profile.address && user.profile.address.city;

// With ?.
const city2 = user?.profile?.address?.city; // "Paris"
const zip   = user?.profile?.address?.zip;  // undefined (no error)
const none  = user?.missing?.deep?.path;    // undefined

// ?. with methods
const result = user?.getFullName?.(); // undefined if method doesn't exist
const item   = arr?.[0];             // safe array access

// Combining ?? and ?.
const displayName = user?.profile?.displayName ?? user?.name ?? "Anonymous";

// Nullish assignment ??=
let config = null;
config ??= { theme: "dark" }; // assigns only if null/undefined
config;   // { theme: "dark" }

let existing = { theme: "light" };
existing ??= { theme: "dark" }; // NOT assigned (not null/undefined)
existing; // { theme: "light" } ✅`,
  },
  {
    q: "What is the difference between Object.keys, values, entries and how to iterate objects?",
    a: "Object.keys() returns own enumerable string keys. Object.values() returns own enumerable values. Object.entries() returns [key, value] pairs. These enable array-style iteration over objects.",
    code: `const user = { name: "Alice", age: 25, role: "admin" };

// Object.keys - array of keys
Object.keys(user);    // ["name", "age", "role"]

// Object.values - array of values
Object.values(user);  // ["Alice", 25, "admin"]

// Object.entries - array of [key, value] pairs
Object.entries(user); // [["name","Alice"],["age",25],["role","admin"]]

// Iteration patterns
for (const key of Object.keys(user)) {
  console.log(key, user[key]);
}

for (const [key, val] of Object.entries(user)) {
  console.log(\`\${key}: \${val}\`);
}

// Transform object values (map over entries)
const upperUser = Object.fromEntries(
  Object.entries(user).map(([k, v]) =>
    [k, typeof v === "string" ? v.toUpperCase() : v]
  )
);
// { name: "ALICE", age: 25, role: "ADMIN" }

// Filter object properties
const publicInfo = Object.fromEntries(
  Object.entries(user).filter(([k]) => k !== "role")
);
// { name: "Alice", age: 25 }

// Object.fromEntries - convert Map to object
const map = new Map([["a",1],["b",2]]);
Object.fromEntries(map); // { a:1, b:2 }`,
  },
  {
    q: "What is the difference between synchronous and asynchronous error handling?",
    a: "Synchronous errors are caught with try/catch. Async errors from Promises need .catch() or try/catch inside async functions. Unhandled rejections can crash Node.js and trigger warnings in browsers.",
    code: `// Synchronous error handling
function divide(a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}
try {
  console.log(divide(10, 0));
} catch (e) {
  console.error(e.message); // "Division by zero"
}

// Custom error classes
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name       = "ApiError";
    this.statusCode = statusCode;
  }
}

// Async error handling
async function fetchData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new ApiError(\`HTTP \${res.status}\`, res.status);
    return await res.json();
  } catch (e) {
    if (e instanceof ApiError && e.statusCode === 404) {
      return null; // handle 404 gracefully
    }
    throw e; // re-throw other errors
  }
}

// Global unhandled rejection handler
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled:", reason);
});
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled:", e.reason);
  e.preventDefault(); // prevent console warning
});

// Error boundary pattern for async
async function withErrorBoundary(fn, fallback) {
  try { return await fn(); }
  catch (e) { return fallback; }
}`,
  },
  {
    q: "What is a Service Worker and how does it enable PWAs?",
    a: "A Service Worker is a script that runs in a background thread, acting as a proxy between the browser and network. It enables offline capabilities, background sync, push notifications, and caching strategies for Progressive Web Apps.",
    code: `// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const reg = await navigator.serviceWorker.register("/sw.js");
      console.log("SW registered:", reg.scope);
    } catch (err) {
      console.error("SW failed:", err);
    }
  });
}

// ── sw.js ─────────────────────────────────────
const CACHE = "app-v1";
const ASSETS = ["/", "/index.html", "/app.js", "/style.css"];

// Install - cache assets
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch - serve from cache, fallback to network
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, clone));
        return res;
      });
    })
  );
});`,
  },
  {
    q: "What is CORS and how does it work in JavaScript?",
    a: "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts cross-origin requests. Browsers send an Origin header; servers respond with Access-Control headers. Preflight OPTIONS requests check permissions before the actual request.",
    code: `// A cross-origin request: different protocol, domain, or port
// http://app.com → https://api.com  ← different protocol + domain
// http://localhost:3000 → http://localhost:8000 ← different port

// ── Browser sends: ────────────────────────────
// GET /api/data HTTP/1.1
// Origin: http://localhost:3000

// ── Server must respond with: ─────────────────
// Access-Control-Allow-Origin: http://localhost:3000
// (or * for any origin)

// Preflight (OPTIONS) triggered when:
// - Method: PUT, DELETE, PATCH
// - Custom headers: Authorization, X-Custom-Header
// - Content-Type: application/json (not form data)

// Express CORS setup
const cors = require("cors");
app.use(cors({
  origin:      ["http://localhost:3000", "https://myapp.com"],
  methods:     ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true, // allow cookies
  maxAge:      86400, // cache preflight for 24h
}));

// Fetch with credentials (cookies)
fetch("https://api.example.com/data", {
  credentials: "include",   // send cookies
  headers: { "Content-Type": "application/json" },
});

// CORS errors are browser-enforced — server gets the request!
// The response is blocked by browser, not server`,
  },
  {
    q: "What is the difference between localStorage, sessionStorage, and cookies?",
    a: "localStorage persists until explicitly cleared (~5-10MB, not sent to server). sessionStorage clears on tab close (~5MB). Cookies have custom expiry, are sent with every HTTP request (~4KB), and support HttpOnly/Secure flags for security.",
    code: `// localStorage - persists forever
localStorage.setItem("token", "abc123");
const token = localStorage.getItem("token");
localStorage.removeItem("token");
localStorage.clear();
localStorage.length; // number of entries

// sessionStorage - tab/window lifetime only
sessionStorage.setItem("draft", JSON.stringify({ text: "..." }));
// Cleared when tab closes

// Storage event (cross-tab communication via localStorage)
window.addEventListener("storage", (e) => {
  console.log(\`"\${e.key}" changed from "\${e.oldValue}" to "\${e.newValue}"\`);
  console.log("URL:", e.url); // which tab changed it
});

// Cookies
document.cookie = "user=Alice; max-age=3600; path=/; SameSite=Lax";
// HttpOnly can only be set by server (JS can't read)
// Secure: only sent over HTTPS

// Reading cookies (clunky - use a library)
function getCookie(name) {
  return document.cookie.split("; ")
    .find(c => c.startsWith(name + "="))
    ?.split("=")[1];
}

// Comparison table:
// Feature        | localStorage | sessionStorage | Cookie
// Capacity       | ~5-10MB      | ~5MB           | ~4KB
// Expiry         | Never        | Tab close      | Custom
// Sent to server | No           | No             | Yes (every req)
// JS accessible  | Yes          | Yes            | Yes (unless HttpOnly)
// Cross-tab      | Yes (event)  | No             | Yes`,
  },
  {
    q: "What is functional programming in JavaScript?",
    a: "Functional programming treats computation as evaluation of mathematical functions. Key concepts: pure functions, immutability, function composition, avoiding shared state and side effects. JavaScript supports FP with first-class functions.",
    code: `// 1. Pure functions - same input → same output, no side effects
const add = (a, b) => a + b;  // ✅ pure
let total = 0;
const addToTotal = n => (total += n); // ❌ impure (side effect)

// 2. Immutability - never mutate, always return new
// ❌ Mutation
function addItem(arr, item) { arr.push(item); return arr; }
// ✅ Immutable
const addItem2 = (arr, item) => [...arr, item];
const updateUser = (user, updates) => ({ ...user, ...updates });

// 3. Function composition
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const processName = pipe(
  str => str.trim(),
  str => str.toLowerCase(),
  str => str.replace(/\s+/g, "-"),
);
processName("  Hello World  "); // "hello-world"

// 4. Avoiding shared state
// ❌ Shared mutable state
let cart = [];
function addToCart(item) { cart.push(item); }

// ✅ State as parameter, return new state
const addToCart2 = (cart, item) => [...cart, item];

// 5. Point-free style
const numbers = [1, 2, 3, 4, 5];
// ❌ Not point-free
numbers.filter(n => isEven(n));
// ✅ Point-free
numbers.filter(isEven); // pass function reference`,
  },
  {
    q: "What is the Event Bus pattern and how is it used for state management?",
    a: "An Event Bus is a global event emitter that allows decoupled components to communicate by emitting and listening to events. It's a simple alternative to prop drilling but can make data flow hard to trace.",
    code: `// Simple Event Bus
class EventBus {
  #events = {};

  subscribe(event, callback) {
    this.#events[event] = this.#events[event] || [];
    this.#events[event].push(callback);
    // Return unsubscribe function
    return () => {
      this.#events[event] = this.#events[event].filter(cb => cb !== callback);
    };
  }

  publish(event, data) {
    (this.#events[event] || []).forEach(cb => cb(data));
  }

  clear(event) {
    if (event) delete this.#events[event];
    else this.#events = {};
  }
}

// Global singleton
export const bus = new EventBus();

// Component A - publishes
bus.publish("user:login", { id: 1, name: "Alice" });
bus.publish("cart:update", { items: [], total: 0 });

// Component B - subscribes
const unsub = bus.subscribe("user:login", (user) => {
  console.log("User logged in:", user.name);
  updateNavbar(user);
});

// Component C
bus.subscribe("cart:update", ({ total }) => {
  updateCartIcon(total);
});

// Cleanup (important to avoid memory leaks)
// Call unsub() when component unmounts
unsub();`,
  },
  {
    q: "What are the different ways to clone an object in JavaScript?",
    a: "Cloning can be shallow (top-level only) or deep (all levels). Methods vary in capabilities: spread/assign are shallow; JSON, structuredClone, and recursive functions provide deep copies with different trade-offs.",
    code: `const obj = {
  name: "Alice",
  scores: [95, 87, 92],
  address: { city: "Paris" },
  birthDate: new Date("1990-01-01"),
  greet: function() { return "Hi!"; },
};

// ── Shallow copy ──────────────────────────────
const spread  = { ...obj };
const assign  = Object.assign({}, obj);
// Both: top-level copied, nested objects still shared

spread.name = "Bob";          // ✅ doesn't affect original
spread.address.city = "Lyon"; // ❌ MUTATES original.address

// ── Deep copy ─────────────────────────────────
// 1. structuredClone - best modern option
const clone1 = structuredClone(obj);
// ✅ Handles: Date, Map, Set, RegExp, ArrayBuffer
// ❌ Can't clone: functions (drops them silently)

// 2. JSON - simplest but lossy
const clone2 = JSON.parse(JSON.stringify(obj));
// ❌ Loses: functions, undefined, Date→string, Symbol

// 3. Lodash cloneDeep - battle-tested
// const clone3 = _.cloneDeep(obj);

// 4. Custom recursive
function deepClone(value) {
  if (value === null || typeof value !== "object") return value;
  if (value instanceof Date)   return new Date(value);
  if (value instanceof RegExp) return new RegExp(value);
  if (value instanceof Map)    return new Map([...value].map(([k,v]) => [k, deepClone(v)]));
  if (value instanceof Set)    return new Set([...value].map(deepClone));
  if (Array.isArray(value))    return value.map(deepClone);
  return Object.fromEntries(
    Object.entries(value).map(([k,v]) => [k, deepClone(v)])
  );
}`,
  },
  {
    q: "What is the difference between imperative and declarative programming in JS?",
    a: "Imperative code describes HOW to do something step by step. Declarative code describes WHAT you want, leaving the how to abstractions. React, SQL, and array methods are declarative; loops and DOM manipulation are imperative.",
    code: `const users = [
  { name: "Alice", age: 28, active: true },
  { name: "Bob",   age: 17, active: false },
  { name: "Carol", age: 32, active: true },
];

// ── Imperative - HOW to do it ─────────────────
const result1 = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].active && users[i].age >= 18) {
    result1.push(users[i].name.toUpperCase());
  }
}

// ── Declarative - WHAT we want ────────────────
const result2 = users
  .filter(u => u.active && u.age >= 18)
  .map(u => u.name.toUpperCase());

// Both produce: ["ALICE", "CAROL"]

// DOM: Imperative
const list = document.getElementById("list");
list.innerHTML = "";
users.forEach(u => {
  const li = document.createElement("li");
  li.textContent = u.name;
  list.appendChild(li);
});

// React: Declarative
function UserList({ users }) {
  return (
    <ul>
      {users.map(u => <li key={u.name}>{u.name}</li>)}
    </ul>
  );
}`,
  },
  {
    q: "What are Getters and Setters in JavaScript?",
    a: "Getters and setters are accessor properties that allow computed property access syntax while running function logic. Defined with get/set keywords in object literals or classes. Useful for validation, lazy computation, and encapsulation.",
    code: `// Object literal getter/setter
const circle = {
  _radius: 5,
  get radius()   { return this._radius; },
  set radius(val) {
    if (val < 0) throw new RangeError("Radius must be positive");
    this._radius = val;
  },
  get area()     { return Math.PI * this._radius ** 2; },
  get diameter() { return this._radius * 2; },
};

circle.radius;        // 5 (getter)
circle.radius = 10;   // (setter)
circle.area;          // 314.159... (computed getter)
circle.radius = -1;   // RangeError ❌

// Class getter/setter
class Temperature {
  #celsius;
  constructor(celsius) { this.#celsius = celsius; }

  get fahrenheit() { return this.#celsius * 9/5 + 32; }
  set fahrenheit(val) { this.#celsius = (val - 32) * 5/9; }

  get celsius() { return this.#celsius; }
  set celsius(val) {
    if (val < -273.15) throw new RangeError("Below absolute zero");
    this.#celsius = val;
  }
}

const temp = new Temperature(100);
temp.fahrenheit;        // 212
temp.fahrenheit = 32;   // sets celsius to 0
temp.celsius;           // 0

// Object.defineProperty
const obj = {};
Object.defineProperty(obj, "readOnly", {
  get: () => 42,
  enumerable: true,
  configurable: false,
});
obj.readOnly = 99; // silently fails (no setter)`,
  },
  {
    q: "What is the module pattern and IIFE?",
    a: "An IIFE (Immediately Invoked Function Expression) executes right after definition. The module pattern uses an IIFE to create private scope, exposing only a public API. This was the primary encapsulation technique before ES modules.",
    code: `// IIFE syntax
(function() {
  console.log("runs immediately");
})();

// Arrow IIFE
(() => {
  console.log("also immediate");
})();

// Module pattern with IIFE
const ShoppingCart = (() => {
  // Private state
  let items = [];
  let discount = 0;

  // Private function
  function calculateTotal() {
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    return subtotal * (1 - discount);
  }

  // Public API
  return {
    addItem(item) {
      items.push(item);
      console.log(\`Added: \${item.name}\`);
    },
    removeItem(id) {
      items = items.filter(i => i.id !== id);
    },
    applyDiscount(pct) { discount = pct / 100; },
    getTotal() { return calculateTotal(); },
    getCount() { return items.length; },
    // items is not exposed - truly private ✅
  };
})();

ShoppingCart.addItem({ id: 1, name: "Book", price: 20 });
ShoppingCart.getTotal(); // 20
ShoppingCart.applyDiscount(10);
ShoppingCart.getTotal(); // 18
ShoppingCart.items;      // undefined ← private ✅`,
  },
  {
    q: "What is the Revealing Module Pattern?",
    a: "The Revealing Module Pattern is a variation of the module pattern where all functions are defined privately and only references to the ones you want public are returned. This makes it easier to see the public API at a glance.",
    code: `const UserModule = (() => {
  // All defined privately
  let currentUser = null;

  function validate(user) {
    return user && user.email && user.name;
  }

  function login(email, password) {
    // authenticate...
    currentUser = { email, name: "Alice", role: "user" };
    notifyLogin(currentUser);
    return currentUser;
  }

  function logout() {
    currentUser = null;
    console.log("Logged out");
  }

  function getCurrentUser() {
    return currentUser ? { ...currentUser } : null; // return copy
  }

  function notifyLogin(user) {
    console.log(\`Welcome, \${user.name}!\`); // private, not exposed
  }

  function isLoggedIn() {
    return currentUser !== null;
  }

  // Reveal only what's public
  return {
    login,
    logout,
    getCurrentUser,
    isLoggedIn,
    // validate and notifyLogin are NOT revealed ✅
  };
})();

UserModule.login("alice@example.com", "password");
UserModule.isLoggedIn();     // true
UserModule.getCurrentUser(); // { email:..., name:..., role:... }
UserModule.notifyLogin;      // undefined (private) ✅`,
  },
  {
    q: "What are the different ways to handle asynchronous code?",
    a: "JavaScript evolved through four async patterns: callbacks (error-first), Promises (chainable), async/await (synchronous style), and observables (streams). Each solves different problems with different trade-offs.",
    code: `// 1. Callbacks (oldest - leads to callback hell)
function getUser(id, callback) {
  setTimeout(() => callback(null, { id, name: "Alice" }), 100);
}
getUser(1, (err, user) => {
  if (err) return console.error(err);
  getPosts(user.id, (err, posts) => { // nested ← callback hell
    if (err) return console.error(err);
    console.log(user, posts);
  });
});

// 2. Promises (chainable)
getUser(1)
  .then(user   => getPosts(user.id))
  .then(posts  => console.log(posts))
  .catch(err   => console.error(err));

// 3. async/await (cleanest)
async function loadProfile(id) {
  try {
    const user  = await getUser(id);
    const posts = await getPosts(user.id);
    return { user, posts };
  } catch (err) {
    console.error(err);
  }
}

// 4. Parallel vs Sequential
// Sequential (slow - waits for each)
const a = await fetchA();
const b = await fetchB();

// Parallel (fast - concurrent)
const [a2, b2] = await Promise.all([fetchA(), fetchB()]);

// 5. Observables (RxJS - for streams)
import { fromEvent } from "rxjs";
import { debounceTime, switchMap } from "rxjs/operators";
fromEvent(input, "input").pipe(
  debounceTime(300),
  switchMap(e => fetch(\`/search?q=\${e.target.value}\`))
).subscribe(results => display(results));`,
  },
  {
    q: "What is object property descriptor and how does Object.defineProperty work?",
    a: "Every object property has a descriptor with writable, enumerable, and configurable flags. Object.defineProperty gives full control over these. Understanding descriptors is key to building frameworks and libraries.",
    code: `const user = { name: "Alice" };

// Get property descriptor
Object.getOwnPropertyDescriptor(user, "name");
// { value: "Alice", writable: true, enumerable: true, configurable: true }

// Define property with full control
Object.defineProperty(user, "id", {
  value:        123,
  writable:     false,  // cannot be changed
  enumerable:   false,  // won't appear in for...in or Object.keys
  configurable: false,  // cannot be deleted or redefined
});

user.id;          // 123
user.id = 999;    // silently fails (strict: TypeError)
Object.keys(user);// ["name"] (id not enumerable)
delete user.id;   // silently fails

// Accessor descriptor (getter/setter)
let _age = 25;
Object.defineProperty(user, "age", {
  get() { return _age; },
  set(val) {
    if (val < 0) throw new RangeError("Invalid age");
    _age = val;
  },
  enumerable: true,
  configurable: true,
});

// Define multiple at once
Object.defineProperties(user, {
  firstName: { value: "Alice", writable: true, enumerable: true },
  lastName:  { value: "Smith", writable: true, enumerable: true },
});

// Practical: create read-only constants on objects
function createConstants(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, { value: v, writable: false, enumerable: true }])
  );
}`,
  },
  {
    q: "What is the difference between .forEach, .map, .some, .every, .find, .findIndex?",
    a: "These are Array prototype methods each with a distinct purpose and return value. Choosing the right one makes code more expressive and efficient.",
    code: `const users = [
  { id: 1, name: "Alice", age: 28, active: true  },
  { id: 2, name: "Bob",   age: 17, active: false },
  { id: 3, name: "Carol", age: 32, active: true  },
];

// forEach - execute side effect, returns undefined
users.forEach(u => console.log(u.name)); // can't break/return

// map - transform each element, returns new array (same length)
const names = users.map(u => u.name); // ["Alice","Bob","Carol"]

// filter - keep matching elements, returns new array (shorter/same)
const adults = users.filter(u => u.age >= 18); // [Alice, Carol]

// find - first matching element (or undefined)
const user = users.find(u => u.id === 2); // { id:2, name:"Bob"... }
const none = users.find(u => u.id === 99); // undefined

// findIndex - index of first match (or -1)
const idx = users.findIndex(u => u.id === 2); // 1
const notFound = users.findIndex(u => u.id === 99); // -1

// some - true if ANY element matches (short-circuits)
const hasMinor  = users.some(u => u.age < 18);  // true
const allActive = users.every(u => u.active);    // false

// every - true if ALL elements match (short-circuits)
const allAdults = users.every(u => u.age >= 18); // false
const anyActive = users.some(u => u.active);     // true

// includes - check if value exists (uses ===)
[1,2,3].includes(2);    // true
[1,2,NaN].includes(NaN); // true (unlike indexOf)

// flat & flatMap
[[1,2],[3,4]].flat();    // [1,2,3,4]
[[1,2],[3,4]].flat(Infinity); // deeply flattened
[1,2,3].flatMap(n => [n, n*2]); // [1,2,2,4,3,6]`,
  },
  {
    q: "What is the difference between regular expressions methods: test, match, matchAll, replace, replaceAll, split?",
    a: "JavaScript has multiple string and regex methods for pattern matching. test() checks existence, match() finds matches, matchAll() finds all matches with groups, replace/replaceAll substitutes, split() divides strings.",
    code: `const str = "Hello World, hello JavaScript!";
const re = /hello/gi;

// RegExp.test() - returns boolean
/^\d+$/.test("12345"); // true
/^\d+$/.test("123ab"); // false

// String.match() - returns array or null
str.match(/hello/i);  // ["Hello"] (first match, no 'g')
str.match(/hello/gi); // ["Hello","hello"] (all matches with 'g')
str.match(/xyz/);     // null (no match)

// String.matchAll() - returns iterator of ALL matches with groups
const dateStr = "2024-01-15 and 2024-03-22";
const dateRe  = /(\d{4})-(\d{2})-(\d{2})/g;
for (const match of dateStr.matchAll(dateRe)) {
  console.log(match[0]); // full match: "2024-01-15"
  console.log(match[1]); // group 1: "2024"
  console.log(match[2]); // group 2: "01"
  console.log(match.index); // position
}

// String.replace() - first match (or all with /g)
"a-b-c".replace("-", "_");   // "a_b-c" (first only)
"a-b-c".replace(/-/g, "_");  // "a_b_c" (all with /g)
"a-b-c".replaceAll("-", "_"); // "a_b_c" (ES2021)

// Replace with function
"hello world".replace(/\b\w/g, c => c.toUpperCase()); // "Hello World"

// Named capture groups
const re2 = /(?<year>\d{4})-(?<month>\d{2})/;
const { year, month } = "2024-03".match(re2).groups;

// String.split()
"a,b,,c".split(",");     // ["a","b","","c"]
"hello".split("");       // ["h","e","l","l","o"]
"one two three".split(/\s+/); // ["one","two","three"]`,
  },
  {
    q: "What are the differences between Map and Object?",
    a: "Map and Object both store key-value pairs but differ significantly. Map allows any type as key, maintains insertion order, has a built-in size property, and performs better for frequent additions/removals.",
    code: `// Object keys are always strings or Symbols
const obj = {};
obj[1]    = "number key";  // → "1" (string)
obj[{}]   = "object key";  // → "[object Object]"

// Map keys can be ANYTHING
const map = new Map();
const keyObj = { id: 1 };
const keyFn  = function() {};
map.set(keyObj, "object as key");
map.set(keyFn,  "function as key");
map.set(1,      "actual number");
map.get(keyObj); // "object as key"
map.get(1);      // "actual number"

// Size
Object.keys(obj).length; // manual count
map.size;                // direct property ✅

// Iteration - Map maintains insertion order
for (const [key, value] of map) console.log(key, value);
map.keys();    // iterator
map.values();  // iterator
map.entries(); // iterator

// Conversion
const mapFromObj = new Map(Object.entries(obj));
const objFromMap = Object.fromEntries(map); // only string keys

// When to use Map:
// ✅ Keys are not strings
// ✅ Frequently adding/removing pairs
// ✅ Need to know size
// ✅ Need iteration in insertion order

// When to use Object:
// ✅ JSON serialization needed
// ✅ Static config/record structures
// ✅ Prototype methods needed`,
  },
  {
    q: "What are the common JavaScript performance optimization techniques?",
    a: "Performance optimization includes minimizing DOM operations, using efficient algorithms, lazy loading, memoization, debouncing/throttling, avoiding memory leaks, and leveraging modern browser APIs like requestAnimationFrame.",
    code: `// 1. Batch DOM updates (avoid layout thrashing)
// ❌ Forces layout recalculation on each read/write
boxes.forEach(box => {
  const height = box.offsetHeight; // READ
  box.style.height = height + 10 + "px"; // WRITE
});

// ✅ Batch reads then writes
const heights = boxes.map(box => box.offsetHeight); // all READs
boxes.forEach((box, i) => {
  box.style.height = heights[i] + 10 + "px"; // all WRITEs
});

// 2. Use DocumentFragment for multiple DOM inserts
const fragment = document.createDocumentFragment();
data.forEach(item => {
  const li = document.createElement("li");
  li.textContent = item.name;
  fragment.appendChild(li);
});
list.appendChild(fragment); // single DOM operation ✅

// 3. requestAnimationFrame for animations
function animate() {
  element.style.left = (position += 1) + "px";
  if (position < 500) requestAnimationFrame(animate);
}
requestAnimationFrame(animate); // synced to 60fps ✅

// 4. Avoid unnecessary work
const expensiveCalc = memoize((n) => {
  return Array.from({length: n}, (_, i) => i).reduce((a,b) => a+b, 0);
});

// 5. Virtual list for large datasets
// Only render visible items (libraries: react-window, vue-virtual-scroller)

// 6. Web Vitals targets
// LCP (Largest Contentful Paint) < 2.5s
// FID (First Input Delay) < 100ms
// CLS (Cumulative Layout Shift) < 0.1`,
  },
  {
    q: "What are WeakRef and FinalizationRegistry?",
    a: "WeakRef holds a weak reference to an object — it doesn't prevent GC. FinalizationRegistry calls a callback when a weakly-held object is collected. Both are low-level tools for caching and resource cleanup.",
    code: `// WeakRef - weak reference (doesn't prevent GC)
let user = { name: "Alice", data: new Array(1000000) };

const ref = new WeakRef(user);

// Access the object (may return undefined if GC'd)
function processUser() {
  const target = ref.deref(); // get ref or undefined
  if (!target) {
    console.log("User was GC'd");
    return;
  }
  console.log("User:", target.name);
}

processUser(); // "User: Alice"
user = null;   // allow GC
// After GC: processUser() → "User was GC'd"

// FinalizationRegistry - cleanup callback
const registry = new FinalizationRegistry((heldValue) => {
  console.log(\`Object with token "\${heldValue}" was collected\`);
  // Clean up external resources: close connections, clear timers, etc.
});

function createResource(name) {
  const resource = { name, connection: openConnection() };
  registry.register(resource, name); // register with token
  return resource;
}

let res = createResource("database");
res = null; // allow GC → eventually logs: 'Object with token "database" was collected'

// Practical: cache with automatic cleanup
class Cache {
  #cache = new Map();
  #registry = new FinalizationRegistry(key => this.#cache.delete(key));

  set(key, value) {
    const ref = new WeakRef(value);
    this.#cache.set(key, ref);
    this.#registry.register(value, key);
  }

  get(key) { return this.#cache.get(key)?.deref(); }
}`,
  },
];
