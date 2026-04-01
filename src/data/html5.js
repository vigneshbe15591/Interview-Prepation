export const meta = {
  id: "html5",
  label: "HTML5",
  icon: "🌐",
  color: "#e34f26",
  desc: "The standard markup language for creating web pages and applications.",
};

export const qaData = [
  // ─── BEGINNER ────────────────────────────────────────────
  {
    q: "What is HTML5 and what are its key new features?",
    a: "HTML5 is the latest major version of HTML, introducing semantic elements, native audio/video support, Canvas, Web Storage, Web Workers, Geolocation, WebSockets, and improved form controls. It replaced Flash and plugin-based features with native browser capabilities.",
    code: `<!-- HTML5 document structure -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Page description for SEO" />
  <title>HTML5 Page</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>

  <!-- New semantic elements -->
  <header>...</header>
  <nav>...</nav>
  <main>
    <article>...</article>
    <aside>...</aside>
  </main>
  <footer>...</footer>

  <!-- Native media (no Flash needed) -->
  <video src="video.mp4" controls></video>
  <audio src="audio.mp3" controls></audio>

  <!-- Canvas for drawing -->
  <canvas id="myCanvas" width="400" height="300"></canvas>

  <!-- New input types -->
  <input type="date" />
  <input type="color" />
  <input type="range" />
  <input type="email" required />

  <script src="app.js"></script>
</body>
</html>

<!-- Key HTML5 features:
  ✅ Semantic elements (header, nav, main, article, section, aside, footer)
  ✅ Native audio/video
  ✅ Canvas 2D/3D (WebGL)
  ✅ Web Storage (localStorage, sessionStorage)
  ✅ Web Workers
  ✅ Geolocation API
  ✅ WebSockets
  ✅ Drag and Drop
  ✅ New form input types and validation
  ✅ History API
  ✅ Server-Sent Events
-->`,
  },
  {
    q: "What are semantic HTML elements and why are they important?",
    a: "Semantic elements have meaningful names that describe their content and purpose. They improve accessibility (screen readers), SEO (search engines understand structure), and code readability. Compare to generic div/span which have no inherent meaning.",
    code: `<!-- ❌ Non-semantic - no meaning, hard to understand -->
<div id="header">
  <div id="nav">
    <div class="nav-item"><a href="/">Home</a></div>
  </div>
</div>
<div id="main">
  <div class="post">
    <div class="post-title">Article Title</div>
    <div class="post-content">Content here...</div>
  </div>
</div>
<div id="footer">© 2024</div>

<!-- ✅ Semantic - meaningful, accessible, SEO-friendly -->
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Article Title</h1>
    <p>Content here...</p>
    <section>
      <h2>Section Heading</h2>
      <p>Section content...</p>
    </section>
  </article>

  <aside>
    <h2>Related Links</h2>
    <ul>...</ul>
  </aside>
</main>

<footer>
  <p>© 2024 My Website</p>
</footer>

<!-- Semantic elements and their purposes:
  <header>   - Introductory content, navigation
  <nav>      - Navigation links
  <main>     - Primary content (only one per page)
  <article>  - Self-contained content (blog post, news)
  <section>  - Thematic grouping of content
  <aside>    - Tangentially related content (sidebar)
  <footer>   - Footer for section or page
  <figure>   - Self-contained media with optional caption
  <figcaption> - Caption for figure
  <time>     - Date/time values
  <mark>     - Highlighted/relevant text
  <details>  - Expandable details
  <summary>  - Visible heading for details element
-->`,
  },
  {
    q: "What is the difference between div, section, article, and aside?",
    a: "div is a generic container with no semantic meaning. section groups related content with a heading. article is self-contained content that makes sense independently. aside holds content tangentially related to surrounding content.",
    code: `<!-- div: generic container, use when no semantic element fits -->
<div class="card">...</div>
<div class="flex-container">...</div>

<!-- section: thematic grouping, usually has a heading -->
<section>
  <h2>Our Services</h2>
  <p>We offer the following services...</p>
</section>

<section>
  <h2>Contact Us</h2>
  <form>...</form>
</section>

<!-- article: standalone content, can be distributed independently -->
<article>
  <header>
    <h1>How to Learn JavaScript</h1>
    <time datetime="2024-01-15">January 15, 2024</time>
    <address>By <a href="/author/alice">Alice</a></address>
  </header>
  <p>Learning JavaScript requires...</p>
  <footer>
    <p>Tags: <a href="/tag/js">JavaScript</a></p>
  </footer>
</article>

<!-- aside: related but not essential to main content -->
<main>
  <article>
    <h1>Main Article</h1>
    <p>Article content...</p>
  </article>

  <aside>
    <h2>Author Bio</h2>
    <p>Alice is a developer...</p>
  </aside>

  <aside>
    <h2>Related Articles</h2>
    <ul>
      <li><a href="/post/2">Post 2</a></li>
    </ul>
  </aside>
</main>

<!-- Nested articles (comments inside blog post) -->
<article>
  <h1>Blog Post</h1>
  <p>Post content...</p>
  <section>
    <h2>Comments</h2>
    <article>
      <h3>Comment by Bob</h3>
      <p>Great post!</p>
    </article>
  </section>
</article>`,
  },
  {
    q: "What are HTML5 form input types and validation attributes?",
    a: "HTML5 introduced many new input types (email, url, number, date, range, color, search, tel) and validation attributes (required, min, max, pattern, minlength, maxlength). These provide native validation and better mobile keyboards.",
    code: `<form novalidate id="registration">

  <!-- New input types -->
  <input type="email"    placeholder="user@example.com" required />
  <input type="url"      placeholder="https://example.com" />
  <input type="number"   min="0" max="100" step="5" value="50" />
  <input type="range"    min="0" max="100" step="10" />
  <input type="date"     min="2024-01-01" max="2024-12-31" />
  <input type="time"     min="09:00" max="18:00" />
  <input type="datetime-local" />
  <input type="month"    />
  <input type="week"     />
  <input type="color"    value="#f0c040" />
  <input type="tel"      pattern="[0-9]{10}" placeholder="0123456789" />
  <input type="search"   placeholder="Search..." />
  <input type="file"     accept=".pdf,.doc" multiple />

  <!-- Validation attributes -->
  <input type="text"
    required                    <!-- must have a value -->
    minlength="3"               <!-- minimum length -->
    maxlength="50"              <!-- maximum length -->
    pattern="[A-Za-z]+"        <!-- regex pattern -->
    placeholder="Letters only"
  />

  <input type="number"
    min="18"                    <!-- minimum value -->
    max="120"                   <!-- maximum value -->
    step="1"                    <!-- increment step -->
  />

  <!-- Autocomplete hints -->
  <input type="email"    autocomplete="email" />
  <input type="password" autocomplete="current-password" />
  <input type="text"     autocomplete="name" />

  <!-- Other useful attributes -->
  <input type="text" autofocus />      <!-- focus on load -->
  <input type="text" readonly />       <!-- read-only -->
  <input type="text" disabled />       <!-- disabled -->
  <input type="text" spellcheck="true" />
  <input type="text" inputmode="numeric" /> <!-- mobile keyboard hint -->

  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>`,
  },
  {
    q: "What is the difference between localStorage, sessionStorage, and cookies?",
    a: "localStorage persists until explicitly cleared (~5-10MB). sessionStorage clears when the tab closes (~5MB). Cookies have custom expiry, are sent with HTTP requests (~4KB), and support HttpOnly/Secure flags. Use localStorage for preferences, sessionStorage for temporary data, cookies for auth tokens.",
    code: `// ── localStorage ──────────────────────────────────
// Persists across sessions, shared across tabs
localStorage.setItem("theme", "dark");
localStorage.setItem("user", JSON.stringify({ name: "Alice", age: 25 }));

const theme = localStorage.getItem("theme");           // "dark"
const user  = JSON.parse(localStorage.getItem("user")); // {name:"Alice",age:25}
localStorage.removeItem("theme");
localStorage.clear(); // removes ALL entries

// Storage event - listen for changes in other tabs
window.addEventListener("storage", (e) => {
  console.log("Key:", e.key);         // changed key
  console.log("Old:", e.oldValue);    // previous value
  console.log("New:", e.newValue);    // new value
  console.log("URL:", e.url);         // which tab changed it
});

// ── sessionStorage ─────────────────────────────────
// Only available in current tab, cleared on close
sessionStorage.setItem("draft", JSON.stringify({ text: "Work in progress..." }));
const draft = JSON.parse(sessionStorage.getItem("draft"));

// ── Cookies ────────────────────────────────────────
// Set with expiry, path, and security flags
document.cookie = "username=Alice; max-age=3600; path=/; SameSite=Lax";
document.cookie = "session=xyz123; max-age=86400; path=/; Secure; SameSite=Strict";

// Read cookies (returns all as one string)
console.log(document.cookie); // "username=Alice; session=xyz123"

// Helper to get specific cookie
function getCookie(name) {
  return document.cookie
    .split("; ")
    .find(c => c.startsWith(name + "="))
    ?.split("=")[1] ?? null;
}

// Delete cookie (set past expiry)
document.cookie = "username=; max-age=0; path=/";

// Comparison:
// Feature        | localStorage | sessionStorage | Cookie
// Capacity       | ~5-10MB      | ~5MB           | ~4KB
// Expiry         | Never        | Tab close      | Custom
// Sent to server | No           | No             | Yes (every req)
// JS access      | Yes          | Yes            | Yes (if not HttpOnly)
// Cross-tab      | Yes          | No             | Yes`,
  },
  {
    q: "What is the Canvas API and how do you draw with it?",
    a: "The Canvas API provides a 2D drawing surface via JavaScript. You get a context from the canvas element and use drawing commands for shapes, text, images, and animations. It's raster-based (pixel-level) unlike SVG which is vector-based.",
    code: `<canvas id="myCanvas" width="600" height="400"></canvas>

<script>
const canvas = document.getElementById("myCanvas");
const ctx    = canvas.getContext("2d");

// ── Shapes ────────────────────────────────────────
// Rectangle
ctx.fillStyle   = "#f0c040";
ctx.fillRect(10, 10, 100, 60);        // filled
ctx.strokeStyle = "#333";
ctx.lineWidth   = 2;
ctx.strokeRect(120, 10, 100, 60);     // outline
ctx.clearRect(20, 20, 20, 20);        // clear area

// Circle / Arc
ctx.beginPath();
ctx.arc(300, 60, 40, 0, Math.PI * 2); // full circle
ctx.fillStyle = "#61dafb";
ctx.fill();

// Semi-circle
ctx.beginPath();
ctx.arc(400, 60, 40, 0, Math.PI);     // half circle
ctx.stroke();

// Path (polygon)
ctx.beginPath();
ctx.moveTo(500, 20);
ctx.lineTo(540, 80);
ctx.lineTo(460, 80);
ctx.closePath();
ctx.fillStyle = "#e34f26";
ctx.fill();

// ── Text ──────────────────────────────────────────
ctx.font         = "bold 24px Syne, sans-serif";
ctx.fillStyle    = "#333";
ctx.textAlign    = "center";
ctx.textBaseline = "middle";
ctx.fillText("Hello Canvas!", 300, 150);
ctx.strokeText("Outlined", 300, 200);

// ── Image ─────────────────────────────────────────
const img = new Image();
img.onload = () => ctx.drawImage(img, 10, 220, 100, 100);
img.src    = "photo.jpg";

// ── Gradient ──────────────────────────────────────
const grad = ctx.createLinearGradient(0, 280, 600, 280);
grad.addColorStop(0, "#f0c040");
grad.addColorStop(1, "#e34f26");
ctx.fillStyle = grad;
ctx.fillRect(0, 280, 600, 60);

// ── Animation loop ────────────────────────────────
let x = 0;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#61dafb";
  ctx.beginPath();
  ctx.arc(x, 350, 20, 0, Math.PI * 2);
  ctx.fill();
  x = (x + 2) % canvas.width;
  requestAnimationFrame(animate);
}
animate();
</script>`,
  },
  {
    q: "What is the Geolocation API?",
    a: "The Geolocation API lets web pages request the user's physical location (with permission). It provides getCurrentPosition for a one-time fix and watchPosition for continuous tracking. Location comes from GPS, WiFi, or IP.",
    code: `// Check support
if (!navigator.geolocation) {
  console.log("Geolocation not supported");
}

// One-time position
navigator.geolocation.getCurrentPosition(
  // Success callback
  (position) => {
    const { latitude, longitude, accuracy, altitude, speed } = position.coords;
    console.log(\`Lat: \${latitude}, Lng: \${longitude}\`);
    console.log(\`Accuracy: \${accuracy} meters\`);
    console.log(\`Timestamp: \${new Date(position.timestamp)}\`);

    // Use with a map
    initMap(latitude, longitude);
    fetchNearbyPlaces(latitude, longitude);
  },
  // Error callback
  (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied location access");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location unavailable");
        break;
      case error.TIMEOUT:
        console.log("Request timed out");
        break;
    }
  },
  // Options
  {
    enableHighAccuracy: true,  // GPS instead of WiFi/IP
    timeout: 10000,            // max wait 10 seconds
    maximumAge: 60000,         // use cached position if < 1 min old
  }
);

// Continuous tracking
const watchId = navigator.geolocation.watchPosition(
  (position) => {
    updateUserMarkerOnMap(position.coords.latitude, position.coords.longitude);
  },
  (error) => console.error(error),
  { enableHighAccuracy: true }
);

// Stop tracking
navigator.geolocation.clearWatch(watchId);

// Practical: show on map
async function showOnMap() {
  try {
    const pos = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
    const { latitude: lat, longitude: lng } = pos.coords;
    // Google Maps, Leaflet, Mapbox...
    new google.maps.Map(document.getElementById("map"), {
      center: { lat, lng }, zoom: 15
    });
  } catch (e) {
    showFallbackMap();
  }
}`,
  },
  {
    q: "What is the HTML5 video and audio element?",
    a: "HTML5 provides native <video> and <audio> elements eliminating the need for Flash. They support multiple source formats for browser compatibility, captions via <track>, and a JavaScript API for programmatic control.",
    code: `<!-- ── Video ───────────────────────────────────────── -->
<video
  id="myVideo"
  width="720"
  height="405"
  poster="thumbnail.jpg"
  controls
  autoplay
  muted
  loop
  preload="metadata"
  playsinline
>
  <!-- Multiple formats for browser compatibility -->
  <source src="video.webm" type="video/webm" />
  <source src="video.mp4"  type="video/mp4" />
  <source src="video.ogv"  type="video/ogg" />

  <!-- Captions / subtitles -->
  <track
    kind="subtitles"
    src="subtitles-en.vtt"
    srclang="en"
    label="English"
    default
  />
  <track kind="captions" src="captions-en.vtt" srclang="en" label="English CC" />

  Your browser doesn't support video.
</video>

<!-- ── Audio ───────────────────────────────────────── -->
<audio id="myAudio" controls preload="none">
  <source src="audio.ogg" type="audio/ogg" />
  <source src="audio.mp3" type="audio/mpeg" />
  Your browser doesn't support audio.
</audio>

<script>
// JavaScript API
const video = document.getElementById("myVideo");

// Control methods
video.play();
video.pause();
video.load();     // reload source

// Properties
video.currentTime = 30;        // seek to 30 seconds
video.playbackRate = 1.5;       // 1.5x speed
video.volume = 0.8;             // 0.0 to 1.0
video.muted  = true;
video.loop   = true;

// State
console.log(video.paused);      // true/false
console.log(video.ended);       // true/false
console.log(video.duration);    // total duration in seconds
console.log(video.readyState);  // 0-4 loading states

// Events
video.addEventListener("play",       () => showPauseButton());
video.addEventListener("pause",      () => showPlayButton());
video.addEventListener("ended",      () => showReplay());
video.addEventListener("timeupdate", () => updateProgressBar(video.currentTime));
video.addEventListener("error",      (e) => showError(e));

// Picture-in-picture
await video.requestPictureInPicture();
</script>`,
  },
  {
    q: "What is the drag and drop API in HTML5?",
    a: "The HTML5 Drag and Drop API enables dragging elements and dropping them on targets. Key events are dragstart, dragover, dragleave, drop, and dragend. The dataTransfer object passes data between source and target.",
    code: `<!-- Draggable source -->
<div
  id="item1"
  draggable="true"
  class="draggable"
>Drag me</div>

<!-- Drop target -->
<div id="dropzone" class="dropzone">Drop here</div>

<script>
const items    = document.querySelectorAll(".draggable");
const dropzone = document.getElementById("dropzone");

// ── Drag source events ────────────────────────────
items.forEach(item => {
  item.addEventListener("dragstart", (e) => {
    // Store data to transfer
    e.dataTransfer.setData("text/plain",     item.id);
    e.dataTransfer.setData("application/json", JSON.stringify({ id: item.id }));
    e.dataTransfer.effectAllowed = "move"; // or "copy", "link"

    item.classList.add("dragging");

    // Custom drag image
    const ghost = item.cloneNode(true);
    ghost.style.opacity = "0.5";
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 0, 0);
    setTimeout(() => ghost.remove(), 0);
  });

  item.addEventListener("dragend", (e) => {
    item.classList.remove("dragging");
    if (e.dataTransfer.dropEffect === "move") {
      item.remove(); // remove original after successful move
    }
  });
});

// ── Drop target events ────────────────────────────
dropzone.addEventListener("dragover", (e) => {
  e.preventDefault(); // REQUIRED to allow drop
  e.dataTransfer.dropEffect = "move";
  dropzone.classList.add("drag-over");
});

dropzone.addEventListener("dragleave", (e) => {
  // Only remove class if leaving the dropzone itself
  if (!dropzone.contains(e.relatedTarget)) {
    dropzone.classList.remove("drag-over");
  }
});

dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropzone.classList.remove("drag-over");

  const id   = e.dataTransfer.getData("text/plain");
  const data = JSON.parse(e.dataTransfer.getData("application/json"));
  const item = document.getElementById(id);

  dropzone.appendChild(item);
  console.log("Dropped:", data);
});
</script>

<style>
.dragging  { opacity: 0.4; cursor: grabbing; }
.drag-over { border: 2px dashed #f0c040; background: #1f1a00; }
</style>`,
  },
  {
    q: "What are data attributes (data-*) in HTML5?",
    a: "Custom data attributes store extra information on HTML elements using the data-* pattern. They are accessible via JavaScript's dataset property and can store any string value. Great for passing data to JavaScript without using hidden inputs.",
    code: `<!-- Define data attributes -->
<ul id="product-list">
  <li
    data-id="101"
    data-name="Laptop"
    data-price="999.99"
    data-category="electronics"
    data-in-stock="true"
    data-tags="tech,computers,work"
  >
    Laptop
  </li>
  <li
    data-id="102"
    data-name="Headphones"
    data-price="149.99"
    data-category="electronics"
    data-in-stock="false"
  >
    Headphones
  </li>
</ul>

<script>
// Access via dataset property
const li = document.querySelector("li[data-id='101']");

// Read attributes
console.log(li.dataset.id);        // "101" (always a string)
console.log(li.dataset.name);      // "Laptop"
console.log(li.dataset.price);     // "999.99"
console.log(li.dataset.inStock);   // "true" (camelCase for data-in-stock)
console.log(li.dataset.category);  // "electronics"

// Parse types explicitly
const price   = parseFloat(li.dataset.price);     // 999.99
const inStock = li.dataset.inStock === "true";    // true (boolean)
const tags    = li.dataset.tags.split(",");        // ["tech","computers","work"]

// Set / update data attributes
li.dataset.price   = "899.99";
li.dataset.inStock = "false";
li.dataset.newProp = "hello";  // creates data-new-prop

// Delete attribute
delete li.dataset.tags;

// Event delegation with data attributes
document.getElementById("product-list").addEventListener("click", (e) => {
  const li = e.target.closest("li[data-id]");
  if (!li) return;
  const { id, name, price } = li.dataset;
  addToCart({ id, name, price: parseFloat(price) });
});

// CSS attribute selectors
// li[data-in-stock="false"] { opacity: 0.5; }
// li[data-category="electronics"] { background: #1a1a1a; }

// getAttribute / setAttribute alternative
li.getAttribute("data-id");         // "101"
li.setAttribute("data-id", "999");
li.hasAttribute("data-price");      // true
li.removeAttribute("data-tags");
</script>`,
  },

  // ─── INTERMEDIATE ─────────────────────────────────────────
  {
    q: "What is the History API and how does it enable client-side routing?",
    a: "The History API allows manipulation of the browser history without page reloads. pushState adds a new history entry, replaceState modifies the current entry, and the popstate event fires when the user navigates back/forward. Foundation of all SPA routers.",
    code: `// ── Core API ──────────────────────────────────────
// pushState(state, title, url) - add new history entry
history.pushState(
  { userId: 42, page: "profile" }, // state object (serializable)
  "",                               // title (mostly ignored)
  "/users/42"                       // new URL (same origin only)
);

// replaceState - modify current entry (no new history entry)
history.replaceState(
  { userId: 42, tab: "posts" },
  "",
  "/users/42?tab=posts"
);

// Navigate
history.back();     // go back one entry
history.forward();  // go forward one entry
history.go(-2);     // go back 2 entries
history.go(1);      // go forward 1 entry
history.length;     // number of entries in history

// popstate - fires when user navigates (back/forward)
window.addEventListener("popstate", (e) => {
  const state = e.state; // state object we saved
  console.log("State:", state);     // { userId: 42, page: "profile" }
  console.log("URL:", location.href); // current URL
  renderPage(state);
});

// ── Simple SPA router ─────────────────────────────
const routes = {
  "/":        () => renderHome(),
  "/about":   () => renderAbout(),
  "/contact": () => renderContact(),
};

function navigate(path) {
  history.pushState({ path }, "", path);
  renderRoute(path);
}

function renderRoute(path) {
  const handler = routes[path] ?? routes["/"];
  document.getElementById("app").innerHTML = handler();
}

// Intercept link clicks
document.addEventListener("click", (e) => {
  const link = e.target.closest("a[href]");
  if (!link) return;
  const href = link.getAttribute("href");
  if (href.startsWith("/")) {
    e.preventDefault(); // prevent full reload
    navigate(href);
  }
});

// Handle back/forward
window.addEventListener("popstate", (e) => {
  renderRoute(location.pathname);
});

// Handle initial page load
renderRoute(location.pathname);`,
  },
  {
    q: "What are Web Workers and how do they work?",
    a: "Web Workers run JavaScript in background threads without blocking the main thread. They cannot access the DOM but can perform CPU-intensive tasks. Communication uses postMessage and onmessage. Three types: Dedicated, Shared, and Service Workers.",
    code: `// ── main.js ────────────────────────────────────────
// Create dedicated worker
const worker = new Worker("worker.js");

// Send data (uses structured clone algorithm)
worker.postMessage({
  type: "PROCESS",
  data: Array.from({ length: 1_000_000 }, () => Math.random()),
});

// Receive result
worker.onmessage = (e) => {
  console.log("Result:", e.data);
};

// Handle errors
worker.onerror = (e) => {
  console.error(\`Error in worker: \${e.message} (line \${e.lineno})\`);
};

// Terminate when done
worker.terminate();

// ── worker.js ──────────────────────────────────────
// No access to: window, document, DOM, localStorage
// Has access to: fetch, XMLHttpRequest, setTimeout, WebSockets, IndexedDB

self.onmessage = (e) => {
  const { type, data } = e.data;

  if (type === "PROCESS") {
    // Heavy computation - won't block UI
    const sorted = data.slice().sort((a, b) => a - b);
    const sum    = data.reduce((a, b) => a + b, 0);
    const avg    = sum / data.length;

    self.postMessage({ sorted: sorted.slice(0, 5), sum, avg });
  }
};

// ── Inline Worker (no separate file) ──────────────
const code = \`
  self.onmessage = ({ data }) => {
    const result = data.map(n => n * n);
    self.postMessage(result);
  };
\`;
const blob         = new Blob([code], { type: "application/javascript" });
const inlineWorker = new Worker(URL.createObjectURL(blob));
inlineWorker.postMessage([1, 2, 3, 4, 5]);

// ── Transfer ownership (zero-copy) ────────────────
const buffer = new ArrayBuffer(1024 * 1024); // 1MB
worker.postMessage({ buffer }, [buffer]); // transfer, not clone
// buffer is now unusable in main thread (transferred) ✅`,
  },
  {
    q: "What is the Intersection Observer API?",
    a: "The Intersection Observer API asynchronously observes changes in the intersection of a target element with an ancestor or the viewport. Used for lazy loading images, infinite scroll, animations on scroll, and ad impression tracking.",
    code: `// Basic Intersection Observer
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      console.log("Target:", entry.target);
      console.log("Is visible:", entry.isIntersecting);
      console.log("Intersection ratio:", entry.intersectionRatio); // 0.0 to 1.0
      console.log("Bounding rect:", entry.boundingClientRect);
    });
  },
  {
    root:       null,   // null = viewport
    rootMargin: "0px",  // margin around root (like CSS margin)
    threshold:  0.5,    // fire when 50% visible (or array [0, 0.5, 1.0])
  }
);

// Observe elements
document.querySelectorAll(".section").forEach(el => observer.observe(el));

// Unobserve
observer.unobserve(element);
observer.disconnect(); // stop all observations

// ── Lazy load images ───────────────────────────────
const imageObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const img = entry.target;
    img.src   = img.dataset.src;             // load real image
    img.classList.remove("lazy");
    obs.unobserve(img);                      // stop observing after load
  });
}, { rootMargin: "200px" }); // load 200px before entering viewport

document.querySelectorAll("img[data-src]").forEach(img => imageObserver.observe(img));

// ── Scroll animations ──────────────────────────────
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(({ isIntersecting, target }) => {
    target.classList.toggle("visible", isIntersecting);
  });
}, { threshold: 0.2 });

document.querySelectorAll(".animate-on-scroll").forEach(el => animObserver.observe(el));

// ── Infinite scroll ────────────────────────────────
const sentinel = document.getElementById("sentinel");
new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) loadMoreItems();
}).observe(sentinel);

// ── Ad impression tracking ─────────────────────────
const adObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio >= 0.5) {
      trackImpression(entry.target.dataset.adId);
    }
  });
}, { threshold: 0.5 });`,
  },
  {
    q: "What is the Fetch API and how does it work?",
    a: "The Fetch API is the modern way to make HTTP requests, replacing XMLHttpRequest. It returns Promises and provides a clean, flexible interface. Supports request/response customization, streaming, and AbortController for cancellation.",
    code: `// ── Basic GET ──────────────────────────────────────
const res  = await fetch("https://api.example.com/users");
const data = await res.json();

// Always check response status
if (!res.ok) throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);

// ── POST with JSON ─────────────────────────────────
const response = await fetch("/api/users", {
  method:  "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": \`Bearer \${token}\`,
    "X-Request-ID": crypto.randomUUID(),
  },
  body: JSON.stringify({ name: "Alice", email: "alice@example.com" }),
});
const newUser = await response.json();

// ── Different body types ───────────────────────────
// Form data
const formData = new FormData(document.getElementById("form"));
fetch("/api/upload", { method: "POST", body: formData });

// URL encoded
const params = new URLSearchParams({ name: "Alice", age: 25 });
fetch("/api/search", { method: "POST", body: params });

// Blob / File
fetch("/api/upload", { method: "POST", body: fileInput.files[0] });

// ── Response types ─────────────────────────────────
res.json();       // parse JSON body
res.text();       // get text string
res.blob();       // get Blob (images, files)
res.arrayBuffer();// get raw bytes
res.formData();   // get FormData

// ── AbortController - cancel request ──────────────
const controller = new AbortController();
const timeoutId  = setTimeout(() => controller.abort(), 5000); // 5s timeout

try {
  const res = await fetch("/api/slow-endpoint", {
    signal: controller.signal
  });
  clearTimeout(timeoutId);
  return await res.json();
} catch (e) {
  if (e.name === "AbortError") console.log("Request cancelled");
  else throw e;
}

// ── Fetch with retry ───────────────────────────────
async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res.json();
      if (res.status === 404) return null; // don't retry 404
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, 1000 * (i + 1))); // exponential backoff
    }
  }
}`,
  },
  {
    q: "What is the WebSocket API and how does it differ from HTTP?",
    a: "WebSockets provide a persistent, full-duplex communication channel over a single TCP connection. Unlike HTTP (request/response), WebSockets allow the server to push data to clients at any time. Used for real-time apps like chat, live feeds, and games.",
    code: `// ── WebSocket connection ──────────────────────────
const ws = new WebSocket("wss://api.example.com/socket");
// wss:// = secure (WSS), ws:// = insecure

// Connection events
ws.addEventListener("open", (e) => {
  console.log("Connected! readyState:", ws.readyState);
  // Send initial message
  ws.send(JSON.stringify({ type: "AUTH", token: getToken() }));
});

ws.addEventListener("message", (e) => {
  const data = JSON.parse(e.data);
  console.log("Received:", data);

  switch (data.type) {
    case "CHAT_MESSAGE": addMessage(data.payload); break;
    case "USER_JOINED":  updateOnlineUsers(data.payload); break;
    case "PING":         ws.send(JSON.stringify({ type: "PONG" })); break;
  }
});

ws.addEventListener("close", (e) => {
  console.log("Disconnected:", e.code, e.reason);
  if (e.code !== 1000) reconnect(); // reconnect if not intentional
});

ws.addEventListener("error", (e) => {
  console.error("WebSocket error:", e);
});

// Send messages
ws.send("Hello, server!");
ws.send(JSON.stringify({ type: "JOIN_ROOM", room: "general" }));

// Send binary data
const buffer = new ArrayBuffer(4);
new Int32Array(buffer)[0] = 42;
ws.send(buffer);

// readyState values:
// 0 = CONNECTING, 1 = OPEN, 2 = CLOSING, 3 = CLOSED
console.log(ws.readyState === WebSocket.OPEN); // true when connected

// Close connection
ws.close(1000, "Normal closure");

// ── Chat app example ──────────────────────────────
class ChatClient {
  #ws = null;
  #reconnectDelay = 1000;

  connect(url, token) {
    this.#ws = new WebSocket(url);
    this.#ws.onopen    = () => this.authenticate(token);
    this.#ws.onmessage = (e) => this.handleMessage(JSON.parse(e.data));
    this.#ws.onclose   = () => setTimeout(() => this.connect(url, token), this.#reconnectDelay);
  }

  sendMessage(room, text) {
    if (this.#ws?.readyState === WebSocket.OPEN) {
      this.#ws.send(JSON.stringify({ type: "MESSAGE", room, text }));
    }
  }
}`,
  },
  {
    q: "What is the MutationObserver API?",
    a: "MutationObserver watches for DOM changes — added/removed nodes, attribute changes, text content changes. It's asynchronous (uses microtask queue) and more efficient than the deprecated mutation events. Used for reactive frameworks and dynamic content detection.",
    code: `// Basic MutationObserver
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    console.log("Type:", mutation.type);
    // "childList" | "attributes" | "characterData"

    if (mutation.type === "childList") {
      mutation.addedNodes.forEach(node => {
        console.log("Added:", node);
      });
      mutation.removedNodes.forEach(node => {
        console.log("Removed:", node);
      });
    }

    if (mutation.type === "attributes") {
      console.log("Attribute changed:", mutation.attributeName);
      console.log("Old value:", mutation.oldValue);
      console.log("New value:", mutation.target.getAttribute(mutation.attributeName));
    }

    if (mutation.type === "characterData") {
      console.log("Text changed:", mutation.target.textContent);
    }
  });
});

// Start observing
const target = document.getElementById("app");
observer.observe(target, {
  childList:             true,  // watch for added/removed children
  subtree:               true,  // watch all descendants, not just direct children
  attributes:            true,  // watch attribute changes
  attributeOldValue:     true,  // record previous attribute value
  characterData:         true,  // watch text content changes
  characterDataOldValue: true,  // record previous text value
  attributeFilter:       ["class", "data-state"], // only these attributes
});

// Stop observing
observer.disconnect();

// Take a snapshot of pending mutations
const pending = observer.takeRecords();

// ── Practical: auto-initialize components ─────────
const componentObserver = new MutationObserver((mutations) => {
  mutations.forEach(({ addedNodes }) => {
    addedNodes.forEach(node => {
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      // Initialize any new data-component elements
      node.querySelectorAll("[data-component]").forEach(initComponent);
      if (node.matches("[data-component]")) initComponent(node);
    });
  });
});
componentObserver.observe(document.body, { childList: true, subtree: true });`,
  },
  {
    q: "What is the ResizeObserver API?",
    a: "ResizeObserver watches for changes to an element's size, firing a callback whenever dimensions change. More efficient than window resize listeners as it fires per-element and handles CSS changes, not just window resizing.",
    code: `// Basic ResizeObserver
const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach(entry => {
    // contentRect - content area (excludes padding/border)
    const { width, height } = entry.contentRect;

    // borderBoxSize - includes padding and border (newer API)
    const borderBox = entry.borderBoxSize?.[0];
    const bw = borderBox?.inlineSize;  // width
    const bh = borderBox?.blockSize;   // height

    // contentBoxSize - same as contentRect but as array
    const contentBox = entry.contentBoxSize?.[0];

    console.log(\`\${entry.target.id}: \${width}px × \${height}px\`);
  });
});

// Observe elements
resizeObserver.observe(document.getElementById("sidebar"));
resizeObserver.observe(document.getElementById("chart-container"));

// Unobserve
resizeObserver.unobserve(element);
resizeObserver.disconnect();

// ── Responsive chart ──────────────────────────────
function initResponsiveChart(container) {
  const canvas = container.querySelector("canvas");
  let chart    = null;

  const ro = new ResizeObserver(([entry]) => {
    const { width, height } = entry.contentRect;
    canvas.width  = width;
    canvas.height = height;
    if (chart) chart.resize(width, height); // tell chart library to re-render
    else chart = createChart(canvas);
  });

  ro.observe(container);
  return () => ro.disconnect(); // cleanup function
}

// ── Responsive component behavior ─────────────────
const cardObserver = new ResizeObserver((entries) => {
  entries.forEach(({ target, contentRect: { width } }) => {
    // Apply different layouts based on component width (not viewport)
    target.classList.toggle("compact",  width < 300);
    target.classList.toggle("medium",   width >= 300 && width < 600);
    target.classList.toggle("expanded", width >= 600);
  });
});
document.querySelectorAll(".responsive-card").forEach(el => cardObserver.observe(el));

// ── Monitor element appearing ─────────────────────
const hiddenObserver = new ResizeObserver(([entry]) => {
  if (entry.contentRect.width > 0) {
    console.log("Element is now visible!");
    initializeWhenVisible(entry.target);
  }
});`,
  },
  {
    q: "What is the Clipboard API?",
    a: "The Clipboard API provides read/write access to the system clipboard. The modern async Clipboard API (navigator.clipboard) is promise-based and requires user permission or a recent user gesture. The older execCommand approach is deprecated.",
    code: `// ── Modern Clipboard API (async) ──────────────────

// Write text to clipboard
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied to clipboard!");
  } catch (err) {
    console.error("Copy failed:", err);
    fallbackCopy(text);
  }
}

// Read text from clipboard
async function pasteText() {
  try {
    const text = await navigator.clipboard.readText();
    document.getElementById("output").value = text;
  } catch (err) {
    console.error("Paste failed:", err.message);
    // User likely denied permission
  }
}

// Write rich content (HTML, images)
async function copyRichContent() {
  const html = "<b>Hello</b> <i>World</i>";
  const blob  = new Blob([html], { type: "text/html" });
  const item  = new ClipboardItem({ "text/html": blob });
  await navigator.clipboard.write([item]);
}

// Copy image to clipboard
async function copyImage(imageUrl) {
  const res   = await fetch(imageUrl);
  const blob  = await res.blob();
  const item  = new ClipboardItem({ [blob.type]: blob });
  await navigator.clipboard.write([item]);
}

// ── Copy button component pattern ─────────────────
function addCopyButtons() {
  document.querySelectorAll("pre code").forEach(codeBlock => {
    const btn = document.createElement("button");
    btn.textContent = "📋 Copy";
    btn.className = "copy-btn";

    btn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(codeBlock.textContent);
      btn.textContent = "✅ Copied!";
      btn.disabled    = true;
      setTimeout(() => {
        btn.textContent = "📋 Copy";
        btn.disabled    = false;
      }, 2000);
    });

    codeBlock.parentElement.style.position = "relative";
    codeBlock.parentElement.appendChild(btn);
  });
}

// ── Fallback for older browsers ────────────────────
function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.cssText = "position:fixed;opacity:0;";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy"); // deprecated but works
  textarea.remove();
}`,
  },
  {
    q: "What is the Page Visibility API?",
    a: "The Page Visibility API detects whether a page is visible to the user — useful for pausing videos, animations, or polling when the tab is hidden, and resuming when it becomes visible. Saves CPU, battery, and network resources.",
    code: `// document.hidden - true when tab is not visible
// document.visibilityState - "visible" | "hidden" | "prerender"

console.log(document.hidden);          // true when tab hidden
console.log(document.visibilityState); // "visible" or "hidden"

// Listen for visibility changes
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    console.log("Tab hidden - pause work");
    pauseVideo();
    stopPolling();
    stopAnimations();
  } else {
    console.log("Tab visible - resume work");
    resumeVideo();
    startPolling();
    resumeAnimations();
  }
});

// ── Practical: auto-pause video ────────────────────
const video = document.querySelector("video");
document.addEventListener("visibilitychange", () => {
  if (document.hidden) video.pause();
  else video.play().catch(() => {}); // autoplay may be blocked
});

// ── Pause polling when hidden ──────────────────────
class DataPoller {
  #intervalId = null;
  #isRunning  = false;

  constructor(fetchFn, interval = 5000) {
    this.fetchFn  = fetchFn;
    this.interval = interval;

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) this.#pause();
      else this.#resume();
    });
  }

  start() {
    this.#isRunning = true;
    if (!document.hidden) this.#resume();
  }

  #resume() {
    if (!this.#isRunning) return;
    this.fetchFn(); // immediate fetch on resume
    this.#intervalId = setInterval(this.fetchFn, this.interval);
  }

  #pause() {
    clearInterval(this.#intervalId);
  }

  stop() {
    this.#isRunning = false;
    clearInterval(this.#intervalId);
  }
}

const poller = new DataPoller(() => fetch("/api/updates").then(r => r.json()));
poller.start();`,
  },
  {
    q: "What is the Web Notifications API?",
    a: "The Notifications API lets web apps display system-level push notifications even when the page is not in focus. Requires user permission. Works with Service Workers for background notifications.",
    code: `// 1. Request permission
async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    console.log("Browser doesn't support notifications");
    return false;
  }

  // Check current permission
  console.log(Notification.permission); // "default" | "granted" | "denied"

  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied")  return false;

  // Request permission (must be triggered by user gesture)
  const permission = await Notification.requestPermission();
  return permission === "granted";
}

// 2. Show a notification
async function showNotification() {
  const granted = await requestNotificationPermission();
  if (!granted) return;

  const notification = new Notification("New Message!", {
    body:    "Alice sent you a message: 'Hey, how are you?'",
    icon:    "/icons/app-icon.png",
    badge:   "/icons/badge.png",
    image:   "/images/message-preview.jpg",
    tag:     "chat-message",     // ID - replaces previous notification with same tag
    silent:  false,              // play sound
    vibrate: [200, 100, 200],    // vibration pattern (mobile)
    data:    { userId: 42, messageId: 123 }, // custom data
    requireInteraction: true,    // stay until user interacts
  });

  // Notification events
  notification.onclick = (e) => {
    e.preventDefault();
    window.focus();
    window.open("/chat/42"); // open relevant page
    notification.close();
  };

  notification.onclose   = () => console.log("Notification closed");
  notification.onerror   = () => console.error("Notification error");
  notification.onshow    = () => console.log("Notification shown");

  // Auto-close after 5 seconds
  setTimeout(() => notification.close(), 5000);
}

// 3. Service Worker notifications (background)
// In service worker:
self.addEventListener("push", (e) => {
  const data = e.data.json();
  e.waitUntil(
    self.registration.showNotification(data.title, {
      body:    data.body,
      icon:    "/icon.png",
      data:    { url: data.url },
    })
  );
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data.url));
});`,
  },

  // ─── INTERMEDIATE-ADVANCED ─────────────────────────────────
  {
    q: "What is IndexedDB and when should you use it?",
    a: "IndexedDB is a low-level, asynchronous, transactional key-value database built into the browser. It stores large amounts of structured data (objects, files, blobs) with indexes for efficient querying. Much more powerful than localStorage.",
    code: `// ── Open database ─────────────────────────────────
const request = indexedDB.open("MyAppDB", 1); // name, version

// onupgradeneeded - runs when DB is created or version changes
request.onupgradeneeded = (e) => {
  const db = e.target.result;

  // Create object store (like a table)
  const store = db.createObjectStore("users", {
    keyPath:       "id",       // primary key field
    autoIncrement: true,       // or false if providing your own IDs
  });

  // Create indexes for querying
  store.createIndex("email",  "email",  { unique: true });
  store.createIndex("name",   "name",   { unique: false });
  store.createIndex("active", "active", { unique: false });
};

request.onsuccess = (e) => {
  const db = e.target.result;
  // Use the database
};
request.onerror = (e) => console.error("DB error:", e.target.error);

// ── Promise wrapper (cleaner than callbacks) ───────
function openDB(name, version, onUpgrade) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(name, version);
    req.onupgradeneeded = (e) => onUpgrade(e.target.result, e);
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror   = (e) => reject(e.target.error);
  });
}

// ── CRUD operations ────────────────────────────────
async function dbOperations() {
  const db = await openDB("MyAppDB", 1, (db) => {
    const store = db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
    store.createIndex("email", "email", { unique: true });
  });

  // Add
  await transaction(db, "users", "readwrite", store =>
    store.add({ name: "Alice", email: "alice@example.com", active: true })
  );

  // Get by key
  const user = await transaction(db, "users", "readonly", store => store.get(1));

  // Get by index
  const byEmail = await transaction(db, "users", "readonly", store =>
    store.index("email").get("alice@example.com")
  );

  // Get all
  const all = await transaction(db, "users", "readonly", store => store.getAll());

  // Update
  await transaction(db, "users", "readwrite", store =>
    store.put({ id: 1, name: "Alice Smith", email: "alice@example.com", active: true })
  );

  // Delete
  await transaction(db, "users", "readwrite", store => store.delete(1));
}

function transaction(db, storeName, mode, operation) {
  return new Promise((resolve, reject) => {
    const tx      = db.transaction(storeName, mode);
    const store   = tx.objectStore(storeName);
    const request = operation(store);
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror   = (e) => reject(e.target.error);
  });
}`,
  },
  {
    q: "What is the Service Worker and how does it enable PWAs?",
    a: "A Service Worker is a background script acting as a network proxy. It intercepts requests, implements caching strategies, enables offline support, background sync, and push notifications. The foundation of Progressive Web Apps.",
    code: `// ── Register service worker ────────────────────────
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const reg = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",       // controls which paths the SW manages
        type: "module",   // use ES modules in SW
      });
      console.log("SW registered, scope:", reg.scope);

      // Check for updates
      reg.addEventListener("updatefound", () => {
        const newWorker = reg.installing;
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            showUpdateBanner(); // prompt user to refresh
          }
        });
      });
    } catch (e) {
      console.error("SW registration failed:", e);
    }
  });
}

// ── sw.js ──────────────────────────────────────────
const CACHE_NAME    = "app-v2";
const STATIC_ASSETS = ["/", "/index.html", "/app.js", "/styles.css", "/offline.html"];

// Install - cache static assets
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting()) // activate immediately
  );
});

// Activate - clean up old caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim()) // take control immediately
  );
});

// Fetch - caching strategies
self.addEventListener("fetch", (e) => {
  const { request } = e;
  const url = new URL(request.url);

  // Cache First (static assets)
  if (STATIC_ASSETS.includes(url.pathname)) {
    e.respondWith(
      caches.match(request).then(cached => cached || fetch(request))
    );
    return;
  }

  // Network First (API calls)
  if (url.pathname.startsWith("/api/")) {
    e.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request)) // fallback to cache
    );
    return;
  }

  // Stale While Revalidate (pages)
  e.respondWith(
    caches.match(request).then(cached => {
      const fetchPromise = fetch(request).then(res => {
        caches.open(CACHE_NAME).then(c => c.put(request, res.clone()));
        return res;
      });
      return cached || fetchPromise;
    })
  );
});`,
  },
  {
    q: "What is the File API and how do you read files in HTML5?",
    a: "The File API provides access to files selected by the user through file input or drag and drop. FileReader reads file contents asynchronously. The modern approach uses text(), arrayBuffer(), and stream() methods directly on File/Blob objects.",
    code: `<!-- File input -->
<input type="file" id="fileInput" accept=".txt,.json,.csv" multiple />
<div id="dropzone">Drop files here</div>

<script>
// ── File input ─────────────────────────────────────
document.getElementById("fileInput").addEventListener("change", (e) => {
  const files = Array.from(e.target.files);
  files.forEach(processFile);
});

// ── Modern Blob/File methods (async) ───────────────
async function processFile(file) {
  console.log("Name:",    file.name);       // "data.json"
  console.log("Size:",    file.size);       // bytes
  console.log("Type:",    file.type);       // "application/json"
  console.log("Modified:", file.lastModified); // timestamp

  // Read as text
  const text = await file.text();
  console.log(text);

  // Read as JSON
  const json = JSON.parse(await file.text());

  // Read as ArrayBuffer (for binary files)
  const buffer = await file.arrayBuffer();

  // Read as data URL (for images)
  const dataUrl = await readAsDataURL(file);
  document.getElementById("preview").src = dataUrl;

  // Stream large files
  const reader = file.stream().getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    processChunk(value); // Uint8Array chunk
  }
}

// ── FileReader (older but widely supported) ────────
function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e.target.error);
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const percent = (e.loaded / e.total) * 100;
        updateProgressBar(percent);
      }
    };
    reader.readAsDataURL(file);     // base64 data URL
    // reader.readAsText(file, "UTF-8"); // text
    // reader.readAsArrayBuffer(file);   // binary
  });
}

// ── Drag and drop file reading ─────────────────────
const dropzone = document.getElementById("dropzone");
dropzone.addEventListener("dragover", e => e.preventDefault());
dropzone.addEventListener("drop", async (e) => {
  e.preventDefault();
  const files = Array.from(e.dataTransfer.files);
  // Or use DataTransferItem for FileSystem API:
  const items = Array.from(e.dataTransfer.items);
  for (const item of items) {
    if (item.kind === "file") {
      const file = item.getAsFile();
      await processFile(file);
    }
  }
});

// ── Generate and download file ─────────────────────
function downloadFile(content, filename, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url); // clean up
}

downloadFile(JSON.stringify(data, null, 2), "data.json", "application/json");
</script>`,
  },
  {
    q: "What is the Web Share API?",
    a: "The Web Share API uses the device's native sharing capabilities to share URLs, text, or files. It invokes the native share sheet on mobile devices. More user-friendly than custom share buttons and handles all social platforms automatically.",
    code: `// Check support
const canShare = "share" in navigator;
const canShareFiles = "canShare" in navigator;

// ── Share text and URL ─────────────────────────────
async function shareContent() {
  if (!navigator.share) {
    // Fallback for unsupported browsers
    copyToClipboard(window.location.href);
    return;
  }

  try {
    await navigator.share({
      title: "Check out this article",
      text:  "I found this really interesting article about HTML5 APIs",
      url:   window.location.href,
    });
    console.log("Shared successfully");
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("User cancelled sharing");
    } else {
      console.error("Share failed:", err);
    }
  }
}

// ── Share files ────────────────────────────────────
async function shareFile(file) {
  const shareData = { files: [file], title: file.name };

  if (!navigator.canShare(shareData)) {
    console.log("This file type cannot be shared");
    return;
  }

  try {
    await navigator.share(shareData);
  } catch (err) {
    console.error("File share failed:", err);
  }
}

// Share generated file
async function shareReport(data) {
  const json = JSON.stringify(data, null, 2);
  const file = new File([json], "report.json", { type: "application/json" });
  await shareFile(file);
}

// Share image from canvas
async function shareCanvasImage(canvas) {
  canvas.toBlob(async (blob) => {
    const file = new File([blob], "screenshot.png", { type: "image/png" });
    await shareFile(file);
  });
}

// ── Share button with progressive enhancement ──────
function createShareButton(url, title) {
  const btn = document.createElement("button");

  if (navigator.share) {
    btn.textContent = "📤 Share";
    btn.onclick = () => navigator.share({ url, title });
  } else {
    btn.textContent = "🔗 Copy Link";
    btn.onclick = async () => {
      await navigator.clipboard.writeText(url);
      btn.textContent = "✅ Copied!";
      setTimeout(() => btn.textContent = "🔗 Copy Link", 2000);
    };
  }

  return btn;
}`,
  },
  {
    q: "What are Server-Sent Events (SSE) and how do they differ from WebSockets?",
    a: "Server-Sent Events provide a one-way persistent connection from server to client over HTTP. The server can push data anytime. SSE is simpler than WebSockets, auto-reconnects, and works over standard HTTP. Use SSE for live feeds, progress, and notifications; WebSockets for bidirectional communication.",
    code: `// ── Client: EventSource ───────────────────────────
const eventSource = new EventSource("/api/events");
// With credentials:
const authSource  = new EventSource("/api/events", { withCredentials: true });

// Default 'message' event
eventSource.onmessage = (e) => {
  const data = JSON.parse(e.data);
  console.log("Received:", data);
};

// Named custom events
eventSource.addEventListener("user-joined", (e) => {
  const user = JSON.parse(e.data);
  addUserToList(user);
});

eventSource.addEventListener("notification", (e) => {
  showNotification(JSON.parse(e.data));
});

eventSource.addEventListener("progress", (e) => {
  updateProgressBar(JSON.parse(e.data).percent);
});

// Connection events
eventSource.onopen  = () => console.log("Connected to event stream");
eventSource.onerror = (e) => {
  if (eventSource.readyState === EventSource.CLOSED) {
    console.log("Connection closed");
  } else {
    console.log("Error - will auto-reconnect...");
  }
};

// Close connection
eventSource.close();

// ── Server: Node.js/Express ────────────────────────
app.get("/api/events", (req, res) => {
  // Required headers
  res.setHeader("Content-Type",  "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection",    "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders();

  // Send events
  const sendEvent = (event, data, id) => {
    if (id)    res.write(\`id: \${id}\n\`);          // for Last-Event-ID
    if (event) res.write(\`event: \${event}\n\`);    // named event
    res.write(\`data: \${JSON.stringify(data)}\n\`);  // data (required)
    res.write(\`retry: 3000\n\`);                    // reconnect delay ms
    res.write("\n");                                 // end of event
  };

  sendEvent(null, { message: "Connected!" });

  const interval = setInterval(() => {
    sendEvent("notification", { text: "New update", time: Date.now() });
  }, 5000);

  req.on("close", () => clearInterval(interval)); // cleanup on disconnect
});`,
  },
  {
    q: "What is the Web Animations API (WAAPI)?",
    a: "The Web Animations API provides JavaScript control over CSS animations and transitions. It enables creating, controlling, and querying animations programmatically with better performance than setTimeout-based animations.",
    code: `// ── Basic animation ───────────────────────────────
const element = document.getElementById("box");

// element.animate(keyframes, options)
const animation = element.animate(
  [
    // Keyframes (array of states)
    { transform: "translateX(0px)",   opacity: 1,   offset: 0 },
    { transform: "translateX(100px)", opacity: 0.5, offset: 0.5 },
    { transform: "translateX(200px)", opacity: 1,   offset: 1 },
  ],
  {
    duration:   1000,         // ms
    easing:     "ease-in-out",// CSS easing
    delay:      200,          // ms
    endDelay:   100,          // ms after animation
    iterations: Infinity,     // or number
    direction:  "alternate",  // "normal" | "reverse" | "alternate"
    fill:       "forwards",   // "none" | "forwards" | "backwards" | "both"
    iterationStart: 0.5,      // start midway through
  }
);

// ── Control playback ──────────────────────────────
animation.play();
animation.pause();
animation.reverse();
animation.cancel();
animation.finish();          // jump to end

animation.currentTime = 500; // seek to 500ms
animation.playbackRate = 2;  // double speed

// ── Events and promises ───────────────────────────
animation.onfinish  = () => console.log("Animation finished");
animation.oncancel  = () => console.log("Animation cancelled");

await animation.finished;    // wait for completion
await animation.ready;       // wait until playback starts

// ── Query animations ──────────────────────────────
document.getAnimations();           // all animations on page
element.getAnimations();            // animations on element

// ── Practical: staggered entrance ─────────────────
function animateListEntrance(listEl) {
  const items = Array.from(listEl.children);
  items.forEach((item, i) => {
    item.animate(
      [
        { opacity: 0, transform: "translateY(20px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 400,
        delay:    i * 80,        // stagger by 80ms each
        easing:   "ease-out",
        fill:     "forwards",
      }
    );
  });
}

// ── Reusable shake animation ───────────────────────
function shake(element) {
  return element.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-10px)" },
      { transform: "translateX(10px)" },
      { transform: "translateX(-10px)" },
      { transform: "translateX(0)" },
    ],
    { duration: 400, easing: "ease-in-out" }
  );
}`,
  },
  {
    q: "What is the Fullscreen API?",
    a: "The Fullscreen API allows any element (not just video) to be displayed in fullscreen mode. Useful for games, presentations, media players, and image galleries. Requires user gesture to enter fullscreen.",
    code: `// ── Enter fullscreen ──────────────────────────────
async function enterFullscreen(element = document.documentElement) {
  try {
    if (element.requestFullscreen) {
      await element.requestFullscreen({ navigationUI: "hide" });
    } else if (element.webkitRequestFullscreen) { // Safari
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {    // Firefox old
      element.mozRequestFullScreen();
    }
  } catch (err) {
    console.error("Fullscreen failed:", err);
  }
}

// ── Exit fullscreen ────────────────────────────────
async function exitFullscreen() {
  if (document.exitFullscreen) {
    await document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

// ── Toggle ────────────────────────────────────────
async function toggleFullscreen(element) {
  if (!document.fullscreenElement) {
    await enterFullscreen(element);
  } else {
    await exitFullscreen();
  }
}

// ── Check state ───────────────────────────────────
console.log(document.fullscreenElement); // element or null
console.log(document.fullscreenEnabled); // browser supports it

// ── Events ────────────────────────────────────────
document.addEventListener("fullscreenchange", () => {
  const btn = document.getElementById("fs-btn");
  if (document.fullscreenElement) {
    btn.textContent = "⛶ Exit Fullscreen";
    document.body.classList.add("is-fullscreen");
  } else {
    btn.textContent = "⛶ Fullscreen";
    document.body.classList.remove("is-fullscreen");
  }
});

document.addEventListener("fullscreenerror", (e) => {
  console.error("Fullscreen error:", e);
});

// ── Video player with fullscreen ──────────────────
const player  = document.getElementById("player");
const video   = player.querySelector("video");
const fsBtn   = player.querySelector(".fullscreen-btn");

fsBtn.addEventListener("click", () => {
  toggleFullscreen(player); // fullscreen the player, not just the video
});

// ESC key (automatic in browsers, but you can add UI feedback)
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.fullscreenElement) {
    // Browser handles ESC automatically, this just adds custom logic
    console.log("Exiting fullscreen via ESC");
  }
});`,
  },

  // ─── ADVANCED ───────────────────────────────────────────────
  {
    q: "What is the Web Speech API (speech synthesis and recognition)?",
    a: "The Web Speech API provides two capabilities: SpeechSynthesis for text-to-speech (TTS), and SpeechRecognition for voice-to-text. Both run natively in the browser without external APIs.",
    code: `// ── Speech Synthesis (Text-to-Speech) ────────────
const synth = window.speechSynthesis;

// List available voices
function getVoices() {
  return new Promise(resolve => {
    const voices = synth.getVoices();
    if (voices.length) return resolve(voices);
    synth.addEventListener("voiceschanged", () => resolve(synth.getVoices()), { once: true });
  });
}

async function speak(text, options = {}) {
  synth.cancel(); // stop current speech
  const voices   = await getVoices();
  const utterance = new SpeechSynthesisUtterance(text);

  utterance.voice  = voices.find(v => v.lang === "en-US") ?? voices[0];
  utterance.rate   = options.rate   ?? 1;    // 0.1 to 10
  utterance.pitch  = options.pitch  ?? 1;    // 0 to 2
  utterance.volume = options.volume ?? 1;    // 0 to 1
  utterance.lang   = options.lang   ?? "en-US";

  utterance.onstart  = () => console.log("Speaking started");
  utterance.onend    = () => console.log("Speaking ended");
  utterance.onerror  = (e) => console.error("Speech error:", e.error);
  utterance.onpause  = () => console.log("Paused");
  utterance.onresume = () => console.log("Resumed");

  synth.speak(utterance);
  return utterance.finished ?? new Promise(r => utterance.onend = r);
}

synth.pause();
synth.resume();
synth.cancel();

// ── Speech Recognition (Voice-to-Text) ────────────
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();

  recognition.lang            = "en-US";
  recognition.continuous      = true;   // keep listening
  recognition.interimResults  = true;   // show partial results
  recognition.maxAlternatives = 3;      // number of alternatives

  recognition.onstart = () => console.log("Listening...");

  recognition.onresult = (e) => {
    let interim = "", final = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const transcript = e.results[i][0].transcript;
      if (e.results[i].isFinal) final   += transcript;
      else                       interim += transcript;
    }
    document.getElementById("interim").textContent = interim;
    document.getElementById("final").textContent  += final;
  };

  recognition.onerror = (e) => console.error("Recognition error:", e.error);
  recognition.onend   = () => console.log("Recognition ended");

  recognition.start();
  // recognition.stop();
  // recognition.abort();
}`,
  },
  {
    q: "What is the WebRTC API and how does it enable peer-to-peer communication?",
    a: "WebRTC (Web Real-Time Communication) enables peer-to-peer audio, video, and data sharing directly between browsers without a server intermediary. Uses ICE, STUN/TURN servers for connectivity, and SDP for negotiation.",
    code: `// ── Get user media ────────────────────────────────
async function startCall() {
  // Request camera and microphone
  const localStream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720, facingMode: "user" },
    audio: { echoCancellation: true, noiseSuppression: true },
  });

  // Display local video
  document.getElementById("local-video").srcObject = localStream;

  // ── Create peer connection ─────────────────────
  const pc = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },  // STUN server
      {
        urls:       "turn:turn.example.com:3478", // TURN server (for NAT traversal)
        username:   "user",
        credential: "pass",
      },
    ],
  });

  // Add local stream tracks
  localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

  // Handle remote stream
  pc.ontrack = (e) => {
    document.getElementById("remote-video").srcObject = e.streams[0];
  };

  // ICE candidate handling
  pc.onicecandidate = (e) => {
    if (e.candidate) {
      sendToSignalingServer({ type: "ice-candidate", candidate: e.candidate });
    }
  };

  pc.oniceconnectionstatechange = () => {
    console.log("ICE state:", pc.iceConnectionState);
  };

  // ── Offer/Answer exchange (via signaling server) ─
  // Caller creates offer
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  sendToSignalingServer({ type: "offer", sdp: offer });

  // Callee receives offer and creates answer
  async function handleOffer(offer) {
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    sendToSignalingServer({ type: "answer", sdp: answer });
  }

  // ── Data channel ──────────────────────────────
  const dataChannel = pc.createDataChannel("chat");
  dataChannel.onopen    = () => dataChannel.send("Hello peer!");
  dataChannel.onmessage = (e) => console.log("Message:", e.data);

  pc.ondatachannel = (e) => {
    e.channel.onmessage = (msg) => console.log("Received:", msg.data);
  };
}`,
  },
  {
    q: "What is the Broadcast Channel API?",
    a: "The Broadcast Channel API enables communication between browsing contexts (tabs, iframes, workers) with the same origin. It's simpler than SharedWorker for broadcasting messages to all contexts on the same origin.",
    code: `// ── Create channel (same name = same channel) ─────
const channel = new BroadcastChannel("app-channel");

// ── Send messages ──────────────────────────────────
channel.postMessage({ type: "USER_LOGIN", user: { id: 1, name: "Alice" } });
channel.postMessage({ type: "THEME_CHANGE", theme: "dark" });
channel.postMessage("simple string");

// ── Receive messages ───────────────────────────────
channel.onmessage = (e) => {
  const { type, ...data } = e.data;
  console.log("Received in tab:", type, data);

  switch (type) {
    case "USER_LOGIN":
      updateNavbar(data.user);
      break;
    case "USER_LOGOUT":
      redirectToLogin();
      break;
    case "THEME_CHANGE":
      document.body.dataset.theme = data.theme;
      break;
    case "CART_UPDATE":
      updateCartBadge(data.count);
      break;
  }
};

channel.onmessageerror = (e) => console.error("Message error:", e);

// Close channel when done
channel.close();

// ── Practical: sync auth state across tabs ─────────
class AuthSync {
  #channel = new BroadcastChannel("auth");

  constructor() {
    this.#channel.onmessage = ({ data }) => {
      if (data.type === "LOGIN")  this.#handleLogin(data.user);
      if (data.type === "LOGOUT") this.#handleLogout();
    };
  }

  broadcastLogin(user) {
    this.#channel.postMessage({ type: "LOGIN", user });
  }

  broadcastLogout() {
    this.#channel.postMessage({ type: "LOGOUT" });
    localStorage.removeItem("auth_token");
  }

  #handleLogin(user)  { updateUI(user); }
  #handleLogout()     { redirectToLogin(); }

  destroy() { this.#channel.close(); }
}

// Tab A logs in → broadcasts → Tab B, C, D all update ✅`,
  },
  {
    q: "What is the Web Crypto API?",
    a: "The Web Crypto API provides cryptographic operations in the browser: hashing, signing, verifying, encrypting, decrypting, and generating keys. Operations are performed in a secure context (HTTPS) and use native browser cryptography.",
    code: `const crypto = window.crypto.subtle;

// ── Random values ──────────────────────────────────
const randomBytes = window.crypto.getRandomValues(new Uint8Array(16));
const uuid        = crypto.randomUUID(); // standard UUID v4

// ── Hashing (SHA-256) ──────────────────────────────
async function sha256(message) {
  const encoder = new TextEncoder();
  const data    = encoder.encode(message);
  const hash    = await crypto.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

const hash = await sha256("Hello, World!");
console.log(hash); // "dffd6021bb2bd..."

// ── Password hashing with PBKDF2 ──────────────────
async function hashPassword(password, salt = window.crypto.getRandomValues(new Uint8Array(16))) {
  const encoder  = new TextEncoder();
  const keyMat   = await crypto.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const hashBits = await crypto.deriveBits(
    { name: "PBKDF2", salt, hash: "SHA-256", iterations: 100000 },
    keyMat, 256
  );
  return { hash: new Uint8Array(hashBits), salt };
}

// ── AES-GCM Encryption ────────────────────────────
async function encrypt(plaintext, password) {
  const encoder = new TextEncoder();
  const salt    = window.crypto.getRandomValues(new Uint8Array(16));
  const iv      = window.crypto.getRandomValues(new Uint8Array(12));

  const keyMat = await crypto.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveKey"]);
  const key    = await crypto.deriveKey(
    { name: "PBKDF2", salt, hash: "SHA-256", iterations: 100000 },
    keyMat,
    { name: "AES-GCM", length: 256 },
    false, ["encrypt"]
  );

  const encrypted = await crypto.encrypt({ name: "AES-GCM", iv }, key, encoder.encode(plaintext));
  return { encrypted, salt, iv };
}

// ── ECDSA Signing ─────────────────────────────────
async function generateSigningKeys() {
  return crypto.generateKey(
    { name: "ECDSA", namedCurve: "P-256" },
    true,  // extractable
    ["sign", "verify"]
  );
}

async function signData(privateKey, data) {
  const encoder = new TextEncoder();
  return crypto.sign({ name: "ECDSA", hash: "SHA-256" }, privateKey, encoder.encode(data));
}`,
  },
  {
    q: "What is the Payment Request API?",
    a: "The Payment Request API provides a standardized interface for collecting payment information. It shows a native browser payment UI, supports multiple payment methods (credit cards, digital wallets), and reduces checkout friction.",
    code: `async function processPayment(orderTotal) {
  // Check support
  if (!window.PaymentRequest) {
    showLegacyCheckout();
    return;
  }

  // Payment methods
  const paymentMethods = [
    // Basic card (credit/debit)
    {
      supportedMethods: "basic-card",
      data: {
        supportedNetworks: ["visa", "mastercard", "amex"],
        supportedTypes:    ["credit", "debit"],
      },
    },
    // Google Pay
    {
      supportedMethods: "https://google.com/pay",
      data: {
        environment: "TEST",
        apiVersion:  2,
        apiVersionMinor: 0,
        merchantInfo: { merchantName: "My Store" },
        allowedPaymentMethods: [{
          type: "CARD",
          parameters: { allowedAuthMethods: ["PAN_ONLY"], allowedCardNetworks: ["VISA", "MASTERCARD"] },
        }],
      },
    },
  ];

  // Order details
  const details = {
    displayItems: [
      { label: "Product 1", amount: { currency: "USD", value: "29.99" } },
      { label: "Shipping",  amount: { currency: "USD", value: "4.99" } },
      { label: "Tax",       amount: { currency: "USD", value: "3.50" } },
    ],
    total: { label: "Total", amount: { currency: "USD", value: orderTotal } },
  };

  // Options
  const options = {
    requestPayerName:  true,
    requestPayerEmail: true,
    requestPayerPhone: false,
    requestShipping:   true,
    shippingType:      "shipping", // "delivery" | "pickup"
  };

  try {
    const request  = new PaymentRequest(paymentMethods, details, options);

    // Listen for shipping address changes
    request.addEventListener("shippingaddresschange", async (e) => {
      const shippingOptions = await calculateShipping(request.shippingAddress);
      e.updateWith({ ...details, shippingOptions });
    });

    const response = await request.show(); // shows native UI

    // Send payment to server
    const result   = await sendPaymentToServer(response);

    if (result.success) {
      await response.complete("success");
      showOrderConfirmation();
    } else {
      await response.complete("fail");
      showPaymentError();
    }
  } catch (err) {
    if (err.name === "AbortError") console.log("User cancelled");
    else console.error("Payment failed:", err);
  }
}`,
  },
  {
    q: "What are HTML5 accessibility best practices (ARIA)?",
    a: "Accessibility ensures web content works for everyone including users with disabilities. ARIA (Accessible Rich Internet Applications) supplements HTML semantics with roles, states, and properties that screen readers use to describe dynamic content.",
    code: `<!-- ── Semantic HTML first ────────────────────────── -->
<!-- Bad: div soup -->
<div onclick="handleClick()">Click me</div>

<!-- Good: semantic button -->
<button onclick="handleClick()">Click me</button>

<!-- ── ARIA roles ──────────────────────────────────── -->
<div role="button" tabindex="0"
  onclick="handleClick()"
  onkeydown="e.key==='Enter'&&handleClick()">
  Custom button
</div>

<div role="alert" aria-live="assertive">
  Important message displayed here
</div>

<nav role="navigation" aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li aria-current="page">Laptops</li>
  </ol>
</nav>

<!-- ── ARIA states and properties ────────────────── -->
<button
  aria-expanded="false"
  aria-controls="dropdown-menu"
  aria-haspopup="true"
  id="menu-btn"
>
  Menu ▼
</button>

<ul id="dropdown-menu"
  role="menu"
  aria-labelledby="menu-btn"
  hidden
>
  <li role="menuitem"><a href="/home">Home</a></li>
</ul>

<!-- Modal dialog -->
<div role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-desc"
>
  <h2 id="dialog-title">Confirm Delete</h2>
  <p id="dialog-desc">Are you sure you want to delete this item?</p>
  <button>Cancel</button>
  <button>Delete</button>
</div>

<!-- Form accessibility -->
<form>
  <div>
    <label for="name">Full Name <span aria-hidden="true">*</span></label>
    <input type="text" id="name" name="name"
      required
      aria-required="true"
      aria-invalid="false"
      aria-describedby="name-error"
    />
    <span id="name-error" role="alert" aria-live="polite"></span>
  </div>
</form>

<script>
// Focus management for modals
function openModal(modal) {
  modal.removeAttribute("hidden");
  modal.removeAttribute("inert");
  const firstFocusable = modal.querySelector("button, [href], input, [tabindex]");
  firstFocusable?.focus();
  previousFocus = document.activeElement;
}

function closeModal(modal) {
  modal.setAttribute("hidden", "");
  modal.setAttribute("inert", "");
  previousFocus?.focus(); // restore focus
}
</script>`,
  },
  {
    q: "What is the Picture element and responsive images in HTML5?",
    a: "The <picture> element and srcset/sizes attributes enable serving different images based on viewport size, pixel density, and supported formats. This optimizes bandwidth by sending appropriately sized images to each device.",
    code: `<!-- ── srcset for resolution switching ────────────── -->
<img
  src="image-800w.jpg"
  srcset="
    image-400w.jpg  400w,
    image-800w.jpg  800w,
    image-1200w.jpg 1200w,
    image-2400w.jpg 2400w
  "
  sizes="
    (max-width: 480px)  100vw,
    (max-width: 768px)  80vw,
    (max-width: 1200px) 60vw,
    800px
  "
  alt="Responsive image"
  loading="lazy"
  decoding="async"
/>

<!-- ── picture for art direction ──────────────────── -->
<picture>
  <!-- Wide crop for desktop -->
  <source
    media="(min-width: 1024px)"
    srcset="hero-desktop.webp 1x, hero-desktop@2x.webp 2x"
    type="image/webp"
  />
  <!-- Square crop for mobile -->
  <source
    media="(max-width: 1023px)"
    srcset="hero-mobile.webp 1x, hero-mobile@2x.webp 2x"
    type="image/webp"
  />
  <!-- JPEG fallback for browsers without WebP support -->
  <img
    src="hero-desktop.jpg"
    alt="Hero image"
    width="1200"
    height="600"
  />
</picture>

<!-- ── Modern formats with fallback ───────────────── -->
<picture>
  <source srcset="photo.avif" type="image/avif" />  <!-- best compression -->
  <source srcset="photo.webp" type="image/webp" />  <!-- good compression -->
  <img    src="photo.jpg"     alt="Photo"        />  <!-- JPEG fallback -->
</picture>

<!-- ── Lazy loading ───────────────────────────────── -->
<img src="image.jpg" loading="lazy" alt="Lazy loaded" />

<!-- ── Aspect ratio preservation ─────────────────── -->
<img src="photo.jpg" alt="Photo" width="800" height="600" />
<!-- Always specify width/height to prevent layout shift (CLS) -->

<script>
// JavaScript responsive image loading
function loadResponsiveImage(container) {
  const dpr      = window.devicePixelRatio || 1;
  const width    = container.clientWidth;
  const imgWidth = Math.round(width * dpr);
  const img      = container.querySelector("img");
  img.src        = \`/api/image?w=\${imgWidth}&q=80\`;
}

// Decode image off main thread
async function loadImage(src) {
  const img = new Image();
  img.src   = src;
  await img.decode(); // decode off main thread ✅
  document.body.appendChild(img);
}
</script>`,
  },
  {
    q: "What is the Custom Elements API (Web Components)?",
    a: "Custom Elements let you define your own HTML elements with custom behavior using JavaScript classes. Combined with Shadow DOM and HTML Templates, they form Web Components — reusable, framework-agnostic UI components.",
    code: `// ── Define a custom element ───────────────────────
class UserCard extends HTMLElement {
  // Observed attributes trigger attributeChangedCallback
  static observedAttributes = ["name", "role", "avatar"];

  constructor() {
    super(); // always call super first
    // Create shadow DOM (encapsulated from page styles)
    this.attachShadow({ mode: "open" });
  }

  // Called when element is added to DOM
  connectedCallback() {
    this.render();
  }

  // Called when element is removed from DOM
  disconnectedCallback() {
    this.cleanup();
  }

  // Called when observed attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this.render();
  }

  render() {
    const name   = this.getAttribute("name")   ?? "Unknown";
    const role   = this.getAttribute("role")   ?? "User";
    const avatar = this.getAttribute("avatar") ?? "/default-avatar.png";

    this.shadowRoot.innerHTML = \`
      <style>
        :host {
          display: block;
          font-family: var(--font-sans, sans-serif);
        }
        .card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border: 1px solid #222;
          border-radius: 8px;
          background: #1a1a1a;
        }
        img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
        }
        .name { font-weight: bold; color: #f0c040; }
        .role { font-size: 0.85em; color: #888; }
      </style>
      <div class="card">
        <img src="\${avatar}" alt="\${name}" />
        <div>
          <div class="name">\${name}</div>
          <div class="role">\${role}</div>
        </div>
        <slot></slot>  <!-- allow child content -->
      </div>
    \`;
  }

  cleanup() { /* remove event listeners, timers */ }
}

// Register the custom element
customElements.define("user-card", UserCard);

// ── Usage in HTML ─────────────────────────────────
// <user-card name="Alice" role="Admin" avatar="/alice.jpg">
//   <button slot="action">Message</button>
// </user-card>

// ── Extending built-in elements ───────────────────
class FancyButton extends HTMLButtonElement {
  connectedCallback() {
    this.classList.add("fancy");
  }
}
customElements.define("fancy-button", FancyButton, { extends: "button" });
// <button is="fancy-button">Click me</button>

// ── Lifecycle from JavaScript ──────────────────────
const card = document.createElement("user-card");
card.setAttribute("name", "Bob");
document.body.appendChild(card); // triggers connectedCallback`,
  },
  {
    q: "What is the Shadow DOM and HTML Templates?",
    a: "Shadow DOM creates an encapsulated DOM tree attached to an element, with scoped styles and isolated structure. HTML Templates (<template> and <slot>) define reusable markup that isn't rendered until cloned. Together they complete the Web Components specification.",
    code: `<!-- ── HTML Template ─────────────────────────────── -->
<template id="card-template">
  <style>
    /* Styles are scoped to this template's shadow DOM */
    .card { border: 1px solid #222; padding: 16px; border-radius: 8px; }
    h2    { color: #f0c040; }
  </style>
  <div class="card">
    <img class="avatar" src="" alt="" />
    <h2 class="name"></h2>
    <p  class="bio"></p>
    <!-- Named slots for content injection -->
    <slot name="actions">
      <button>Default Button</button>  <!-- fallback content -->
    </slot>
  </div>
</template>

<!-- ── Slot usage ─────────────────────────────────── -->
<user-profile name="Alice" bio="Developer">
  <!-- These fill the named slot -->
  <button slot="actions">Follow</button>
  <button slot="actions">Message</button>
</user-profile>

<script>
// ── Clone and use template ─────────────────────────
const template = document.getElementById("card-template");
const clone    = template.content.cloneNode(true); // deep clone
clone.querySelector(".name").textContent = "Alice";
document.body.appendChild(clone);

// ── Shadow DOM ────────────────────────────────────
class ProfileCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    // mode: "open"   - accessible from outside: el.shadowRoot
    // mode: "closed" - no outside access: el.shadowRoot = null

    const template = document.getElementById("card-template");
    shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // Shadow DOM queries are scoped to shadow root
    this.shadowRoot.querySelector(".name").textContent =
      this.getAttribute("name");
    this.shadowRoot.querySelector(".avatar").src =
      this.getAttribute("avatar");
  }
}
customElements.define("profile-card", ProfileCard);

// ── CSS custom properties pierce shadow DOM ────────
// In page CSS:
// user-profile { --primary-color: #f0c040; }
// In shadow DOM:
// .name { color: var(--primary-color, #fff); }

// ── ::slotted pseudo-element ──────────────────────
// Style slotted content FROM within shadow DOM:
// ::slotted(button) { background: #f0c040; }

// ── :host pseudo-element ──────────────────────────
// Style the host element from inside shadow DOM:
// :host { display: block; }
// :host(:hover) { opacity: 0.9; }
// :host([disabled]) { pointer-events: none; }
</script>`,
  },
  {
    q: "What is the Performance API and how do you measure web performance?",
    a: "The Performance API provides high-resolution timing and measurements for web applications. It includes PerformanceObserver for Core Web Vitals, User Timing API for custom marks and measures, and Navigation Timing for page load metrics.",
    code: `// ── Navigation Timing ─────────────────────────────
const [navEntry] = performance.getEntriesByType("navigation");
console.log("DNS lookup:",      navEntry.domainLookupEnd - navEntry.domainLookupStart);
console.log("TCP connect:",     navEntry.connectEnd - navEntry.connectStart);
console.log("Time to first byte:", navEntry.responseStart - navEntry.requestStart);
console.log("DOM interactive:", navEntry.domInteractive - navEntry.fetchStart);
console.log("DOM complete:",    navEntry.domComplete - navEntry.fetchStart);
console.log("Load event:",      navEntry.loadEventEnd - navEntry.fetchStart);

// ── Resource Timing ────────────────────────────────
const resources = performance.getEntriesByType("resource");
resources.forEach(r => {
  console.log(\`\${r.name}: \${r.duration.toFixed(2)}ms (\${r.transferSize} bytes)\`);
});

// ── User Timing API ────────────────────────────────
// Mark specific points
performance.mark("api-start");
const data = await fetchData();
performance.mark("api-end");

// Measure between marks
performance.measure("api-duration", "api-start", "api-end");

const measures = performance.getEntriesByName("api-duration");
console.log("API call took:", measures[0].duration, "ms");

// Cleanup
performance.clearMarks();
performance.clearMeasures();

// ── PerformanceObserver - observe in real time ─────
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    console.log(entry.entryType, entry.name, entry.startTime, entry.duration);
  });
});

observer.observe({ entryTypes: ["measure", "resource", "navigation"] });

// ── Core Web Vitals ────────────────────────────────
// LCP - Largest Contentful Paint (< 2.5s is good)
new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lcp     = entries[entries.length - 1];
  console.log("LCP:", lcp.startTime, "ms");
  console.log("LCP element:", lcp.element);
}).observe({ type: "largest-contentful-paint", buffered: true });

// CLS - Cumulative Layout Shift (< 0.1 is good)
let clsValue = 0;
new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    if (!entry.hadRecentInput) clsValue += entry.value;
  });
  console.log("CLS:", clsValue);
}).observe({ type: "layout-shift", buffered: true });

// FID - First Input Delay (< 100ms is good)
new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    console.log("FID:", entry.processingStart - entry.startTime, "ms");
  });
}).observe({ type: "first-input", buffered: true });`,
  },
  {
    q: "What are the best practices for HTML5 SEO?",
    a: "SEO-friendly HTML5 uses semantic structure, proper meta tags, structured data (JSON-LD), Open Graph tags, canonical URLs, descriptive alt text, and performance optimization. Search engines increasingly use page experience signals.",
    code: `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <!-- Essential meta tags -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="150-160 character description of the page content for search results snippets." />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />

  <!-- Canonical URL - prevents duplicate content -->
  <link rel="canonical" href="https://example.com/current-page" />

  <!-- Open Graph (Facebook, LinkedIn, etc.) -->
  <meta property="og:title"       content="Page Title | Site Name" />
  <meta property="og:description" content="Page description for social sharing" />
  <meta property="og:image"       content="https://example.com/og-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height"content="630" />
  <meta property="og:url"         content="https://example.com/page" />
  <meta property="og:type"        content="website" />
  <meta property="og:site_name"   content="My Website" />

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image" />
  <meta name="twitter:title"       content="Page Title" />
  <meta name="twitter:description" content="Page description" />
  <meta name="twitter:image"       content="https://example.com/twitter-image.jpg" />
  <meta name="twitter:creator"     content="@username" />

  <title>Primary Keyword - Secondary Keyword | Brand Name</title>

  <!-- Structured data (JSON-LD) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Article Title",
    "author": { "@type": "Person", "name": "Alice Smith" },
    "datePublished": "2024-01-15",
    "dateModified": "2024-02-01",
    "publisher": {
      "@type": "Organization",
      "name": "My Website",
      "logo": { "@type": "ImageObject", "url": "https://example.com/logo.png" }
    },
    "image": "https://example.com/article-image.jpg"
  }
  </script>
</head>
<body>
  <!-- One H1 per page with primary keyword -->
  <h1>Primary Keyword in H1</h1>

  <!-- Hierarchical heading structure -->
  <h2>Section Title</h2>
  <h3>Subsection Title</h3>

  <!-- Descriptive alt text for images -->
  <img src="cat.jpg" alt="Orange tabby cat sleeping on a wooden floor" />

  <!-- Descriptive link text (not "click here") -->
  <a href="/guide">Read our complete beginner's guide to HTML5</a>

  <!-- Internal linking -->
  <a href="/related-article">Related: Advanced CSS Grid techniques</a>
</body>
</html>`,
  },
  {
    q: "What is the Content Security Policy (CSP) and how is it implemented in HTML5?",
    a: "Content Security Policy is a security feature that prevents XSS attacks by controlling which resources the browser can load. Defined via HTTP header or meta tag, it specifies allowed sources for scripts, styles, images, and other resources.",
    code: `<!-- ── Meta tag CSP (limited, no report-uri) ─────── -->
<meta http-equiv="Content-Security-Policy"
  content="
    default-src 'self';
    script-src  'self' 'nonce-abc123' https://cdn.example.com;
    style-src   'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src     'self' data: https:;
    font-src    'self' https://fonts.gstatic.com;
    connect-src 'self' https://api.example.com wss://ws.example.com;
    frame-src   'none';
    object-src  'none';
    base-uri    'self';
    form-action 'self';
  "
/>

<!-- ── HTTP Header (preferred) ───────────────────── -->
<!-- Set in server config (nginx, Apache, Express): -->
<!--
Content-Security-Policy:
  default-src 'self';
  script-src  'self' 'nonce-{random}' https://trusted-cdn.com;
  style-src   'self' 'nonce-{random}';
  img-src     'self' data: https:;
  connect-src 'self' https://api.example.com;
  frame-src   'none';
  report-uri  /csp-violation-report;
-->

<!-- ── Using nonces for inline scripts ────────────── -->
<!-- Server generates a random nonce per request -->
<script nonce="abc123">
  // This inline script is allowed because it has the correct nonce
  console.log("Trusted inline script");
</script>

<!-- Inline script without nonce is blocked -->
<script>alert("Blocked by CSP!")</script>

<script>
// ── Express.js CSP header ─────────────────────────
const crypto = require("crypto");

app.use((req, res, next) => {
  const nonce = crypto.randomBytes(16).toString("base64");
  res.locals.nonce = nonce;

  res.setHeader("Content-Security-Policy", [
    "default-src 'self'",
    \`script-src 'self' 'nonce-\${nonce}'\`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "connect-src 'self' https://api.example.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    \`report-uri /csp-report\`,
  ].join("; "));
  next();
});

// CSP violation endpoint
app.post("/csp-report", express.json({ type: "application/csp-report" }), (req, res) => {
  console.log("CSP Violation:", req.body["csp-report"]);
  res.status(204).send();
});
</script>`,
  },
];