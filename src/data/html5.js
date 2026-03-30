export const meta = {
  id: "html5",
  label: "HTML5",
  icon: "🌐",
  color: "#e34f26",
  desc: "The standard markup language for creating web pages and applications.",
};

export const qaData = [
  {
    q: "Semantic Elements",
    a: "Semantic HTML uses meaningful tags that describe their content's purpose. Improves accessibility, SEO, and code readability over generic div/span soup.",
    code: `<!-- ❌ Non-semantic -->
  <div class="header">
    <div class="nav">...</div>
  </div>
  <div class="main">
    <div class="article">...</div>
    <div class="sidebar">...</div>
  </div>
  
  <!-- ✅ Semantic -->
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
      <section>...</section>
      <aside>Related content</aside>
    </article>
  </main>
  <footer>© 2025</footer>`,
  },
  {
    q: "Web Storage API",
    a: "localStorage and sessionStorage provide client-side key-value storage. localStorage persists until cleared; sessionStorage clears on tab close. Both are synchronous and limited to ~5MB.",
    code: `// localStorage - persists forever
  localStorage.setItem("user", JSON.stringify({ name: "Alice", role: "admin" }));
  const user = JSON.parse(localStorage.getItem("user") ?? "null");
  localStorage.removeItem("user");
  localStorage.clear();
  
  // sessionStorage - cleared on tab close
  sessionStorage.setItem("cart", JSON.stringify([]));
  
  // Storage event (cross-tab sync)
  window.addEventListener("storage", (e) => {
    console.log(\`Key "\${e.key}" changed\`);
    console.log("Old:", e.oldValue);
    console.log("New:", e.newValue);
  });`,
  },
  {
    q: "Canvas API",
    a: "The <canvas> element provides a 2D drawing surface via JavaScript. Used for charts, games, image manipulation, and animations.",
    code: `const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  
  // Draw rectangle
  ctx.fillStyle = "#f0c040";
  ctx.fillRect(10, 10, 100, 60);
  
  // Draw circle
  ctx.beginPath();
  ctx.arc(200, 100, 50, 0, Math.PI * 2);
  ctx.fillStyle = "#61dafb";
  ctx.fill();
  
  // Draw text
  ctx.font = "bold 24px Syne";
  ctx.fillStyle = "#fff";
  ctx.fillText("Hello Canvas", 10, 160);
  
  // Animate
  let x = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(x++, 50, 30, 30);
    if (x < canvas.width) requestAnimationFrame(animate);
  }
  animate();`,
  },
  {
    q: "Web APIs: Fetch, IntersectionObserver, ResizeObserver",
    a: "Modern browser APIs replace jQuery-era patterns. Fetch for HTTP, IntersectionObserver for lazy loading, ResizeObserver for responsive components.",
    code: `// Fetch API
  const res = await fetch("/api/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key: "value" }),
  });
  const data = await res.json();
  
  // IntersectionObserver - lazy load images
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll("img[data-src]").forEach(img => observer.observe(img));
  
  // ResizeObserver
  const ro = new ResizeObserver(entries => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      console.log(\`Size: \${width}x\${height}\`);
    }
  });
  ro.observe(document.getElementById("box"));`,
  },
  {
    q: "Forms & Validation",
    a: "HTML5 adds built-in form validation attributes. The Constraint Validation API lets you customize validation behavior with JavaScript.",
    code: `<!-- Built-in validation -->
  <form novalidate>
    <input type="email" required placeholder="Email" />
    <input type="password" minlength="8" required />
    <input type="number" min="0" max="100" step="5" />
    <input type="url" pattern="https?://.+" />
    <input type="date" min="2024-01-01" />
  </form>
  
  <!-- Custom validation via JS -->
  <script>
  const input = document.querySelector("input[type=email]");
  
  input.addEventListener("input", () => {
    if (input.validity.valueMissing) {
      input.setCustomValidity("Email is required");
    } else if (input.validity.typeMismatch) {
      input.setCustomValidity("Please enter a valid email");
    } else {
      input.setCustomValidity(""); // clears error
    }
  });
  </script>`,
  },
  {
    q: "Accessibility (a11y)",
    a: "Accessibility ensures web content works for everyone, including users with disabilities. Use ARIA attributes, semantic HTML, keyboard navigation, and sufficient color contrast.",
    code: `<!-- ARIA roles and labels -->
  <button
    aria-label="Close dialog"
    aria-expanded="false"
    aria-controls="menu-id"
  >
    ✕
  </button>
  
  <!-- Live regions for dynamic content -->
  <div aria-live="polite" aria-atomic="true">
    Status updates appear here
  </div>
  
  <!-- Skip link for keyboard users -->
  <a href="#main-content" class="skip-link">Skip to content</a>
  
  <script>
  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab")    manageFocusTrap(e);
  });
  
  // Focus management
  function openModal() {
    modal.removeAttribute("hidden");
    modal.querySelector("[autofocus]").focus();
  }
  </script>`,
  },
];
