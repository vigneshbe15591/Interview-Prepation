export const meta = {
  id: "css3",
  label: "CSS3",
  icon: "🎨",
  color: "#1572b6",
  desc: "Stylesheet language for designing and animating web interfaces.",
};

export const qaData = [
  {
    q: "CSS Grid",
    a: "CSS Grid is a 2D layout system. Define rows and columns on a container; place items anywhere in the grid. More powerful than Flexbox for full-page layouts.",
    code: `/* Basic grid */
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 16px;
  }
  
  /* Named areas */
  .layout {
    display: grid;
    grid-template-areas:
      "header header header"
      "sidebar main   main"
      "footer footer footer";
    grid-template-columns: 240px 1fr 1fr;
  }
  .header  { grid-area: header; }
  .sidebar { grid-area: sidebar; }
  .main    { grid-area: main; }
  
  /* Auto-fill responsive columns */
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }`,
  },
  {
    q: "Flexbox",
    a: "Flexbox is a 1D layout system for rows or columns. Perfect for aligning items, distributing space, and building nav bars, cards, and component-level layouts.",
    code: `/* Container properties */
  .flex {
    display: flex;
    flex-direction: row;          /* row | column */
    justify-content: space-between; /* main axis */
    align-items: center;          /* cross axis */
    flex-wrap: wrap;
    gap: 16px;
  }
  
  /* Item properties */
  .item {
    flex: 1 1 200px;  /* grow shrink basis */
    align-self: flex-start;
    order: 2;
  }
  
  /* Common patterns */
  /* Center anything */
  .center { display: flex; place-items: center; }
  
  /* Sticky footer */
  body { display: flex; flex-direction: column; min-height: 100vh; }
  main { flex: 1; }`,
  },
  {
    q: "CSS Custom Properties (Variables)",
    a: "CSS variables are dynamic, cascading values that can be updated with JavaScript. Essential for theming, design tokens, and maintaining consistent values.",
    code: `/* Define in :root for global scope */
  :root {
    --color-primary: #f0c040;
    --color-bg: #0a0a0a;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --font-size-base: 1rem;
    --border-radius: 8px;
  }
  
  /* Use variables */
  .button {
    background: var(--color-primary);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius);
  }
  
  /* Override in component scope */
  .dark-card {
    --color-primary: #3178c6;
  }
  
  /* Update via JavaScript */
  document.documentElement.style.setProperty("--color-primary", "#ff6b6b");`,
  },
  {
    q: "Animations & Transitions",
    a: "CSS transitions animate between states smoothly. Keyframe animations enable complex multi-step animations. Both run on the compositor thread for 60fps performance.",
    code: `/* Transitions */
  .button {
    background: #f0c040;
    transform: scale(1);
    transition: transform 0.2s ease, background 0.3s ease;
  }
  .button:hover {
    transform: scale(1.05);
    background: #d4a800;
  }
  
  /* Keyframe animation */
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .card { animation: slideIn 0.4s ease forwards; }
  .loader { animation: spin 1s linear infinite; }
  
  /* Staggered animations */
  .item:nth-child(1) { animation-delay: 0.1s; }
  .item:nth-child(2) { animation-delay: 0.2s; }
  .item:nth-child(3) { animation-delay: 0.3s; }`,
  },
  {
    q: "Responsive Design & Media Queries",
    a: "Media queries apply styles based on viewport size, orientation, or device capabilities. Mobile-first means writing base styles for small screens and overriding upward.",
    code: `/* Mobile-first approach */
  .container {
    padding: 16px;
    font-size: 14px;
  }
  
  /* Tablet */
  @media (min-width: 768px) {
    .container {
      padding: 24px;
      font-size: 16px;
    }
  }
  
  /* Desktop */
  @media (min-width: 1024px) {
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 32px;
    }
  }
  
  /* Feature queries */
  @supports (display: grid) {
    .layout { display: grid; }
  }
  
  /* Dark mode */
  @media (prefers-color-scheme: dark) {
    :root { --bg: #0a0a0a; --text: #e8e8e8; }
  }
  
  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; }
  }`,
  },
  {
    q: "Pseudo-classes & Pseudo-elements",
    a: "Pseudo-classes select elements in a specific state (:hover, :focus, :nth-child). Pseudo-elements create virtual sub-elements (::before, ::after, ::placeholder).",
    code: `/* Pseudo-classes */
  a:hover   { color: #f0c040; }
  a:visited { color: #888; }
  input:focus { outline: 2px solid #f0c040; }
  button:disabled { opacity: 0.4; cursor: not-allowed; }
  
  /* Structural pseudo-classes */
  li:first-child  { font-weight: bold; }
  li:last-child   { border-bottom: none; }
  li:nth-child(2n)   { background: #1a1a1a; } /* even rows */
  li:nth-child(3n+1) { color: #f0c040; }       /* every 3rd from 1st */
  
  /* :not() */
  button:not(:disabled):hover { transform: scale(1.05); }
  
  /* Pseudo-elements */
  .quote::before { content: '"'; font-size: 3em; color: #f0c040; }
  .quote::after  { content: '"'; }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #111; }
  ::-webkit-scrollbar-thumb { background: #f0c040; border-radius: 3px; }`,
  },
];
