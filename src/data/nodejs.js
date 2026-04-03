export const meta = {
  id: "nodejs",
  label: "Node.js",
  icon: "🟢",
  color: "#68a063",
  desc: "JavaScript runtime built on Chrome's V8 engine for building fast, scalable server-side applications.",
};

export const qaData = [
  // ─── BEGINNER ────────────────────────────────────────────
  {
    q: "What is Node.js and how does it work?",
    a: "Node.js is a JavaScript runtime built on Chrome's V8 engine that allows JavaScript to run on the server side. It uses an event-driven, non-blocking I/O model that makes it lightweight and efficient for data-intensive real-time applications. It is single-threaded but handles concurrency through the event loop.",
    code: `// Node.js is NOT a framework or language - it's a runtime
// It enables JavaScript outside the browser

// ── What Node.js provides ─────────────────────────
// V8 Engine          - executes JavaScript
// libuv              - event loop, async I/O, thread pool
// Node APIs          - fs, http, path, crypto, etc.
// npm ecosystem      - largest package registry

// ── Simple HTTP server ────────────────────────────
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello from Node.js!" }));
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

// ── Node.js vs Browser JavaScript ─────────────────
// Browser has:   window, document, DOM, localStorage, fetch
// Node.js has:   process, require, __dirname, __filename, Buffer
// Both have:     console, setTimeout, setInterval, Promise, Error

// ── process object ────────────────────────────────
console.log(process.version);      // Node.js version
console.log(process.platform);     // "win32" | "linux" | "darwin"
console.log(process.env.NODE_ENV); // environment variable
console.log(process.cwd());        // current working directory
console.log(process.argv);         // command line arguments
// process.argv[0] = "node"
// process.argv[1] = script path
// process.argv[2+] = custom args

process.exit(0);  // exit with success code
process.exit(1);  // exit with error code

// ── __dirname and __filename ──────────────────────
console.log(__dirname);   // /home/user/my-project/src
console.log(__filename);  // /home/user/my-project/src/app.js

// ES Modules equivalent
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);`,
  },
  {
    q: "What is the Node.js module system (CommonJS vs ES Modules)?",
    a: "Node.js originally used CommonJS (require/module.exports) for modules. ES Modules (import/export) became standard in Node.js 12+ using .mjs extension or 'type: module' in package.json. Both systems have differences in loading (sync vs async), caching, and scope.",
    code: `// ── CommonJS (CJS) - traditional Node.js ─────────
// math.js
const PI = 3.14159;
function add(a, b) { return a + b; }
function multiply(a, b) { return a * b; }

module.exports = { PI, add, multiply };        // named exports
module.exports = add;                           // default export
module.exports.default = add;                   // named default

// Importing
const math            = require("./math");      // entire object
const { add, PI }     = require("./math");      // destructured
const add2            = require("./math").add;  // property access
const path            = require("path");        // built-in module
const express         = require("express");     // npm package

// ── ES Modules (ESM) - modern standard ────────────
// math.mjs  OR  math.js with "type": "module" in package.json
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default function multiply(a, b) { return a * b; }

// Importing
import multiply, { PI, add } from "./math.js"; // .js extension REQUIRED in ESM
import * as math from "./math.js";
import { createServer } from "http";
import express from "express";

// Dynamic import (works in both CJS and ESM)
const module = await import("./math.js");
const { add: addFn } = await import("./math.js");

// ── Key differences ───────────────────────────────
// CJS: synchronous, can require() anywhere (even in functions)
// ESM: asynchronous, static (must be at top level)
// CJS: __dirname, __filename available
// ESM: must derive them from import.meta.url
// CJS: cached on first require() call
// ESM: also cached, but live bindings (exports update)

// ── package.json module type ──────────────────────
// { "type": "module" }   → .js files treated as ESM
// { "type": "commonjs" } → .js files treated as CJS (default)
// Always: .mjs = ESM, .cjs = CJS regardless of "type"

// ── Interop ───────────────────────────────────────
// ESM can import CJS: import cjsModule from "./legacy.cjs"
// CJS cannot require() ESM synchronously - must use dynamic import
const esmModule = await import("./modern.mjs");`,
  },
  {
    q: "What is the Node.js event loop in detail?",
    a: "The Node.js event loop processes async operations in phases: timers (setTimeout/setInterval), pending callbacks, idle/prepare, poll (I/O), check (setImmediate), and close callbacks. process.nextTick and Promises (microtasks) run between each phase, before moving to the next.",
    code: `// ── Event loop phases ─────────────────────────────
// 1. Timers:    execute setTimeout / setInterval callbacks
// 2. Pending:   I/O callbacks deferred to next loop
// 3. Idle:      internal use only
// 4. Poll:      retrieve new I/O events, execute I/O callbacks
// 5. Check:     execute setImmediate callbacks
// 6. Close:     execute close event callbacks (socket.on("close"))

// Microtasks (run BETWEEN each phase):
// - process.nextTick queue (highest priority)
// - Promise callbacks (.then, .catch)
// - queueMicrotask callbacks

console.log("1 - sync");

setTimeout(() => console.log("5 - setTimeout 0"),    0);
setTimeout(() => console.log("6 - setTimeout 100"), 100);
setImmediate(() => console.log("4 - setImmediate"));

Promise.resolve().then(() => console.log("3 - Promise microtask"));

process.nextTick(() => console.log("2 - nextTick"));

console.log("1b - sync end");

// Output order:
// 1 - sync
// 1b - sync end
// 2 - nextTick          ← nextTick before Promises
// 3 - Promise microtask ← microtasks before phases
// 4 - setImmediate      ← check phase (before timers when in I/O)
// 5 - setTimeout 0      ← timers phase
// 6 - setTimeout 100    ← next timer iteration

// ── nextTick vs setImmediate ──────────────────────
// process.nextTick: runs before any I/O, before next phase
// setImmediate:     runs in check phase (after I/O)

// ── I/O context changes order ─────────────────────
const fs = require("fs");
fs.readFile("./file.txt", () => {
  // Inside I/O callback, setImmediate runs before setTimeout
  setTimeout(()    => console.log("setTimeout"));
  setImmediate(()  => console.log("setImmediate")); // always first here
});

// ── Starving the event loop ────────────────────────
// ❌ Infinite nextTick loop blocks everything
function recursiveNextTick() {
  process.nextTick(recursiveNextTick); // starves I/O
}

// ✅ Use setImmediate for recursion
function recursiveSetImmediate() {
  setImmediate(recursiveSetImmediate); // allows I/O between calls
}`,
  },
  {
    q: "What are Node.js streams and how do they work?",
    a: "Streams process data in chunks rather than loading everything into memory — essential for large files, network data, and piping. Four types: Readable, Writable, Duplex (both), and Transform (modify data). Stream events: data, end, error, finish, drain.",
    code: `const fs      = require("fs");
const zlib    = require("zlib");
const crypto  = require("crypto");
const { Transform, Readable, Writable, pipeline } = require("stream");
const { promisify } = require("util");
const pipelineAsync = promisify(pipeline);

// ── Reading a file with streams ───────────────────
const readable = fs.createReadStream("large-file.txt", { encoding: "utf8", highWaterMark: 64 * 1024 });

readable.on("data",  chunk => console.log("Chunk:", chunk.length));
readable.on("end",   ()    => console.log("Done reading"));
readable.on("error", err   => console.error("Error:", err));

// ── Writing a file with streams ────────────────────
const writable = fs.createWriteStream("output.txt");
writable.write("Line 1\n");
writable.write("Line 2\n");
writable.end("Final line\n");
writable.on("finish", () => console.log("Done writing"));

// ── Piping streams ────────────────────────────────
// Compress file: read → gzip → write
fs.createReadStream("input.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("input.txt.gz"))
  .on("finish", () => console.log("Compressed!"));

// ── pipeline (handles errors and cleanup) ────────
await pipelineAsync(
  fs.createReadStream("input.txt"),
  zlib.createGzip(),
  crypto.createCipheriv("aes-256-cbc", key, iv),
  fs.createWriteStream("input.enc.gz")
);

// ── Custom Transform stream ───────────────────────
class UpperCaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase()); // push transformed data
    callback(); // signal we are done with this chunk
  }
  _flush(callback) {
    this.push("\n[END]"); // push final data before stream ends
    callback();
  }
}

fs.createReadStream("input.txt")
  .pipe(new UpperCaseTransform())
  .pipe(process.stdout);

// ── Custom Readable stream ────────────────────────
class CounterStream extends Readable {
  constructor(private limit: number) { super({ objectMode: false }); }
  _read() {
    if (this.limit <= 0) return this.push(null); // signal end
    this.push(\`\${this.limit--}\n\`);
  }
}
new CounterStream(5).pipe(process.stdout); // 5 4 3 2 1

// ── Stream pipeline with async generators ─────────
async function* generateLines() {
  for (let i = 0; i < 1000000; i++) yield \`Line \${i}\n\`;
}
await pipelineAsync(generateLines(), fs.createWriteStream("huge.txt"));`,
  },
  {
    q: "What is the Node.js file system (fs) module?",
    a: "The fs module provides APIs for interacting with the file system. It has callback-based, synchronous (Sync), and promise-based (fs/promises) APIs. The promise API is the modern approach. Key operations: reading, writing, appending, deleting, watching, and directory operations.",
    code: `const fs      = require("fs");
const fsp     = require("fs/promises"); // promise-based (modern)
const path    = require("path");

// ── Promise-based (recommended) ───────────────────
async function fileOperations() {
  // Read
  const content = await fsp.readFile("data.txt", "utf8");
  const buffer  = await fsp.readFile("image.png"); // Buffer

  // Write (overwrites)
  await fsp.writeFile("output.txt", "Hello World\n", "utf8");
  await fsp.writeFile("data.json", JSON.stringify(data, null, 2));

  // Append
  await fsp.appendFile("log.txt", \`[\${new Date().toISOString()}] Event\n\`);

  // Copy
  await fsp.copyFile("src.txt", "dst.txt");
  await fsp.copyFile("src.txt", "dst.txt", fs.constants.COPYFILE_EXCL); // fail if dst exists

  // Move / Rename
  await fsp.rename("old-name.txt", "new-name.txt");

  // Delete
  await fsp.unlink("file.txt");
  await fsp.rm("dir", { recursive: true, force: true }); // remove directory

  // Stat - file info
  const stat = await fsp.stat("file.txt");
  console.log(stat.size, stat.mtime, stat.isDirectory(), stat.isFile());

  // Check existence
  try {
    await fsp.access("file.txt", fs.constants.F_OK | fs.constants.R_OK);
    console.log("File exists and is readable");
  } catch {
    console.log("File does not exist");
  }
}

// ── Directory operations ──────────────────────────
async function dirOperations() {
  await fsp.mkdir("new-dir", { recursive: true }); // create with parents
  const entries = await fsp.readdir("./src", { withFileTypes: true });

  for (const entry of entries) {
    console.log(entry.name, entry.isDirectory() ? "DIR" : "FILE");
  }

  // Recursive directory listing
  async function* walkDir(dir) {
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) yield* walkDir(full);
      else yield full;
    }
  }
  for await (const file of walkDir("./src")) console.log(file);
}

// ── Watching files ────────────────────────────────
const watcher = fs.watch("./src", { recursive: true }, (event, filename) => {
  console.log(\`\${event}: \${filename}\`); // "change: app.js" or "rename: ..."
});
// watcher.close(); // stop watching

// ── Streams for large files (memory efficient) ────
const readStream  = fs.createReadStream("huge.csv", { highWaterMark: 64 * 1024 });
const writeStream = fs.createWriteStream("output.csv");
readStream.pipe(writeStream);`,
  },
  {
    q: "What is the Node.js path module?",
    a: "The path module provides utilities for working with file and directory paths in a cross-platform way. It handles differences between Windows (backslash) and Unix (forward slash) path separators, resolves relative paths, extracts path components, and joins paths safely.",
    code: `const path = require("path");

// ── Path components ───────────────────────────────
const filePath = "/home/user/projects/app/src/index.js";

path.dirname(filePath);    // "/home/user/projects/app/src"
path.basename(filePath);   // "index.js"
path.basename(filePath, ".js"); // "index" (without extension)
path.extname(filePath);    // ".js"

// Windows vs Unix
path.sep;                  // "/" on Unix, "\\" on Windows
path.delimiter;            // ":" on Unix, ";" on Windows (for PATH env)

// ── Joining paths ──────────────────────────────────
path.join("user", "docs", "file.txt");          // "user/docs/file.txt"
path.join("/home", "user", "..", "other");      // "/home/other" (resolves ..)
path.join(__dirname, "config", "app.json");    // absolute from current file

// ── Resolving paths ───────────────────────────────
path.resolve("src", "app.js");                 // absolute from cwd
path.resolve("/home/user", "docs", "file.txt"); // "/home/user/docs/file.txt"
path.resolve(".");                             // current working directory

// ── Normalizing ───────────────────────────────────
path.normalize("/home//user/./docs/../file");  // "/home/user/file"

// ── Parse and format ──────────────────────────────
path.parse("/home/user/index.js");
// {
//   root:  "/",
//   dir:   "/home/user",
//   base:  "index.js",
//   ext:   ".js",
//   name:  "index"
// }

path.format({ dir: "/home/user", name: "index", ext: ".js" }); // "/home/user/index.js"

// ── Relative path ──────────────────────────────────
path.relative("/home/user/app", "/home/user/docs/readme.md");
// "../docs/readme.md"

// ── isAbsolute ────────────────────────────────────
path.isAbsolute("/home/user");  // true
path.isAbsolute("user/home");   // false

// ── Common patterns ───────────────────────────────
const config = require(path.join(__dirname, "..", "config", "app.json"));

// Safe path construction (prevents path traversal)
function safeJoin(base, userInput) {
  const resolved = path.resolve(base, userInput);
  if (!resolved.startsWith(base)) throw new Error("Path traversal detected");
  return resolved;
}`,
  },
  {
    q: "What is the Node.js http module and how do you build a basic server?",
    a: "The http module enables creating HTTP servers and clients. A server receives IncomingMessage (request) and ServerResponse objects. URL and querystring parsing, headers, methods, and body reading are all handled manually — frameworks like Express abstract this complexity.",
    code: `const http        = require("http");
const https       = require("https");
const url         = require("url");
const querystring = require("querystring");
const fs          = require("fs");

// ── Basic HTTP server ─────────────────────────────
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true); // parse with query string
  const pathname  = parsedUrl.pathname;
  const query     = parsedUrl.query;

  // Method routing
  const method = req.method;
  console.log(\`\${method} \${pathname}\`);
  console.log("Headers:", req.headers);

  // Read request body
  async function readBody() {
    return new Promise((resolve, reject) => {
      const chunks = [];
      req.on("data",  chunk => chunks.push(chunk));
      req.on("end",   ()    => resolve(Buffer.concat(chunks).toString()));
      req.on("error", reject);
    });
  }

  // Routing
  if (method === "GET" && pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome!</h1>");

  } else if (method === "GET" && pathname === "/api/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ users: [{ id: 1, name: "Alice" }] }));

  } else if (method === "POST" && pathname === "/api/users") {
    const body = await readBody();
    const data = JSON.parse(body);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ...data, id: Date.now() }));

  } else if (pathname.startsWith("/static/")) {
    const filePath = "." + pathname;
    try {
      const content = fs.readFileSync(filePath);
      res.writeHead(200);
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(3000, "0.0.0.0", () => {
  console.log("Server: http://localhost:3000");
});

server.on("error", err => console.error("Server error:", err));

// ── HTTP client (making requests) ─────────────────
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => resolve(JSON.parse(Buffer.concat(chunks).toString())));
    }).on("error", reject);
  });
}`,
  },
  {
    q: "What is Express.js and how do you build a REST API?",
    a: "Express.js is a minimal and flexible Node.js web framework providing routing, middleware, and utilities for HTTP. It simplifies building REST APIs, web servers, and full-stack applications. Middleware functions process requests in a pipeline with access to req, res, and next.",
    code: `const express = require("express");
const app     = express();

// ── Built-in middleware ───────────────────────────
app.use(express.json());                        // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies
app.use(express.static("public"));              // serve static files

// ── Custom middleware ─────────────────────────────
const logger = (req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.path}\`);
  next(); // MUST call next() to continue
};

const auth = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
};

app.use(logger);

// ── Router ────────────────────────────────────────
const userRouter = express.Router();

// GET /api/users?page=1&limit=10
userRouter.get("/", async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  try {
    const users = await UserService.findAll({ page: +page, limit: +limit, search });
    res.json({ users, total: users.length, page: +page });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users/:id
userRouter.get("/:id", async (req, res) => {
  const user = await UserService.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// POST /api/users
userRouter.post("/", auth, async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Name and email required" });
  const user = await UserService.create({ name, email, password });
  res.status(201).json(user);
});

// PUT /api/users/:id
userRouter.put("/:id", auth, async (req, res) => {
  const user = await UserService.update(req.params.id, req.body);
  if (!user) return res.status(404).json({ error: "Not found" });
  res.json(user);
});

// DELETE /api/users/:id
userRouter.delete("/:id", auth, async (req, res) => {
  await UserService.delete(req.params.id);
  res.status(204).send();
});

app.use("/api/users", userRouter);

// ── Error handling middleware (4 params) ──────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status ?? 500).json({
    error:   err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

app.listen(3000, () => console.log("API server on port 3000"));`,
  },
  {
    q: "What is the Node.js EventEmitter?",
    a: "EventEmitter is the core pattern for asynchronous event-driven architecture in Node.js. It allows objects to emit named events and attach listener functions. Most Node.js built-in objects (streams, servers, processes) extend EventEmitter.",
    code: `const { EventEmitter } = require("events");

// ── Basic usage ───────────────────────────────────
const emitter = new EventEmitter();

// Register listener
emitter.on("data", (payload) => {
  console.log("Received:", payload);
});

// Register one-time listener
emitter.once("connect", () => {
  console.log("Connected! (fires once)");
});

// Emit event
emitter.emit("data", { id: 1, name: "Alice" });
emitter.emit("connect"); // fires listener
emitter.emit("connect"); // listener already removed

// Remove listener
function handler(data) { console.log(data); }
emitter.on("event", handler);
emitter.off("event", handler);      // remove specific listener
emitter.removeAllListeners("data"); // remove all for "data"
emitter.removeAllListeners();       // remove ALL listeners

// Get listeners
emitter.listenerCount("data");      // number of listeners
emitter.listeners("data");          // array of listeners
emitter.eventNames();               // ["data", "connect", ...]

// ── Extending EventEmitter ────────────────────────
class OrderService extends EventEmitter {
  #orders = new Map();

  async placeOrder(item, quantity) {
    const order = { id: Date.now(), item, quantity, status: "pending" };
    this.#orders.set(order.id, order);

    this.emit("order:placed", order);

    try {
      await this.#processPayment(order);
      order.status = "paid";
      this.emit("order:paid", order);

      await this.#fulfillOrder(order);
      order.status = "fulfilled";
      this.emit("order:fulfilled", order);
    } catch (err) {
      order.status = "failed";
      this.emit("error", err);  // "error" event is special - throws if no listener
    }
  }

  async #processPayment(order)  { /* ... */ }
  async #fulfillOrder(order)    { /* ... */ }
}

const orders = new OrderService();
orders.on("order:placed",    o => console.log("Order placed:",   o.id));
orders.on("order:paid",      o => sendEmail("payment-confirmed", o));
orders.on("order:fulfilled", o => sendSMS("your-order-shipped",  o));
orders.on("error",           e => console.error("Order error:",  e));

// ── Async event handling ──────────────────────────
emitter.on("data", async (data) => {
  await processData(data); // EventEmitter doesn't await async listeners!
  // Use a wrapper or handle errors explicitly
});`,
  },
  {
    q: "What is the Node.js process and child_process module?",
    a: "The process object provides information about the current Node.js process and control over it. child_process enables spawning subprocesses — exec for shell commands, spawn for streaming I/O, fork for Node.js child processes with IPC communication.",
    code: `const { exec, execFile, spawn, fork, execSync } = require("child_process");
const { promisify } = require("util");
const execAsync = promisify(exec);

// ── process object ────────────────────────────────
process.env.NODE_ENV;         // environment variables
process.argv;                 // command-line args
process.cwd();                // current directory
process.pid;                  // process ID
process.memoryUsage();        // { rss, heapTotal, heapUsed, external }
process.cpuUsage();           // { user, system }
process.uptime();             // seconds since process started

// Signals
process.on("SIGTERM", () => { gracefulShutdown(); });
process.on("SIGINT",  () => { console.log("Ctrl+C"); process.exit(0); });
process.on("uncaughtException",  err  => { console.error(err); process.exit(1); });
process.on("unhandledRejection", (r, p) => { console.error(r); });

// ── exec - run shell command ──────────────────────
// Simple, buffers output (good for small output)
const { stdout, stderr } = await execAsync("ls -la");
console.log(stdout);

// With shell
exec("git log --oneline -10", (err, stdout, stderr) => {
  if (err) return console.error(err);
  console.log(stdout);
});

// ── spawn - streaming I/O ──────────────────────────
// Better for large output or real-time data
const ls = spawn("ls", ["-la", "/usr"], { cwd: "/", env: process.env });
ls.stdout.on("data", data => process.stdout.write(data));
ls.stderr.on("data", data => process.stderr.write(data));
ls.on("close", code => console.log("Exit code:", code));

// ── execFile - run binary directly (no shell) ─────
execFile("node", ["--version"], (err, stdout) => console.log(stdout));

// ── fork - child Node.js process with IPC ────────
// parent.js
const child = fork("./worker.js", [], { silent: false });
child.send({ type: "TASK", data: [1, 2, 3, 4, 5] });
child.on("message", result => console.log("Result:", result));
child.on("exit", code => console.log("Worker exited:", code));

// worker.js
process.on("message", ({ type, data }) => {
  if (type === "TASK") {
    const result = data.reduce((a, b) => a + b, 0);
    process.send({ result });
    process.exit(0);
  }
});`,
  },

  // ─── INTERMEDIATE ─────────────────────────────────────────
  {
    q: "What is Node.js cluster module and how does it scale across CPUs?",
    a: "Node.js is single-threaded, but the cluster module forks multiple worker processes sharing the same port. The master process manages workers; workers handle requests. This utilizes all CPU cores. Modern alternatives include the Worker Threads module and PM2 process manager.",
    code: `const cluster = require("cluster");
const http    = require("http");
const os      = require("os");
const process = require("process");

const NUM_CPUS = os.cpus().length;

if (cluster.isPrimary) {
  console.log(\`Primary \${process.pid} is running\`);
  console.log(\`Forking \${NUM_CPUS} workers...\`);

  // Fork workers for each CPU
  for (let i = 0; i < NUM_CPUS; i++) {
    cluster.fork();
  }

  // Handle worker events
  cluster.on("online",     w => console.log(\`Worker \${w.id} (\${w.process.pid}) online\`));
  cluster.on("disconnect", w => console.log(\`Worker \${w.id} disconnected\`));
  cluster.on("exit", (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died (code:\${code}, signal:\${signal})\`);
    if (!worker.exitedAfterDisconnect) {
      console.log("Restarting worker...");
      cluster.fork(); // auto-restart crashed workers
    }
  });

  // Zero-downtime restart on SIGUSR2
  process.on("SIGUSR2", () => {
    const workers = Object.values(cluster.workers);
    let i = 0;
    function restart() {
      if (i >= workers.length) return console.log("All workers restarted");
      const worker = workers[i++];
      worker.once("exit", () => {
        cluster.fork().once("listening", restart);
      });
      worker.disconnect();
    }
    restart();
  });

  // IPC: send message to all workers
  function broadcastToWorkers(msg) {
    Object.values(cluster.workers).forEach(w => w.send(msg));
  }

} else {
  // Worker process - create server
  const app = require("./app"); // Express app
  const server = http.createServer(app);
  server.listen(3000, () => {
    console.log(\`Worker \${process.pid} listening on port 3000\`);
  });

  // Receive messages from primary
  process.on("message", msg => {
    if (msg.type === "shutdown") server.close(() => process.exit(0));
  });

  console.log(\`Worker \${process.pid} started\`);
}`,
  },
  {
    q: "What are Worker Threads in Node.js?",
    a: "Worker Threads run JavaScript in parallel on separate threads with their own V8 instance and memory. Unlike cluster, they share memory via SharedArrayBuffer and Atomics. Ideal for CPU-intensive tasks like image processing, cryptography, and data transformation without blocking the event loop.",
    code: `const { Worker, isMainThread, parentPort, workerData,
        MessageChannel, SharedArrayBuffer, receiveMessageOnPort } = require("worker_threads");
const path = require("path");

// ── Main thread ───────────────────────────────────
if (isMainThread) {
  // Create worker from a file
  const worker = new Worker("./worker.js", {
    workerData: { numbers: Array.from({ length: 1e7 }, (_, i) => i) },
  });

  worker.on("message",  result  => console.log("Sum:", result));
  worker.on("error",    err     => console.error("Worker error:", err));
  worker.on("exit",     code    => console.log("Worker exited:", code));

  // ── Inline worker (no separate file) ──────────
  const workerCode = \`
    const { parentPort, workerData } = require("worker_threads");
    const result = workerData.numbers.reduce((a, b) => a + b, 0);
    parentPort.postMessage(result);
  \`;
  const inlineWorker = new Worker(workerCode, {
    eval: true,
    workerData: { numbers: [1, 2, 3, 4, 5] }
  });

  // ── SharedArrayBuffer - zero-copy sharing ─────
  const shared = new SharedArrayBuffer(4);         // 4 bytes
  const arr    = new Int32Array(shared);

  const w = new Worker("./shared-worker.js", { workerData: { shared } });
  Atomics.store(arr, 0, 42);
  w.on("message", () => console.log("Value:", Atomics.load(arr, 0)));

  // ── Worker pool pattern ────────────────────────
  class WorkerPool {
    constructor(size, script) {
      this.queue   = [];
      this.workers = Array.from({ length: size }, () => {
        const w = new Worker(script);
        w.on("message", result => {
          const { resolve } = this.queue.shift();
          resolve(result);
          if (this.queue.length) w.postMessage(this.queue[0].data);
        });
        return w;
      });
    }
    run(data) {
      return new Promise((resolve, reject) => {
        this.queue.push({ data, resolve, reject });
        this.workers[0].postMessage(data);
      });
    }
  }

// ── Worker file (worker.js) ───────────────────────
} else {
  const { parentPort, workerData } = require("worker_threads");
  const sum = workerData.numbers.reduce((a, b) => a + b, 0);
  parentPort.postMessage(sum);
}`,
  },
  {
    q: "What is the Node.js crypto module and how do you handle security?",
    a: "The crypto module provides cryptographic functionality including hashing, HMAC, encryption, decryption, and key generation. Essential for password hashing (bcrypt/argon2 preferred), JWT signing, API key generation, and data encryption.",
    code: `const crypto  = require("crypto");
const bcrypt  = require("bcrypt");      // npm install bcrypt
const argon2  = require("argon2");      // npm install argon2
const jwt     = require("jsonwebtoken"); // npm install jsonwebtoken

// ── Hashing ───────────────────────────────────────
// SHA-256 hash
const hash = crypto.createHash("sha256").update("hello world").digest("hex");

// HMAC (with secret key)
const hmac = crypto.createHmac("sha256", "secret-key").update("message").digest("hex");

// ── Password hashing (NEVER use SHA for passwords) ─
// bcrypt (most common)
const saltRounds = 12;
const hashedPw   = await bcrypt.hash("user-password", saltRounds);
const isMatch    = await bcrypt.compare("user-password", hashedPw); // true

// argon2 (more secure, recommended)
const hashed2 = await argon2.hash("user-password", { type: argon2.argon2id });
const isMatch2 = await argon2.verify(hashed2, "user-password");

// ── JWT tokens ────────────────────────────────────
const JWT_SECRET  = process.env.JWT_SECRET;
const JWT_REFRESH = process.env.JWT_REFRESH_SECRET;

function generateTokens(userId, role) {
  const access = jwt.sign(
    { sub: userId, role, type: "access" },
    JWT_SECRET,
    { expiresIn: "15m", issuer: "myapp", audience: "myapp" }
  );
  const refresh = jwt.sign(
    { sub: userId, type: "refresh" },
    JWT_REFRESH,
    { expiresIn: "7d" }
  );
  return { access, refresh };
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET, { issuer: "myapp", audience: "myapp" });
}

// ── AES-256-GCM encryption ────────────────────────
function encrypt(text, secretKey) {
  const key = crypto.scryptSync(secretKey, "salt", 32); // derive key
  const iv  = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return { encrypted: encrypted.toString("hex"), iv: iv.toString("hex"), tag: tag.toString("hex") };
}

function decrypt({ encrypted, iv, tag }, secretKey) {
  const key    = crypto.scryptSync(secretKey, "salt", 32);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(iv, "hex"));
  decipher.setAuthTag(Buffer.from(tag, "hex"));
  return decipher.update(Buffer.from(encrypted, "hex")) + decipher.final("utf8");
}

// ── Secure random generation ──────────────────────
const apiKey    = crypto.randomBytes(32).toString("hex");     // 64 char hex
const uuid      = crypto.randomUUID();                         // standard UUID
const otp       = crypto.randomInt(100000, 999999);            // 6-digit OTP
const resetToken = crypto.randomBytes(48).toString("base64url"); // URL-safe token`,
  },
  {
    q: "What is database integration in Node.js with PostgreSQL and MongoDB?",
    a: "Node.js integrates with databases via drivers or ORMs. For PostgreSQL, node-postgres (pg) provides a connection pool with raw SQL, while Prisma or TypeORM provide ORM abstractions. For MongoDB, Mongoose provides schema validation and models over the native driver.",
    code: `// ── PostgreSQL with pg (node-postgres) ───────────
const { Pool } = require("pg");

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     5432,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  max:      20,          // max connections in pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Query with parameterized values (prevent SQL injection)
async function getUser(id) {
  const { rows } = await pool.query(
    "SELECT id, name, email FROM users WHERE id = $1", [id]
  );
  return rows[0] ?? null;
}

// Transaction
async function transferFunds(fromId, toId, amount) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("UPDATE accounts SET balance = balance - $1 WHERE id = $2", [amount, fromId]);
    await client.query("UPDATE accounts SET balance = balance + $1 WHERE id = $2", [amount, toId]);
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release(); // return to pool
  }
}

// ── Prisma ORM ────────────────────────────────────
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function prismaExamples() {
  // Create
  const user = await prisma.user.create({
    data: { name: "Alice", email: "alice@example.com", posts: { create: { title: "Hello" } } },
    include: { posts: true },
  });

  // Find
  const users = await prisma.user.findMany({
    where:   { active: true, age: { gte: 18 } },
    select:  { id: true, name: true, email: true },
    orderBy: { createdAt: "desc" },
    skip:    0, take: 10,
  });

  // Update
  await prisma.user.update({ where: { id: 1 }, data: { name: "Bob" } });

  // Transaction
  await prisma.$transaction([
    prisma.user.update({ where: { id: 1 }, data: { credits: { decrement: 10 } } }),
    prisma.product.update({ where: { id: 1 }, data: { stock: { decrement: 1 } } }),
  ]);
}

// ── MongoDB with Mongoose ─────────────────────────
const mongoose = require("mongoose");
await mongoose.connect(process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true, minlength: 8 },
  role:      { type: String, enum: ["admin","user"], default: "user" },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

userSchema.pre("save", async function() {
  if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model("User", userSchema);
const users = await User.find({ role: "user" }).select("-password").limit(10).lean();`,
  },
  {
    q: "What is middleware in Express.js and how does the middleware pipeline work?",
    a: "Middleware functions are the core of Express. They have access to req, res, and next. They execute sequentially in the order they are registered. Middleware can be application-level, router-level, error-handling, or third-party. The pipeline ends when a response is sent or an error occurs.",
    code: `const express   = require("express");
const rateLimit = require("express-rate-limit");
const helmet    = require("helmet");
const cors      = require("cors");
const morgan    = require("morgan");
const compression = require("compression");

const app = express();

// ── Security middleware ────────────────────────────
app.use(helmet());    // sets security headers
app.use(cors({
  origin:      ["https://myapp.com", "https://admin.myapp.com"],
  methods:     ["GET","POST","PUT","DELETE","PATCH"],
  credentials: true,
}));

// ── Rate limiting ──────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max:      100,             // requests per window
  standardHeaders: true,
  legacyHeaders:   false,
  message: { error: "Too many requests, please try again later" },
});
app.use("/api", limiter);

// Stricter limit for auth routes
const authLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 10 });
app.use("/api/auth", authLimiter);

// ── Request processing middleware ──────────────────
app.use(morgan("combined"));             // HTTP logging
app.use(compression());                  // gzip responses
app.use(express.json({ limit: "10mb" })); // JSON body parser
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ── Custom middleware examples ─────────────────────
// Request ID
app.use((req, res, next) => {
  req.id = crypto.randomUUID();
  res.setHeader("X-Request-ID", req.id);
  next();
});

// Request timing
app.use((req, res, next) => {
  req.startTime = Date.now();
  res.on("finish", () => {
    console.log(\`\${req.method} \${req.path} \${res.statusCode} \${Date.now() - req.startTime}ms\`);
  });
  next();
});

// ── Route-specific middleware ──────────────────────
const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

app.post("/api/users", auth, validateBody(userSchema), createUser);

// ── Async error wrapper ────────────────────────────
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get("/api/users", asyncHandler(async (req, res) => {
  const users = await UserService.getAll(); // errors auto-forwarded to error handler
  res.json(users);
}));

// ── Global error handler (must have 4 params) ──────
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error:   err.message || "Internal server error",
    code:    err.code,
    requestId: req.id,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});`,
  },
  {
    q: "What is Node.js caching strategies and Redis integration?",
    a: "Caching reduces database load and improves response times. Redis is the most popular in-memory cache for Node.js. Common patterns: cache-aside (check cache first, fallback to DB), write-through (write to cache and DB), and cache invalidation strategies.",
    code: `const { createClient } = require("redis");   // npm install redis
const express          = require("express");

// ── Redis connection ───────────────────────────────
const redis = createClient({
  socket: { host: process.env.REDIS_HOST || "localhost", port: 6379 },
  password: process.env.REDIS_PASSWORD,
});
await redis.connect();
redis.on("error", err => console.error("Redis error:", err));

// ── Cache service ─────────────────────────────────
class CacheService {
  constructor(client, defaultTTL = 300) {
    this.client     = client;
    this.defaultTTL = defaultTTL;
  }

  async get(key) {
    const val = await this.client.get(key);
    return val ? JSON.parse(val) : null;
  }

  async set(key, value, ttl = this.defaultTTL) {
    await this.client.setEx(key, ttl, JSON.stringify(value));
  }

  async del(key)               { await this.client.del(key); }
  async delPattern(pattern)    {
    const keys = await this.client.keys(pattern);
    if (keys.length) await this.client.del(keys);
  }
  async exists(key)            { return (await this.client.exists(key)) === 1; }
}

const cache = new CacheService(redis);

// ── Cache-aside pattern ────────────────────────────
async function getUserById(id) {
  const cacheKey = \`user:\${id}\`;

  // 1. Check cache
  const cached = await cache.get(cacheKey);
  if (cached) return { ...cached, fromCache: true };

  // 2. Fetch from DB
  const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  if (!user) return null;

  // 3. Store in cache (5 min TTL)
  await cache.set(cacheKey, user, 300);
  return user;
}

// ── Cache invalidation on update ───────────────────
async function updateUser(id, data) {
  const user = await db.query("UPDATE users SET ... WHERE id = $1 RETURNING *", [id]);
  await cache.del(\`user:\${id}\`);        // invalidate specific user
  await cache.delPattern("users:list:*"); // invalidate all list caches
  return user;
}

// ── Express cache middleware ───────────────────────
const cacheMiddleware = (ttl = 60) => async (req, res, next) => {
  if (req.method !== "GET") return next();
  const key    = \`cache:\${req.originalUrl}\`;
  const cached = await cache.get(key);
  if (cached) {
    res.setHeader("X-Cache", "HIT");
    return res.json(cached);
  }
  const originalJson = res.json.bind(res);
  res.json = async (data) => {
    await cache.set(key, data, ttl);
    res.setHeader("X-Cache", "MISS");
    return originalJson(data);
  };
  next();
};

app.get("/api/products", cacheMiddleware(300), getProducts);

// ── Session storage with Redis ────────────────────
const session      = require("express-session");
const RedisStore   = require("connect-redis").default;
app.use(session({
  store:             new RedisStore({ client: redis }),
  secret:            process.env.SESSION_SECRET,
  resave:            false,
  saveUninitialized: false,
  cookie:            { secure: true, httpOnly: true, maxAge: 86400000 },
}));`,
  },
  {
    q: "What is WebSocket implementation in Node.js?",
    a: "WebSockets provide persistent, full-duplex communication between client and server. The ws library is the most popular low-level WebSocket library for Node.js. Socket.io adds namespaces, rooms, auto-reconnection, and fallback to long-polling over ws.",
    code: `const { WebSocketServer, WebSocket } = require("ws"); // npm install ws
const http = require("http");

// ── Basic WebSocket server ────────────────────────
const server = http.createServer();
const wss    = new WebSocketServer({ server });

// Track all connected clients
const clients = new Map(); // id → ws

wss.on("connection", (ws, req) => {
  const clientId = crypto.randomUUID();
  const ip       = req.socket.remoteAddress;
  clients.set(clientId, ws);
  console.log(\`Client \${clientId} connected from \${ip}\`);

  // Heartbeat - detect broken connections
  ws.isAlive = true;
  ws.on("pong", () => { ws.isAlive = true; });

  ws.on("message", (data, isBinary) => {
    const message = isBinary ? data : data.toString();
    try {
      const parsed = JSON.parse(message);
      handleMessage(clientId, ws, parsed);
    } catch {
      ws.send(JSON.stringify({ error: "Invalid JSON" }));
    }
  });

  ws.on("close", (code, reason) => {
    clients.delete(clientId);
    console.log(\`Client \${clientId} disconnected: \${code}\`);
  });

  ws.on("error", err => console.error(\`Client \${clientId} error:\`, err));

  // Send welcome message
  ws.send(JSON.stringify({ type: "CONNECTED", clientId }));
});

function handleMessage(clientId, ws, message) {
  switch (message.type) {
    case "CHAT":    broadcast({ type: "CHAT", from: clientId, text: message.text }); break;
    case "PING":    ws.send(JSON.stringify({ type: "PONG" })); break;
    case "JOIN":    joinRoom(clientId, message.room); break;
  }
}

// Broadcast to all connected clients
function broadcast(data, excludeId) {
  const payload = JSON.stringify(data);
  clients.forEach((ws, id) => {
    if (id !== excludeId && ws.readyState === WebSocket.OPEN) {
      ws.send(payload);
    }
  });
}

// Heartbeat interval - remove dead connections
setInterval(() => {
  wss.clients.forEach(ws => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

server.listen(3000);

// ── Socket.io (higher level) ──────────────────────
const { Server }     = require("socket.io"); // npm install socket.io
const io             = new Server(httpServer, { cors: { origin: "*" } });

io.use((socket, next) => { // middleware
  const token = socket.handshake.auth.token;
  try { socket.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { next(new Error("Authentication error")); }
});

io.on("connection", (socket) => {
  socket.join(\`user:\${socket.user.id}\`); // private room

  socket.on("joinRoom",   room  => socket.join(room));
  socket.on("leaveRoom",  room  => socket.leave(room));
  socket.on("chatMessage", ({ room, text }) => {
    io.to(room).emit("message", { from: socket.user.id, text, time: Date.now() });
  });

  // Emit to specific user from anywhere
  io.to(\`user:\${userId}\`).emit("notification", { message: "You have a new message" });
});`,
  },
  {
    q: "What is error handling in Node.js applications?",
    a: "Robust error handling in Node.js covers synchronous errors (try/catch), async errors (Promise rejection, async/await), operational vs programmer errors, custom error classes, centralized error handling, process-level uncaught exception handlers, and graceful shutdown.",
    code: `// ── Custom error classes ──────────────────────────
class AppError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name       = this.constructor.name;
    this.status     = options.status     ?? 500;
    this.code       = options.code       ?? "INTERNAL_ERROR";
    this.isOperational = options.isOperational ?? true; // vs programmer error
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError     extends AppError {
  constructor(resource) {
    super(\`\${resource} not found\`, { status: 404, code: "NOT_FOUND" });
  }
}
class ValidationError   extends AppError {
  constructor(message, field) {
    super(message, { status: 400, code: "VALIDATION_ERROR" });
    this.field = field;
  }
}
class UnauthorizedError extends AppError {
  constructor() { super("Unauthorized", { status: 401, code: "UNAUTHORIZED" }); }
}
class ForbiddenError    extends AppError {
  constructor() { super("Forbidden", { status: 403, code: "FORBIDDEN" }); }
}

// ── Global error handler ──────────────────────────
function handleError(err, req, res, next) {
  // Log all errors
  logger.error({ err, req: { method: req.method, url: req.url, id: req.id } });

  // Send to monitoring (Sentry, Datadog)
  if (!err.isOperational) Sentry.captureException(err);

  const status  = err.status  ?? 500;
  const message = err.isOperational ? err.message : "Internal server error";

  res.status(status).json({
    error:     message,
    code:      err.code,
    ...(err.field   && { field:   err.field }),
    ...(err.details && { details: err.details }),
    requestId: req.id,
  });
}

// ── Process-level error handling ──────────────────
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
  Sentry.captureException(err);
  // Programmer error - must restart
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("UNHANDLED REJECTION:", reason);
  Sentry.captureException(reason);
  process.exit(1); // Treat as fatal in production
});

// ── Graceful shutdown ──────────────────────────────
async function gracefulShutdown(signal) {
  console.log(\`\${signal} received. Starting graceful shutdown...\`);
  server.close(async () => {
    console.log("HTTP server closed");
    await db.pool.end();       // close DB connections
    await redis.disconnect();  // close cache connections
    console.log("All connections closed. Exiting.");
    process.exit(0);
  });
  setTimeout(() => { console.error("Force exit"); process.exit(1); }, 30000);
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT",  () => gracefulShutdown("SIGINT"));`,
  },

  // ─── INTERMEDIATE-ADVANCED ─────────────────────────────────
  {
    q: "What is Node.js authentication with JWT and refresh tokens?",
    a: "JWT-based authentication uses short-lived access tokens (15min) and long-lived refresh tokens (7 days). Access tokens authenticate requests. Refresh tokens obtain new access tokens without re-login. Refresh tokens are stored in httpOnly cookies or a database for revocation.",
    code: `const jwt    = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");

const router = express.Router();

// ── Token generation ──────────────────────────────
function generateTokens(userId, role) {
  const accessToken = jwt.sign(
    { sub: userId, role, type: "access" },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { sub: userId, type: "refresh", jti: crypto.randomUUID() },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
}

// ── Login ──────────────────────────────────────────
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const { accessToken, refreshToken } = generateTokens(user.id, user.role);

  // Store hashed refresh token in DB (allows revocation)
  const hashedRefresh = await bcrypt.hash(refreshToken, 10);
  await db.query(
    "INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)",
    [user.id, hashedRefresh, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)]
  );

  // Set refresh token as httpOnly cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, secure: true, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken, user: { id: user.id, name: user.name, role: user.role } });
});

// ── Refresh token endpoint ────────────────────────
router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.status(401).json({ error: "No refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    if (decoded.type !== "refresh") throw new Error("Invalid token type");

    // Verify against DB (check not revoked)
    const stored = await db.query(
      "SELECT * FROM refresh_tokens WHERE user_id = $1 AND expires_at > NOW()",
      [decoded.sub]
    );
    const validToken = stored.rows.find(r => bcrypt.compareSync(refreshToken, r.token_hash));
    if (!validToken) return res.status(403).json({ error: "Refresh token revoked" });

    // Rotate: delete old, issue new
    await db.query("DELETE FROM refresh_tokens WHERE id = $1", [validToken.id]);
    const user = await User.findById(decoded.sub);
    const tokens = generateTokens(user.id, user.role);
    const newHash = await bcrypt.hash(tokens.refreshToken, 10);
    await db.query("INSERT INTO refresh_tokens ...", [user.id, newHash, ...]);

    res.cookie("refreshToken", tokens.refreshToken, { httpOnly: true, secure: true, sameSite: "strict" });
    res.json({ accessToken: tokens.accessToken });
  } catch {
    res.status(403).json({ error: "Invalid refresh token" });
  }
});

// ── Auth middleware ───────────────────────────────
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: err.name === "TokenExpiredError" ? "Token expired" : "Invalid token" });
  }
};`,
  },
  {
    q: "What is Node.js logging and monitoring best practices?",
    a: "Production Node.js applications need structured logging (JSON), log levels, correlation IDs, performance monitoring, health checks, and error tracking. Winston and Pino are popular logging libraries. Structured logs integrate with log aggregators like ELK Stack, Datadog, and CloudWatch.",
    code: `const pino    = require("pino");       // npm install pino pino-http
const winston = require("winston");    // npm install winston
const express = require("express");

// ── Pino logger (fastest) ─────────────────────────
const logger = pino({
  level:     process.env.LOG_LEVEL || "info",
  transport: process.env.NODE_ENV === "development"
    ? { target: "pino-pretty", options: { colorize: true } }
    : undefined, // production: raw JSON to stdout
  base:      { pid: process.pid, hostname: os.hostname() },
  redact:    ["*.password", "*.token", "*.authorization"], // hide secrets
});

// Child loggers with context
const requestLogger = logger.child({ component: "http" });
const dbLogger      = logger.child({ component: "database" });

// ── Winston logger ────────────────────────────────
const winstonLogger = winston.createLogger({
  level:  "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: "my-api" },
  transports: [
    new winston.transports.Console({
      format: process.env.NODE_ENV === "development"
        ? winston.format.simple() : winston.format.json()
    }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// ── Request logging middleware ────────────────────
const pinoHttp = require("pino-http");
app.use(pinoHttp({
  logger,
  customLogLevel: (req, res, err) =>
    res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info",
  customSuccessMessage: (req, res) => \`\${req.method} \${req.url} - \${res.statusCode}\`,
  genReqId: req => req.headers["x-request-id"] || crypto.randomUUID(),
}));

// ── Health check endpoint ─────────────────────────
app.get("/health", async (req, res) => {
  const checks = await Promise.allSettled([
    db.query("SELECT 1"),                       // DB health
    redis.ping(),                               // Cache health
  ]);

  const health = {
    status:    checks.every(c => c.status === "fulfilled") ? "healthy" : "degraded",
    timestamp: new Date().toISOString(),
    uptime:    process.uptime(),
    memory:    process.memoryUsage(),
    checks: {
      database: checks[0].status === "fulfilled" ? "ok" : "error",
      cache:    checks[1].status === "fulfilled" ? "ok" : "error",
    },
  };

  res.status(health.status === "healthy" ? 200 : 503).json(health);
});

// ── Performance monitoring ────────────────────────
app.use((req, res, next) => {
  const start = process.hrtime.bigint();
  res.on("finish", () => {
    const duration = Number(process.hrtime.bigint() - start) / 1e6; // ms
    if (duration > 1000) logger.warn({ duration, path: req.path }, "Slow request");
    metrics.histogram("http_request_duration_ms", duration, { method: req.method, route: req.route?.path });
  });
  next();
});`,
  },
  {
    q: "What is the Node.js Bull/BullMQ queue for background jobs?",
    a: "Queue systems decouple time-consuming work from HTTP request handling. BullMQ uses Redis as a backend to manage job queues, retries, scheduling, and concurrency. Jobs can be email sending, image processing, report generation, and any async work.",
    code: `const { Queue, Worker, QueueEvents, FlowProducer } = require("bullmq"); // npm install bullmq
const { createClient } = require("redis");

const connection = { host: "localhost", port: 6379 };

// ── Define queues ──────────────────────────────────
const emailQueue   = new Queue("emails",     { connection });
const imageQueue   = new Queue("images",     { connection });
const reportQueue  = new Queue("reports",    { connection });

// ── Add jobs ───────────────────────────────────────
async function sendWelcomeEmail(userId, email) {
  await emailQueue.add("welcome-email", { userId, email }, {
    attempts:      3,                    // retry up to 3 times
    backoff:       { type: "exponential", delay: 2000 }, // 2s, 4s, 8s
    removeOnComplete: { count: 100 },    // keep last 100 completed jobs
    removeOnFail:     { count: 200 },    // keep last 200 failed jobs
    delay:         0,                    // immediate
  });
}

async function scheduleReport(userId) {
  await reportQueue.add("generate-report", { userId }, {
    delay:    5 * 60 * 1000,  // run in 5 minutes
    repeat:   { pattern: "0 9 * * *" }, // cron: every day at 9am
  });
}

// ── Process jobs ───────────────────────────────────
const emailWorker = new Worker("emails", async (job) => {
  const { userId, email } = job.data;

  // Update progress
  await job.updateProgress(10);
  const user = await User.findById(userId);

  await job.updateProgress(50);
  await sendEmail({ to: email, subject: "Welcome!", template: "welcome", data: user });

  await job.updateProgress(100);
  return { sent: true, timestamp: Date.now() };

}, {
  connection,
  concurrency: 5,   // process 5 jobs simultaneously
  limiter:     { max: 100, duration: 60000 }, // max 100 per minute
});

// Worker events
emailWorker.on("completed", (job, result) => {
  console.log(\`Job \${job.id} completed:, result\`);
});
emailWorker.on("failed", (job, err) => {
  console.error(\`Job \${job.id} failed:\`, err.message);
});
emailWorker.on("progress", (job, progress) => {
  console.log(\`Job \${job.id} progress: \${progress}%\`);
});

// ── Queue events for monitoring ───────────────────
const queueEvents = new QueueEvents("emails", { connection });
queueEvents.on("completed", ({ jobId }) => console.log(\`Email job \${jobId} done\`));
queueEvents.on("failed",    ({ jobId, failedReason }) =>
  logger.error(\`Email job \${jobId} failed: \${failedReason}\`));

// ── Job flow (dependent jobs) ──────────────────────
const flow = new FlowProducer({ connection });
await flow.add({
  name: "process-order",
  queueName: "orders",
  data: { orderId: 123 },
  children: [
    { name: "charge-payment", queueName: "payments", data: { orderId: 123 } },
    { name: "reserve-stock",  queueName: "inventory", data: { orderId: 123 } },
  ],
});`,
  },
  {
    q: "What is Node.js microservices architecture and communication patterns?",
    a: "Microservices split applications into small, independently deployable services. Node.js microservices communicate via HTTP/REST, gRPC (high performance), or message queues (async). Service discovery, load balancing, and distributed tracing are key concerns.",
    code: `// ── HTTP communication ────────────────────────────
const axios = require("axios");

class UserServiceClient {
  constructor(baseUrl = process.env.USER_SERVICE_URL) {
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: 5000,
      headers: { "X-Service-Name": "order-service" },
    });
    // Add service-to-service auth
    this.client.interceptors.request.use(config => {
      config.headers["X-Service-Token"] = generateServiceToken();
      return config;
    });
  }

  async getUser(id) {
    const { data } = await this.client.get(\`/users/\${id}\`);
    return data;
  }
}

// ── gRPC communication ────────────────────────────
const grpc     = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// user.proto:
// service UserService {
//   rpc GetUser(GetUserRequest) returns (User);
//   rpc ListUsers(ListUsersRequest) returns (stream User);
// }

const packageDef = protoLoader.loadSync("./protos/user.proto");
const proto      = grpc.loadPackageDefinition(packageDef);

// gRPC server
const server = new grpc.Server();
server.addService(proto.UserService.service, {
  getUser:   (call, cb) => cb(null, { id: call.request.id, name: "Alice" }),
  listUsers: (call) => {
    users.forEach(u => call.write(u));
    call.end();
  },
});
server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => server.start());

// gRPC client
const userClient = new proto.UserService("localhost:50051", grpc.credentials.createInsecure());

// ── Message queue (RabbitMQ via amqplib) ──────────
const amqplib = require("amqplib"); // npm install amqplib

async function setupMessageBus() {
  const conn    = await amqplib.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();

  // Publisher
  await channel.assertExchange("events", "topic", { durable: true });

  function publish(routingKey, data) {
    channel.publish("events", routingKey,
      Buffer.from(JSON.stringify(data)),
      { persistent: true, messageId: crypto.randomUUID() }
    );
  }

  // Consumer
  await channel.assertQueue("order-service-events", { durable: true });
  await channel.bindQueue("order-service-events", "events", "user.*");
  channel.prefetch(10); // process 10 messages at a time

  channel.consume("order-service-events", async (msg) => {
    if (!msg) return;
    const event = JSON.parse(msg.content.toString());
    try {
      await handleEvent(event);
      channel.ack(msg);
    } catch (err) {
      channel.nack(msg, false, false); // dead letter
    }
  });

  return { publish };
}`,
  },

  // ─── ADVANCED ───────────────────────────────────────────────
  {
    q: "What is Node.js performance profiling and optimization?",
    a: "Node.js performance profiling identifies CPU bottlenecks, memory leaks, and event loop blocking. Tools include the built-in profiler (--prof), V8 inspector, clinic.js, 0x, and APM tools. Optimization involves avoiding sync operations, managing memory, and using native modules.",
    code: `// ── Built-in profiler ────────────────────────────
// node --prof server.js
// node --prof-process isolate-*.log > processed.txt

// ── V8 inspector / Chrome DevTools ───────────────
// node --inspect server.js
// node --inspect-brk server.js (break on start)
// Open chrome://inspect in Chrome

// ── Measuring event loop lag ──────────────────────
function measureEventLoopLag() {
  const INTERVAL = 1000; // 1 second
  let last = Date.now();
  setInterval(() => {
    const now = Date.now();
    const lag = now - last - INTERVAL;
    if (lag > 100) console.warn(\`Event loop lag: \${lag}ms\`);
    last = now;
  }, INTERVAL);
}
measureEventLoopLag();

// With perf_hooks
const { monitorEventLoopDelay } = require("perf_hooks");
const histogram = monitorEventLoopDelay({ resolution: 20 });
histogram.enable();
setInterval(() => {
  console.log("Mean EL delay:", histogram.mean / 1e6, "ms");
  console.log("Max EL delay:",  histogram.max  / 1e6, "ms");
  histogram.reset();
}, 5000);

// ── Heap memory profiling ─────────────────────────
const v8     = require("v8");
const { writeHeapSnapshot } = require("v8");
// Trigger heap snapshot
writeHeapSnapshot(); // analyze in Chrome DevTools Memory tab

// Memory usage tracking
setInterval(() => {
  const { heapUsed, heapTotal, rss, external } = process.memoryUsage();
  if (heapUsed > 500 * 1024 * 1024) { // > 500MB
    logger.warn({
      heapUsed:  Math.round(heapUsed  / 1e6) + "MB",
      heapTotal: Math.round(heapTotal / 1e6) + "MB",
      rss:       Math.round(rss       / 1e6) + "MB",
    }, "High memory usage");
  }
}, 30000);

// ── Avoiding blocking ─────────────────────────────
// ❌ Blocking - freezes event loop
function badSort(arr) {
  return arr.sort(); // CPU bound, blocks everything
}

// ✅ Use Worker Thread for CPU work
const { Worker } = require("worker_threads");
async function sortInWorker(arr) {
  return new Promise((resolve, reject) => {
    const w = new Worker(\`
      const { parentPort, workerData } = require("worker_threads");
      parentPort.postMessage(workerData.arr.sort());
    \`, { eval: true, workerData: { arr } });
    w.once("message", resolve);
    w.once("error", reject);
  });
}

// ── Clinic.js (external tool) ─────────────────────
// npm install -g clinic
// clinic doctor -- node server.js    (overall diagnosis)
// clinic flame  -- node server.js    (CPU flamegraph)
// clinic bubbleprof -- node server.js (async profiling)`,
  },
  {
    q: "What is Node.js security best practices?",
    a: "Node.js application security covers: input validation, SQL injection prevention, XSS protection, CSRF protection, secure headers, rate limiting, dependency auditing, secrets management, and OWASP Top 10 mitigations. Never trust user input and always validate/sanitize.",
    code: `const express    = require("express");
const helmet     = require("helmet");
const rateLimit  = require("express-rate-limit");
const { body, validationResult } = require("express-validator");
const hpp        = require("hpp");        // HTTP parameter pollution
const xss        = require("xss-clean"); // XSS sanitization

const app = express();

// ── Security headers (helmet) ─────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'", "'nonce-<random>'"],
      styleSrc:   ["'self'", "https://fonts.googleapis.com"],
      imgSrc:     ["'self'", "data:", "https:"],
    },
  },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
}));

// ── Input validation with express-validator ────────
app.post("/api/users",
  body("name").trim().isLength({ min: 1, max: 100 }).escape(),
  body("email").isEmail().normalizeEmail(),
  body("age").isInt({ min: 0, max: 150 }),
  body("url").optional().isURL({ protocols: ["https"] }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  createUser
);

// ── SQL injection prevention ──────────────────────
// ❌ NEVER do this:
const bad  = \`SELECT * FROM users WHERE id = \${req.params.id}\`;

// ✅ Use parameterized queries:
const good = await db.query("SELECT * FROM users WHERE id = $1", [req.params.id]);

// ── Path traversal prevention ──────────────────────
app.get("/files/:name", (req, res) => {
  const filename = path.basename(req.params.name); // removes ../
  const filepath = path.join(__dirname, "uploads", filename);
  if (!filepath.startsWith(path.join(__dirname, "uploads"))) {
    return res.status(403).send("Forbidden");
  }
  res.sendFile(filepath);
});

// ── Environment secrets ───────────────────────────
// .env file with dotenv
require("dotenv").config();
// NEVER: console.log(process.env) in production
// NEVER: commit .env to git
// Use: AWS Secrets Manager, Vault, or env var injection

// ── Dependency security ───────────────────────────
// npm audit              ← check for vulnerabilities
// npm audit fix          ← auto-fix
// npm outdated           ← check outdated packages
// npx snyk test          ← deeper analysis

// ── CSRF protection ───────────────────────────────
const csrf = require("csurf");
app.use(csrf({ cookie: { httpOnly: true, secure: true, sameSite: "strict" } }));
app.get("/form", (req, res) => res.render("form", { csrfToken: req.csrfToken() }));

// ── NoSQL injection prevention (MongoDB) ──────────
// ❌ Vulnerable
User.findOne({ email: req.body.email }); // { email: { $gt: "" } } attack!

// ✅ Sanitize
const mongoSanitize = require("express-mongo-sanitize");
app.use(mongoSanitize()); // removes $ and . from inputs`,
  },
  {
    q: "What is GraphQL server implementation in Node.js?",
    a: "GraphQL provides a flexible query language for APIs. Apollo Server and Yoga are popular Node.js GraphQL servers. Key concepts: schema definition (SDL), resolvers, context, dataloaders (N+1 prevention), subscriptions, and schema stitching.",
    code: `const { ApolloServer, gql } = require("@apollo/server"); // npm install @apollo/server
const { startStandaloneServer } = require("@apollo/server/standalone");
const DataLoader = require("dataloader"); // npm install dataloader

// ── Schema definition ─────────────────────────────
const typeDefs = gql\`
  type User {
    id:       ID!
    name:     String!
    email:    String!
    posts:    [Post!]!
    createdAt: String!
  }

  type Post {
    id:      ID!
    title:   String!
    content: String!
    author:  User!
    tags:    [String!]!
  }

  input CreateUserInput {
    name:     String!
    email:    String!
    password: String!
  }

  input CreatePostInput {
    title:   String!
    content: String!
    tags:    [String!]
  }

  type Query {
    user(id: ID!):     User
    users(page: Int, limit: Int): [User!]!
    post(id: ID!):     Post
    posts(search: String): [Post!]!
    me:                User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    createPost(input: CreatePostInput!): Post!
    updateUser(id: ID!, name: String):   User!
    deletePost(id: ID!):                 Boolean!
  }

  type Subscription {
    postCreated: Post!
    userOnline(userId: ID!): Boolean!
  }
\`;

// ── Resolvers ─────────────────────────────────────
const resolvers = {
  Query: {
    user:  async (_, { id }, { dataloaders }) => dataloaders.user.load(id),
    users: async (_, { page = 1, limit = 10 }) => UserService.findAll({ page, limit }),
    me:    async (_, __, { user }) => {
      if (!user) throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHENTICATED" } });
      return user;
    },
  },

  Mutation: {
    createUser: async (_, { input }) => {
      const hashed = await bcrypt.hash(input.password, 12);
      return UserService.create({ ...input, password: hashed });
    },
    createPost: async (_, { input }, { user }) => {
      if (!user) throw new GraphQLError("Unauthorized");
      return PostService.create({ ...input, authorId: user.id });
    },
  },

  // Field resolvers
  User: {
    posts: async (parent, _, { dataloaders }) =>
      dataloaders.postsByUser.load(parent.id), // N+1 solved by DataLoader
  },

  Post: {
    author: async (parent, _, { dataloaders }) =>
      dataloaders.user.load(parent.authorId),
  },
};

// ── DataLoader (solves N+1 problem) ───────────────
function createDataLoaders() {
  return {
    user: new DataLoader(async (ids) => {
      const users = await User.findMany({ id: { in: ids } });
      return ids.map(id => users.find(u => u.id === id) ?? null);
    }),
    postsByUser: new DataLoader(async (userIds) => {
      const posts = await Post.findMany({ authorId: { in: userIds } });
      return userIds.map(id => posts.filter(p => p.authorId === id));
    }),
  };
}

// ── Server setup ──────────────────────────────────
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    logger.error(err);
    return process.env.NODE_ENV === "production"
      ? { message: err.message, code: err.extensions?.code }
      : err;
  },
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({
    user:        await authenticate(req),
    dataloaders: createDataLoaders(), // new instance per request
  }),
});`,
  },
  {
    q: "What is server-sent events and real-time features in Node.js?",
    a: "Server-Sent Events (SSE) provide one-way real-time communication from server to client over HTTP. Simpler than WebSockets for push-only scenarios. Combined with Redis pub/sub, SSE scales across multiple Node.js instances.",
    code: `const express = require("express");
const { createClient } = require("redis");
const app     = express();

// ── Basic SSE endpoint ────────────────────────────
app.get("/api/events", async (req, res) => {
  // Set SSE headers
  res.setHeader("Content-Type",  "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection",    "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // disable nginx buffering
  res.flushHeaders();

  // Helper to send events
  const send = (event, data, id) => {
    if (id)    res.write(\`id: \${id}\n\`);
    if (event) res.write(\`event: \${event}\n\`);
    res.write(\`data: \${JSON.stringify(data)}\n\n\`);
  };

  send("connected", { message: "Connected to event stream" });

  // Send periodic heartbeat to keep connection alive
  const heartbeat = setInterval(() => res.write(":heartbeat\n\n"), 15000);

  // ── Scale with Redis pub/sub ───────────────────
  const subscriber = createClient({ /* redis config */ });
  await subscriber.connect();
  await subscriber.subscribe("app-events", (message) => {
    const event = JSON.parse(message);
    send(event.type, event.data, event.id);
  });

  // Handle client disconnect
  req.on("close", async () => {
    clearInterval(heartbeat);
    await subscriber.unsubscribe("app-events");
    await subscriber.disconnect();
    console.log("SSE client disconnected");
  });
});

// ── Publisher service ──────────────────────────────
class EventPublisher {
  constructor() {
    this.publisher = createClient();
    this.publisher.connect();
  }

  async publish(type, data) {
    await this.publisher.publish("app-events", JSON.stringify({
      type, data, id: Date.now(), timestamp: new Date().toISOString()
    }));
  }
}

const publisher = new EventPublisher();

// Publish on DB change
app.post("/api/orders", async (req, res) => {
  const order = await OrderService.create(req.body);
  await publisher.publish("order:created", { orderId: order.id, status: order.status });
  res.status(201).json(order);
});

// ── Client-side usage ─────────────────────────────
// const es = new EventSource("/api/events", { withCredentials: true });
// es.addEventListener("order:created", e => console.log(JSON.parse(e.data)));
// es.addEventListener("error", e => { if (es.readyState === EventSource.CLOSED) reconnect(); });`,
  },
  {
    q: "What is Node.js testing with Jest and Supertest?",
    a: "Node.js testing uses Jest for unit/integration tests, Supertest for HTTP testing, and various mocking strategies. Key patterns: unit testing services, integration testing routes with a test database, mocking external services, and measuring code coverage.",
    code: `const request    = require("supertest"); // npm install supertest
const { jest }   = require("@jest/globals");
const app        = require("../src/app");  // Express app
const db         = require("../src/db");
const redis      = require("../src/redis");

// ── jest.config.js ────────────────────────────────
// {
//   testEnvironment: "node",
//   coverageThreshold: { global: { lines: 80, branches: 75 } },
//   setupFilesAfterEach: ["./jest.setup.js"],
//   testTimeout: 10000,
// }

// ── Service unit test ─────────────────────────────
describe("UserService", () => {
  let userService;
  let mockDb;

  beforeEach(() => {
    mockDb      = { query: jest.fn() };
    userService = new UserService(mockDb);
  });

  describe("findById", () => {
    it("should return user when found", async () => {
      const mockUser = { id: 1, name: "Alice", email: "alice@example.com" };
      mockDb.query.mockResolvedValue({ rows: [mockUser] });

      const result = await userService.findById(1);

      expect(mockDb.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE id = $1",
        [1]
      );
      expect(result).toEqual(mockUser);
    });

    it("should return null when not found", async () => {
      mockDb.query.mockResolvedValue({ rows: [] });
      expect(await userService.findById(999)).toBeNull();
    });
  });
});

// ── HTTP integration test ─────────────────────────
describe("GET /api/users/:id", () => {
  beforeAll(async () => {
    await db.connect();
    await db.query("BEGIN");
  });
  afterAll(async () => {
    await db.query("ROLLBACK");
    await db.disconnect();
  });

  it("should return 200 with user data", async () => {
    const user = await db.query(
      "INSERT INTO users (name, email) VALUES ($1,$2) RETURNING *",
      ["Alice", "alice@test.com"]
    );

    const res = await request(app)
      .get(\`/api/users/\${user.rows[0].id}\`)
      .set("Authorization", \`Bearer \${generateTestToken()}\`)
      .expect(200)
      .expect("Content-Type", /json/);

    expect(res.body).toMatchObject({ name: "Alice", email: "alice@test.com" });
    expect(res.body.password).toBeUndefined();
  });

  it("should return 404 for non-existent user", async () => {
    await request(app).get("/api/users/99999")
      .set("Authorization", \`Bearer \${generateTestToken()}\`)
      .expect(404)
      .expect(res => expect(res.body.error).toBe("User not found"));
  });
});

// ── Mocking external services ─────────────────────
jest.mock("../src/services/email.service");
const emailService = require("../src/services/email.service");

it("should send welcome email on registration", async () => {
  emailService.send = jest.fn().mockResolvedValue({ messageId: "123" });

  await request(app).post("/api/auth/register")
    .send({ name: "Bob", email: "bob@test.com", password: "Password1!" })
    .expect(201);

  expect(emailService.send).toHaveBeenCalledWith(
    expect.objectContaining({ to: "bob@test.com", subject: expect.stringContaining("Welcome") })
  );
});`,
  },
  {
    q: "What is Node.js deployment and Docker containerization?",
    a: "Production Node.js deployment uses Docker for containerization, PM2 or cluster for process management, environment-based configuration, and CI/CD pipelines. Docker enables consistent environments, easy scaling, and cloud deployment on AWS, GCP, or Azure.",
    code: `# ── Dockerfile (multi-stage build) ──────────────────
# Stage 1: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production   # install only prod dependencies
COPY . .
RUN npm run build 2>/dev/null || true  # build if script exists

# Stage 2: Production
FROM node:20-alpine AS production
# Security: run as non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
WORKDIR /app

# Copy only what's needed
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/dist         ./dist
COPY --from=builder --chown=nodejs:nodejs /app/package.json ./

USER nodejs
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', r => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

CMD ["node", "dist/server.js"]`,
    code: `// ── docker-compose.yml ───────────────────────────
// version: "3.9"
// services:
//   api:
//     build:
//       context:  .
//       target:   production
//     environment:
//       - NODE_ENV=production
//       - DB_HOST=postgres
//       - REDIS_HOST=redis
//     ports:      ["3000:3000"]
//     depends_on: { postgres: { condition: service_healthy }, redis: { condition: service_started } }
//     restart:    unless-stopped
//     deploy:
//       replicas:  3
//       resources:
//         limits: { cpus: "1", memory: 512M }
//
//   postgres:
//     image: postgres:16-alpine
//     volumes:    ["pgdata:/var/lib/postgresql/data"]
//     healthcheck:
//       test: ["CMD-SHELL", "pg_isready -U postgres"]
//
//   redis:
//     image: redis:7-alpine
//     command: redis-server --appendonly yes

// ── PM2 ecosystem.config.js ───────────────────────
module.exports = {
  apps: [{
    name:           "api",
    script:         "dist/server.js",
    instances:      "max",           // use all CPU cores
    exec_mode:      "cluster",
    watch:          false,
    max_memory_restart: "500M",
    env_production: {
      NODE_ENV: "production",
      PORT:     3000,
    },
    error_file:     "logs/err.log",
    out_file:       "logs/out.log",
    merge_logs:     true,
    log_date_format:"YYYY-MM-DD HH:mm:ss",
  }],
};
// pm2 start ecosystem.config.js --env production
// pm2 reload api --env production  ← zero-downtime reload
// pm2 monit                        ← monitoring dashboard`,
  },
  {
    q: "What is Node.js with TypeScript setup and best practices?",
    a: "TypeScript with Node.js provides type safety, better IDE support, and catches errors at compile time. Setup involves tsconfig.json for compilation, ts-node or tsx for development, and esbuild or tsc for production builds. Path aliases improve import readability.",
    code: `// ── tsconfig.json ────────────────────────────────
// {
//   "compilerOptions": {
//     "target":           "ES2022",
//     "module":           "CommonJS",     // or "NodeNext" for ESM
//     "lib":              ["ES2022"],
//     "outDir":           "./dist",
//     "rootDir":          "./src",
//     "strict":           true,
//     "esModuleInterop":  true,
//     "resolveJsonModule":true,
//     "declaration":      true,
//     "sourceMap":        true,
//     "baseUrl":          ".",
//     "paths": {
//       "@/*":       ["src/*"],
//       "@config/*": ["src/config/*"],
//       "@models/*": ["src/models/*"]
//     },
//     "typeRoots":        ["./node_modules/@types", "./src/types"],
//     "skipLibCheck":     true,
//     "forceConsistentCasingInFileNames": true,
//     "noUnusedLocals":   true,
//     "noUnusedParameters": true,
//     "noImplicitReturns": true,
//   },
//   "include": ["src/**/*"],
//   "exclude": ["node_modules", "dist", "**/*.test.ts"]
// }

// ── Typed Express app ─────────────────────────────
import express, { Request, Response, NextFunction, Router } from "express";
import { ParamsDictionary }  from "express-serve-static-core";
import { ParsedQs }          from "qs";

// Extend Express types
declare global {
  namespace Express {
    interface Request {
      user?:    { id: string; role: "admin" | "user" };
      traceId?: string;
    }
  }
}

// Typed route handler
type AsyncHandler<P = ParamsDictionary, ResBody = any, ReqBody = any, Q = ParsedQs> =
  (req: Request<P, ResBody, ReqBody, Q>, res: Response<ResBody>, next: NextFunction) => Promise<void>;

const asyncHandler = <P = ParamsDictionary, ResBody = any, ReqBody = any>(
  fn: AsyncHandler<P, ResBody, ReqBody>
) => (req: Request<P, ResBody, ReqBody>, res: Response<ResBody>, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Typed router with params
interface UserParams { id: string; }
interface CreateUserBody { name: string; email: string; password: string; }

const router: Router = express.Router();

router.get("/:id", asyncHandler<UserParams>(async (req, res) => {
  const { id } = req.params; // string - typed!
  const user = await UserService.findById(id);
  if (!user) return res.status(404).json({ error: "Not found" } as any);
  res.json(user);
}));

router.post("/", asyncHandler<ParamsDictionary, any, CreateUserBody>(async (req, res) => {
  const { name, email, password } = req.body; // fully typed
  const user = await UserService.create({ name, email, password });
  res.status(201).json(user);
}));

// ── package.json scripts ──────────────────────────
// {
//   "scripts": {
//     "dev":   "tsx watch src/server.ts",        // fast dev with tsx
//     "build": "tsc --project tsconfig.json",
//     "start": "node dist/server.js",
//     "test":  "jest --passWithNoTests",
//     "lint":  "eslint src/**/*.ts"
//   }
// }`,
  },
  {
    q: "What is Node.js graceful shutdown and health checks?",
    a: "Graceful shutdown ensures in-flight requests complete before the server stops, database connections are closed cleanly, and queued jobs aren't lost. Health checks expose liveness and readiness endpoints for load balancers and container orchestrators like Kubernetes.",
    code: `const express = require("express");
const http    = require("http");
const app     = express();
const server  = http.createServer(app);

// Track active connections
let activeConnections = 0;
let isShuttingDown    = false;

server.on("connection", socket => {
  activeConnections++;
  socket.on("close", () => activeConnections--);
});

// ── Health check endpoints ─────────────────────────
// Liveness: is the process alive? (restart if failing)
app.get("/health/live", (req, res) => {
  if (isShuttingDown) return res.status(503).json({ status: "shutting down" });
  res.json({ status: "alive", uptime: process.uptime(), pid: process.pid });
});

// Readiness: is the app ready to receive traffic? (remove from LB if failing)
app.get("/health/ready", async (req, res) => {
  try {
    const checks = await Promise.all([
      db.query("SELECT 1").then(() => ({ db:    "ok" })),
      redis.ping().then(() =>     ({ cache: "ok" })),
    ]);
    res.json({
      status:    "ready",
      checks:    Object.assign({}, ...checks),
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(503).json({ status: "not ready", error: err.message });
  }
});

// Startup check (Kubernetes startupProbe)
let isStarted = false;
app.get("/health/startup", (req, res) => {
  if (!isStarted) return res.status(503).json({ status: "starting" });
  res.json({ status: "started" });
});

// ── Graceful shutdown ──────────────────────────────
async function gracefulShutdown(signal) {
  console.log(\`\${signal} received. Starting graceful shutdown...\`);
  isShuttingDown = true;

  // Stop accepting new connections
  server.close(async () => {
    console.log("HTTP server closed. Active connections:", activeConnections);
    try {
      await Promise.race([
        shutdownAllServices(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Shutdown timeout")), 25000)
        ),
      ]);
      console.log("Graceful shutdown complete");
      process.exit(0);
    } catch (err) {
      console.error("Forced shutdown:", err.message);
      process.exit(1);
    }
  });
}

async function shutdownAllServices() {
  await Promise.allSettled([
    db.pool.end().then(() => console.log("DB connections closed")),
    redis.disconnect().then(() => console.log("Redis disconnected")),
    emailWorker.close().then(() => console.log("Job queue closed")),
  ]);
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM")); // Kubernetes sends this
process.on("SIGINT",  () => gracefulShutdown("SIGINT"));  // Ctrl+C

server.listen(3000, async () => {
  await warmupConnections();
  isStarted = true;
  console.log("Server ready on port 3000");
});`,
  },
  {
    q: "What are Node.js design patterns for scalable applications?",
    a: "Node.js design patterns include Repository (data access abstraction), Service Layer (business logic), Factory (object creation), Strategy (interchangeable algorithms), Observer (event-driven), Circuit Breaker (fault tolerance), and Dependency Injection (testability). These create maintainable, scalable architectures.",
    code: `// ── Repository pattern ────────────────────────────
class UserRepository {
  constructor(db) { this.db = db; }
  async findById(id)         { return this.db.query("SELECT * FROM users WHERE id=$1", [id]).then(r => r.rows[0]); }
  async findByEmail(email)   { return this.db.query("SELECT * FROM users WHERE email=$1", [email]).then(r => r.rows[0]); }
  async create(data)         { return this.db.query("INSERT INTO users (name,email) VALUES($1,$2) RETURNING *", [data.name, data.email]).then(r => r.rows[0]); }
  async update(id, data)     { return this.db.query("UPDATE users SET name=$1 WHERE id=$2 RETURNING *", [data.name, id]).then(r => r.rows[0]); }
  async delete(id)           { return this.db.query("DELETE FROM users WHERE id=$1", [id]); }
}

// ── Service layer ──────────────────────────────────
class UserService {
  constructor(userRepo, emailService, cache) {
    this.repo         = userRepo;
    this.emailService = emailService;
    this.cache        = cache;
  }

  async register(dto) {
    const existing = await this.repo.findByEmail(dto.email);
    if (existing) throw new ConflictError("Email already registered");
    const hashed = await bcrypt.hash(dto.password, 12);
    const user   = await this.repo.create({ ...dto, password: hashed });
    await this.emailService.sendWelcome(user);
    return user;
  }

  async getProfile(id) {
    const key    = \`user:profile:\${id}\`;
    const cached = await this.cache.get(key);
    if (cached) return cached;
    const user = await this.repo.findById(id);
    if (!user) throw new NotFoundError("User");
    await this.cache.set(key, user, 300);
    return user;
  }
}

// ── Circuit Breaker ────────────────────────────────
class CircuitBreaker {
  constructor(fn, options = {}) {
    this.fn          = fn;
    this.state       = "CLOSED";  // CLOSED, OPEN, HALF_OPEN
    this.failures    = 0;
    this.threshold   = options.threshold   ?? 5;
    this.timeout     = options.timeout     ?? 60000;
    this.resetTimer  = null;
  }

  async call(...args) {
    if (this.state === "OPEN") throw new Error("Circuit breaker is OPEN");

    try {
      const result  = await this.fn(...args);
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      throw err;
    }
  }

  onSuccess() { this.failures = 0; this.state = "CLOSED"; }

  onFailure() {
    this.failures++;
    if (this.failures >= this.threshold) {
      this.state = "OPEN";
      console.warn("Circuit breaker OPENED");
      this.resetTimer = setTimeout(() => {
        this.state    = "HALF_OPEN";
        this.failures = 0;
      }, this.timeout);
    }
  }
}

// Usage
const breaker = new CircuitBreaker(
  () => fetch("https://external-api.com/data").then(r => r.json()),
  { threshold: 5, timeout: 30000 }
);

try {
  const data = await breaker.call();
} catch (err) {
  console.error("Service unavailable:", err.message);
  return getCachedFallback();
}`,
  },
];