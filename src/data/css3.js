export const meta = {
  id: "css3",
  label: "CSS3",
  icon: "🎨",
  color: "#1572b6",
  desc: "Stylesheet language for designing and animating beautiful web interfaces.",
};

export const qaData = [
  // ─── BEGINNER ────────────────────────────────────────────
  {
    q: "What is the CSS Box Model?",
    a: "The CSS box model describes how every HTML element is rendered as a rectangular box consisting of content, padding, border, and margin. Understanding it is fundamental to controlling layout and spacing. box-sizing: border-box makes width calculations intuitive.",
    code: `/* Box model layers (inside out):
   Content → Padding → Border → Margin */

.box {
  /* Content */
  width:  300px;
  height: 150px;

  /* Padding - space between content and border */
  padding:        20px;          /* all sides */
  padding-top:    10px;
  padding-right:  20px;
  padding-bottom: 10px;
  padding-left:   20px;
  padding:        10px 20px;     /* vertical horizontal */
  padding:        10px 20px 15px 5px; /* top right bottom left */

  /* Border */
  border:        2px solid #f0c040;
  border-top:    3px dashed #333;
  border-radius: 8px;

  /* Margin - space outside the border */
  margin:        20px auto;      /* vertical: 20px, horizontal: auto (center) */
}

/* box-sizing: content-box (default) */
/* width = content only */
/* total rendered width = width + padding + border */
.content-box {
  box-sizing: content-box;  /* default */
  width:   300px;
  padding: 20px;
  border:  2px solid;
  /* Actual rendered width: 300 + 40 + 4 = 344px */
}

/* box-sizing: border-box (recommended) */
/* width includes content + padding + border */
/* total rendered width = width */
.border-box {
  box-sizing: border-box;  /* predictable! */
  width:   300px;
  padding: 20px;
  border:  2px solid;
  /* Actual rendered width: 300px ✅ */
}

/* Apply border-box globally (best practice) */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Margin collapse - adjacent vertical margins collapse to largest */
.sibling-a { margin-bottom: 20px; }
.sibling-b { margin-top:    30px; }
/* Actual gap between them: 30px (not 50px!) */

/* Negative margins */
.pulled-up { margin-top: -20px; } /* pulls element up */`,
  },
  {
    q: "What is the difference between display: block, inline, and inline-block?",
    a: "block elements take the full width available and start on a new line. inline elements flow with text and only take as much width as needed — width and height cannot be set. inline-block combines both: flows inline but accepts width, height, and vertical padding.",
    code: `/* display: block */
.block {
  display: block;
  width: 100%;           /* takes full width by default */
  height: 50px;          /* height works ✅ */
  margin: 10px 0;        /* vertical margin works ✅ */
  /* Always starts on new line */
}
/* Default block elements: div, p, h1-h6, ul, ol, li,
   header, main, section, article, footer, form */

/* display: inline */
.inline {
  display: inline;
  /* width: 200px;  ← IGNORED ❌ */
  /* height: 50px;  ← IGNORED ❌ */
  /* margin-top/bottom ignored ❌ */
  padding: 4px 8px;    /* horizontal padding works, vertical is visual only */
  background: #f0c040; /* background works ✅ */
}
/* Default inline elements: span, a, strong, em, img, button,
   input, label, select, textarea */

/* display: inline-block */
.inline-block {
  display: inline-block;
  width:   150px;       /* width works ✅ */
  height:   40px;       /* height works ✅ */
  margin:    8px;       /* all margins work ✅ */
  padding:  10px;       /* all padding works ✅ */
  vertical-align: middle; /* align with surrounding text */
  /* Flows inline (sits next to other elements) ✅ */
}

/* Common use cases */
/* Nav links side by side */
nav a {
  display: inline-block;
  padding: 8px 16px;
}

/* Image grid */
.image { display: inline-block; width: 200px; margin: 8px; }`,
  },
  {
    q: "What is Flexbox and how does it work?",
    a: "Flexbox (Flexible Box Layout) is a one-dimensional layout system for arranging items in rows or columns. The container controls alignment, direction, wrapping, and spacing. Items can grow, shrink, and align themselves.",
    code: `/* ── Flex Container Properties ──────────────────── */
.container {
  display: flex;          /* or inline-flex */

  /* Direction */
  flex-direction: row;            /* → default */
  flex-direction: row-reverse;    /* ← */
  flex-direction: column;         /* ↓ */
  flex-direction: column-reverse; /* ↑ */

  /* Wrapping */
  flex-wrap: nowrap;  /* default - no wrap */
  flex-wrap: wrap;    /* wrap to next line */

  /* Shorthand */
  flex-flow: row wrap;

  /* Main axis alignment (flex-direction axis) */
  justify-content: flex-start;    /* ← default */
  justify-content: flex-end;      /* → */
  justify-content: center;        /* center */
  justify-content: space-between; /* | item | item | item | */
  justify-content: space-around;  /* item   item   item */
  justify-content: space-evenly;  /* equal space everywhere */

  /* Cross axis alignment (perpendicular) */
  align-items: stretch;     /* default - fill container height */
  align-items: flex-start;  /* top */
  align-items: flex-end;    /* bottom */
  align-items: center;      /* middle */
  align-items: baseline;    /* align text baselines */

  /* Multi-line cross axis */
  align-content: flex-start;
  align-content: space-between;

  gap: 16px;            /* gap between items */
  gap: 16px 24px;       /* row-gap column-gap */
}

/* ── Flex Item Properties ────────────────────────── */
.item {
  flex-grow:   1;   /* how much to grow (default 0) */
  flex-shrink: 1;   /* how much to shrink (default 1) */
  flex-basis:  auto; /* initial size before grow/shrink */
  flex:        1 1 200px; /* shorthand: grow shrink basis */
  flex:        1;   /* flex: 1 1 0 */

  align-self: center;    /* override container's align-items */
  order:      2;         /* display order (default 0) */
}

/* ── Common patterns ─────────────────────────────── */
/* Center anything */
.center { display: flex; place-items: center; /* align+justify */ }

/* Sticky footer */
body   { display: flex; flex-direction: column; min-height: 100vh; }
main   { flex: 1; }  /* grows to fill remaining space */

/* Equal columns */
.col   { flex: 1; }

/* Fixed + flexible */
.sidebar { flex: 0 0 240px; }  /* fixed 240px */
.content { flex: 1; }          /* fills rest */`,
  },
  {
    q: "What is CSS Grid and how does it work?",
    a: "CSS Grid is a two-dimensional layout system for creating complex layouts with rows and columns simultaneously. It gives precise control over placement of items anywhere in the grid, making complex layouts much simpler than older techniques.",
    code: `/* ── Grid Container ─────────────────────────────── */
.grid {
  display: grid;

  /* Define columns */
  grid-template-columns: 200px 1fr 1fr;       /* fixed + flexible */
  grid-template-columns: repeat(3, 1fr);       /* 3 equal columns */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* responsive */
  grid-template-columns: repeat(auto-fit,  minmax(200px, 1fr)); /* collapse empty */

  /* Define rows */
  grid-template-rows: auto 1fr auto;           /* header main footer */
  grid-auto-rows: minmax(100px, auto);          /* implicit rows */

  /* Gap between cells */
  gap:        16px;
  row-gap:    16px;
  column-gap: 24px;

  /* Named template areas */
  grid-template-areas:
    "header  header  header"
    "sidebar content content"
    "footer  footer  footer";
}

/* ── Assign items to areas ───────────────────────── */
.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer  { grid-area: footer; }

/* ── Item placement ──────────────────────────────── */
.item {
  /* By line number */
  grid-column: 1 / 3;        /* span from line 1 to line 3 */
  grid-column: 1 / -1;       /* span entire row */
  grid-column: span 2;       /* span 2 columns */
  grid-row:    1 / 3;        /* span 2 rows */

  /* Alignment within cell */
  justify-self: center;  /* horizontal */
  align-self:   center;  /* vertical */
}

/* ── Container alignment ─────────────────────────── */
.grid {
  justify-items:   center; /* all items horizontal */
  align-items:     center; /* all items vertical */
  justify-content: center; /* grid in container horizontal */
  align-content:   center; /* grid in container vertical */
}

/* ── Responsive grid (no media queries!) ─────────── */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}`,
  },
  {
    q: "What are CSS selectors and their specificity?",
    a: "CSS selectors target elements to apply styles. Specificity determines which rule wins when multiple rules target the same element. It is calculated as (inline, IDs, classes/attributes/pseudo-classes, elements/pseudo-elements) — higher specificity wins.",
    code: `/* ── Basic Selectors ────────────────────────────── */
*          { /* universal - all elements */ }
div        { /* element type */ }
.class     { /* class */ }
#id        { /* ID */ }
[type="text"] { /* attribute */ }

/* ── Combinators ─────────────────────────────────── */
div p       { /* descendant (any level) */ }
div > p     { /* direct child only */ }
div + p     { /* adjacent sibling (immediately after) */ }
div ~ p     { /* general sibling (any after) */ }

/* ── Pseudo-classes ──────────────────────────────── */
a:hover        { color: #f0c040; }
a:visited      { color: #888; }
input:focus    { outline: 2px solid #f0c040; }
button:active  { transform: scale(0.98); }
input:disabled { opacity: 0.4; }
input:checked  { accent-color: #f0c040; }
p:first-child  { font-weight: bold; }
p:last-child   { margin-bottom: 0; }
p:nth-child(2n)   { background: #1a1a1a; } /* even */
p:nth-child(3n+1) { color: #f0c040; }       /* every 3rd from 1st */
p:not(.excluded)  { color: #ccc; }
p:is(h1, h2, h3)  { font-weight: bold; }    /* matches any */
p:where(h1, h2)   { margin: 0; }            /* 0 specificity */
.parent:has(img)  { padding: 0; }           /* has child selector */

/* ── Pseudo-elements ─────────────────────────────── */
p::before  { content: "→ "; }
p::after   { content: " ←"; }
p::first-line   { font-size: 1.2em; }
p::first-letter { font-size: 2em; float: left; }
::selection     { background: #f0c040; color: #000; }
::placeholder   { color: #555; }

/* ── Specificity calculation ─────────────────────── */
/* (inline, id, class/attr/pseudo-class, element/pseudo-el) */
p                { }    /* (0,0,0,1) = 0001 */
.box             { }    /* (0,0,1,0) = 0010 */
#header          { }    /* (0,1,0,0) = 0100 */
style=""           /* (1,0,0,0) = 1000 (always wins except !important) */
!important         /* Overrides everything - use sparingly */

div p            { }    /* 0002 */
.nav a:hover     { }    /* 0021 */
#nav .item a     { }    /* 0111 */`,
  },
  {
    q: "What are CSS custom properties (variables)?",
    a: "CSS custom properties (variables) store reusable values defined with -- prefix. They cascade and can be scoped to any selector. JavaScript can read and modify them. Essential for theming, design tokens, and maintaining consistency.",
    code: `/* ── Define variables ───────────────────────────── */
:root {
  /* Design tokens */
  --color-primary:    #f0c040;
  --color-bg:         #0a0a0a;
  --color-bg-2:       #111111;
  --color-text:       #e8e8e8;
  --color-muted:      #666666;
  --color-danger:     #e34f26;
  --color-success:    #68a063;

  --space-xs:  4px;
  --space-sm:  8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;

  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  --font-sans: 'Syne', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-size-sm:  0.875rem;
  --font-size-md:  1rem;
  --font-size-lg:  1.25rem;
  --font-size-xl:  1.5rem;

  --shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.4);
  --transition: all 0.2s ease;
}

/* ── Use variables ───────────────────────────────── */
.button {
  background:    var(--color-primary);
  color:         var(--color-bg);
  padding:       var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  font-family:   var(--font-sans);
  transition:    var(--transition);
}

/* ── Fallback values ─────────────────────────────── */
.text { color: var(--color-text, #ffffff); } /* fallback if undefined */

/* ── Scoped variables (override in component) ────── */
.card { --color-primary: #61dafb; } /* overrides for this scope */

/* ── Dark/Light theme switching ──────────────────── */
:root[data-theme="light"] {
  --color-bg:   #ffffff;
  --color-text: #111111;
}
:root[data-theme="dark"] {
  --color-bg:   #0a0a0a;
  --color-text: #e8e8e8;
}

/* ── JavaScript interaction ──────────────────────── */
/* Read */
// const primary = getComputedStyle(document.documentElement)
//   .getPropertyValue("--color-primary").trim();

/* Write */
// document.documentElement.style
//   .setProperty("--color-primary", "#ff6b6b");`,
  },
  {
    q: "What are CSS transitions and how do they work?",
    a: "CSS transitions animate property changes between states smoothly. You define which property to animate, the duration, easing function, and optional delay. They run automatically when a specified property changes value.",
    code: `/* ── Basic transition ────────────────────────────── */
.button {
  background: #f0c040;
  color:      #000;
  transform:  scale(1);
  box-shadow: none;

  /* Define transition BEFORE the state change */
  transition: background 0.3s ease,
              transform  0.2s ease,
              box-shadow 0.3s ease;
}

.button:hover {
  background: #d4a800;
  transform:  scale(1.05);
  box-shadow: 0 8px 24px rgba(240,192,64,0.3);
}

/* ── Transition properties ───────────────────────── */
.element {
  transition-property:        background, transform, opacity;
  transition-duration:        0.3s, 0.2s, 0.4s; /* per property */
  transition-timing-function: ease, ease-out, ease-in-out;
  transition-delay:           0s, 0.1s, 0s;

  /* Shorthand */
  transition: all 0.3s ease;      /* all properties */
  transition: none;                /* disable */

  /* Individual */
  transition: background 0.3s ease 0.1s; /* property duration easing delay */
}

/* ── Timing functions ────────────────────────────── */
.ease          { transition-timing-function: ease; }           /* default */
.ease-in       { transition-timing-function: ease-in; }        /* slow start */
.ease-out      { transition-timing-function: ease-out; }       /* slow end */
.ease-in-out   { transition-timing-function: ease-in-out; }    /* slow both */
.linear        { transition-timing-function: linear; }         /* constant speed */
.custom        { transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
.steps         { transition-timing-function: steps(4, end); }  /* stepped */

/* ── What CAN be transitioned ────────────────────── */
/* ✅ color, background-color, border-color */
/* ✅ opacity, visibility */
/* ✅ transform (translate, scale, rotate) - GPU accelerated */
/* ✅ width, height, padding, margin, border-width */
/* ✅ top, left, right, bottom */
/* ✅ box-shadow, text-shadow */
/* ✅ font-size, letter-spacing */
/* ❌ display (use opacity/visibility instead) */
/* ❌ background-image */

/* ── Accessible transitions ──────────────────────── */
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.01ms !important; }
}`,
  },
  {
    q: "What are CSS animations and @keyframes?",
    a: "CSS animations create multi-step animations using @keyframes. Unlike transitions (two states), animations can have unlimited steps, play automatically, repeat, and reverse. They work independently of user interaction.",
    code: `/* ── Define keyframes ───────────────────────────── */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1);    opacity: 1; }
  50%       { transform: scale(1.05); opacity: 0.8; }
}

@keyframes slideIn {
  0%   { transform: translateX(-100%); opacity: 0; }
  60%  { transform: translateX(10px);  opacity: 1; }
  100% { transform: translateX(0); }
}

@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

/* ── Apply animation ─────────────────────────────── */
.card {
  animation-name:            fadeIn;
  animation-duration:        0.4s;
  animation-timing-function: ease-out;
  animation-delay:           0.1s;
  animation-iteration-count: 1;       /* or infinite, 3 */
  animation-direction:       normal;  /* normal, reverse, alternate, alternate-reverse */
  animation-fill-mode:       forwards;/* none, forwards, backwards, both */
  animation-play-state:      running; /* running, paused */

  /* Shorthand */
  animation: fadeIn 0.4s ease-out 0.1s 1 normal forwards;
  animation: spin 1s linear infinite; /* spinner */
}

/* ── Multiple animations ─────────────────────────── */
.hero {
  animation:
    fadeIn   0.6s ease-out,
    slideIn  0.6s ease-out,
    pulse    2s   ease-in-out 0.6s infinite;
}

/* ── Staggered animations ────────────────────────── */
.list-item:nth-child(1) { animation-delay: 0.1s; }
.list-item:nth-child(2) { animation-delay: 0.2s; }
.list-item:nth-child(3) { animation-delay: 0.3s; }

/* ── Skeleton loading ────────────────────────────── */
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

/* ── Reduced motion ──────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .card { animation: none; }
}`,
  },
  {
    q: "What is the CSS position property?",
    a: "The position property controls how an element is positioned in the document. static is the default. relative offsets from its normal position. absolute is removed from flow and positioned relative to nearest positioned ancestor. fixed is relative to viewport. sticky switches between relative and fixed.",
    code: `/* static - default, normal document flow */
.static { position: static; } /* top/right/bottom/left have no effect */

/* relative - offset from normal position, stays in flow */
.relative {
  position: relative;
  top:  20px;   /* move down 20px from normal position */
  left: 10px;   /* move right 10px */
  /* Element still occupies original space */
  z-index: 1;   /* z-index works on positioned elements */
}

/* absolute - removed from flow, positioned relative to nearest
   positioned ancestor (relative/absolute/fixed/sticky) */
.parent   { position: relative; } /* create positioning context */
.absolute {
  position: absolute;
  top:   0;
  right: 0;       /* top-right corner of parent */
  /* Falls back to <html> if no positioned ancestor */
}

/* Common absolute patterns */
.badge {
  position: absolute;
  top:    -8px;
  right:  -8px;
}
.overlay {
  position: absolute;
  inset: 0; /* top: 0; right: 0; bottom: 0; left: 0; */
}

/* fixed - relative to viewport, stays on scroll */
.navbar {
  position: fixed;
  top:   0;
  left:  0;
  right: 0;
  z-index: 100;
}

/* sticky - switches between relative and fixed */
.sticky-header {
  position: sticky;
  top: 0;        /* sticks when it reaches 0px from top */
  z-index: 10;
}

/* Table of contents sidebar */
.toc {
  position: sticky;
  top: 80px;     /* 80px below top (below fixed navbar) */
  align-self: flex-start; /* important in flex container */
  max-height: calc(100vh - 80px);
  overflow-y: auto;
}`,
  },
  {
    q: "What are CSS pseudo-elements (::before and ::after)?",
    a: "Pseudo-elements create virtual sub-elements that don't exist in HTML. ::before inserts content before element content, ::after inserts after. Both require content property (even if empty). Used for decorative elements, icons, and overlays without extra HTML.",
    code: `/* Basic pseudo-element */
.quote::before {
  content: '"';
  font-size: 3em;
  color: #f0c040;
  line-height: 0;
  vertical-align: -0.4em;
}
.quote::after {
  content: '"';
}

/* Decorative line with ::after */
h2::after {
  content:     "";        /* required, even if empty */
  display:     block;
  width:       60px;
  height:      3px;
  background:  #f0c040;
  margin-top:  8px;
}

/* Required field asterisk */
label.required::after {
  content: " *";
  color: #e34f26;
}

/* Counter with CSS */
ol { counter-reset: steps; }
li {
  counter-increment: steps;
}
li::before {
  content: counter(steps) ". ";
  font-weight: bold;
  color: #f0c040;
}

/* Tooltip using pseudo-element */
[data-tooltip] {
  position: relative;
}
[data-tooltip]::after {
  content:    attr(data-tooltip); /* read attribute value! */
  position:   absolute;
  bottom:     calc(100% + 8px);
  left:       50%;
  transform:  translateX(-50%);
  background: #333;
  color:      #fff;
  padding:    4px 8px;
  border-radius: 4px;
  white-space: nowrap;
  opacity:    0;
  pointer-events: none;
  transition: opacity 0.2s;
}
[data-tooltip]:hover::after { opacity: 1; }

/* Clearfix (old technique) */
.clearfix::after {
  content:  "";
  display:  block;
  clear:    both;
}

/* Overlay on image */
.card { position: relative; overflow: hidden; }
.card::before {
  content:    "";
  position:   absolute;
  inset:      0;
  background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.7));
}`,
  },
  {
    q: "What are media queries and how do you implement responsive design?",
    a: "Media queries apply different styles based on device characteristics like viewport width, height, orientation, and color scheme. Mobile-first means writing base styles for small screens and progressively enhancing for larger screens.",
    code: `/* ── Mobile-first approach (recommended) ────────── */
/* Base styles for mobile */
.container {
  padding: 16px;
  font-size: 14px;
}
.grid { grid-template-columns: 1fr; }

/* Tablet: 768px and up */
@media (min-width: 768px) {
  .container { padding: 24px; font-size: 16px; }
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop: 1024px and up */
@media (min-width: 1024px) {
  .container { max-width: 1200px; margin: 0 auto; }
  .grid { grid-template-columns: repeat(3, 1fr); }
}

/* Large: 1280px and up */
@media (min-width: 1280px) {
  .grid { grid-template-columns: repeat(4, 1fr); }
}

/* ── Desktop-first approach ──────────────────────── */
.sidebar { width: 280px; }
@media (max-width: 768px) {
  .sidebar { width: 100%; }
}

/* ── Other media features ────────────────────────── */
/* Height based */
@media (max-height: 500px) { nav { display: none; } }

/* Orientation */
@media (orientation: landscape) { .hero { height: 60vh; } }
@media (orientation: portrait)  { .hero { height: 80vh; } }

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root { --bg: #0a0a0a; --text: #e8e8e8; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}

/* High DPI displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .logo { background-image: url("logo@2x.png"); }
}

/* Print */
@media print {
  nav, footer, .ads { display: none; }
  body { color: black; background: white; }
  a::after { content: " (" attr(href) ")"; }
}

/* Feature query (not really media query but similar) */
@supports (display: grid) {
  .layout { display: grid; }
}
@supports not (display: grid) {
  .layout { display: flex; }
}`,
  },

  // ─── INTERMEDIATE ─────────────────────────────────────────
  {
    q: "What are CSS Grid advanced features: auto-placement, dense packing, and subgrid?",
    a: "CSS Grid's auto-placement algorithm automatically places items in the grid. Dense packing fills holes. Named lines enable semantic placement. Subgrid allows nested grids to align with the parent grid's tracks.",
    code: `/* ── Auto-placement ──────────────────────────────── */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 100px;      /* implicit row height */
  grid-auto-flow: row;        /* default: fill row by row */
  grid-auto-flow: column;     /* fill column by column */
  grid-auto-flow: row dense;  /* fill holes with smaller items */
}

/* ── Dense packing example ───────────────────────── */
.masonry-ish {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: dense; /* fills gaps caused by large items */
}
.large  { grid-column: span 2; grid-row: span 2; }
.medium { grid-column: span 2; }
.small  { /* auto-placed, fills gaps */ }

/* ── Named grid lines ────────────────────────────── */
.grid {
  grid-template-columns:
    [sidebar-start] 240px
    [sidebar-end content-start] 1fr
    [content-end];

  grid-template-rows:
    [header-start] 60px
    [header-end main-start] 1fr
    [main-end footer-start] 60px
    [footer-end];
}
.header  { grid-column: sidebar-start / content-end; grid-row: header-start / header-end; }
.sidebar { grid-column: sidebar-start / sidebar-end; grid-row: main-start / main-end; }

/* ── Subgrid ─────────────────────────────────────── */
/* Parent grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto; /* image content footer */
}

/* Child inherits parent's tracks */
.card {
  display:              grid;
  grid-row:             span 3;         /* span 3 rows of parent */
  grid-template-rows:   subgrid;        /* use PARENT'S row tracks */
}
/* Now all cards align their image/content/footer ✅ */
.card-image   { /* row 1 - same height across all cards */ }
.card-content { /* row 2 - same height */ }
.card-footer  { /* row 3 - always at bottom */ }

/* ── minmax() and clamp() ────────────────────────── */
.grid {
  grid-template-columns: minmax(200px, 1fr) minmax(100px, 300px);
  /* Column 1: at least 200px, grows to fill */
  /* Column 2: at least 100px, max 300px */
}`,
  },
  {
    q: "What is the CSS cascade, inheritance, and specificity in detail?",
    a: "The cascade determines which CSS rule applies when multiple rules target the same element. It considers origin (user agent, user, author), importance (!important), specificity, and source order. Inheritance passes some properties to children automatically.",
    code: `/* ── Cascade order (highest wins) ───────────────── */
/* 1. !important user agent styles (rare) */
/* 2. !important author styles */
/* 3. !important user styles */
/* 4. Author styles (your CSS) ← most common */
/* 5. User styles (browser extensions) */
/* 6. User agent styles (browser defaults) */

/* ── Specificity calculation ─────────────────────── */
/* (inline, ID, class/attr/pseudo-class, element/pseudo-el) */

* {}                   /* 0,0,0,0 = 0    (universal) */
div {}                 /* 0,0,0,1 = 1    (element) */
:root {}               /* 0,0,1,0 = 10   (pseudo-class) */
::before {}            /* 0,0,0,1 = 1    (pseudo-element) */
.class {}              /* 0,0,1,0 = 10   (class) */
[type="text"] {}       /* 0,0,1,0 = 10   (attribute) */
div.class {}           /* 0,0,1,1 = 11   */
#id {}                 /* 0,1,0,0 = 100  (ID) */
#id .class div {}      /* 0,1,1,1 = 111  */
style="..."            /* 1,0,0,0 = 1000 (inline) */
!important             /* Beats everything (except !important) */

/* ── :is() and :where() ─────────────────────────── */
/* :is() takes specificity of most specific argument */
:is(h1, h2, h3) { margin: 0; }     /* specificity of h1 = 0,0,0,1 */
:is(#id, .class) { color: red; }   /* specificity of #id = 0,1,0,0 */

/* :where() always has 0 specificity */
:where(h1, h2, h3) { margin: 0; }  /* 0,0,0,0 - easily overridden ✅ */

/* ── Inheritance ─────────────────────────────────── */
/* Inherited properties (pass to children): */
/* color, font-*, line-height, letter-spacing */
/* text-align, text-transform, text-indent */
/* visibility, cursor, pointer-events */
/* list-style-*, word-spacing */

/* NOT inherited: */
/* margin, padding, border, width, height */
/* background, display, position, float */
/* box-shadow, transform, animation */

/* Force inheritance */
.child { color: inherit; }         /* inherit from parent */
.child { color: initial; }         /* reset to browser default */
.child { color: unset; }           /* inherit if inheritable, else initial */
.child { color: revert; }          /* browser stylesheet default */

/* ── CSS Layers (@layer) ─────────────────────────── */
@layer base, components, utilities; /* declare order */

@layer base {
  h1 { font-size: 2rem; }          /* lowest priority */
}
@layer components {
  .card h1 { font-size: 1.5rem; }  /* medium priority */
}
@layer utilities {
  .text-xl { font-size: 1.25rem; } /* highest priority ← wins */
}`,
  },
  {
    q: "What are CSS transforms and how do they work?",
    a: "CSS transforms move, rotate, scale, or skew elements in 2D or 3D space without affecting document flow. They are GPU-accelerated, making them ideal for smooth animations. The transform-origin controls the point around which transforms are applied.",
    code: `/* ── 2D Transforms ───────────────────────────────── */
.box {
  /* Translate - move element */
  transform: translate(100px, 50px);   /* x, y */
  transform: translateX(100px);
  transform: translateY(50px);
  transform: translate(50%, -50%);     /* % of own size */

  /* Scale - resize */
  transform: scale(1.5);               /* uniform */
  transform: scale(1.5, 0.8);          /* x, y */
  transform: scaleX(2);
  transform: scaleY(0.5);

  /* Rotate */
  transform: rotate(45deg);
  transform: rotate(-90deg);

  /* Skew */
  transform: skew(10deg, 5deg);        /* x-axis, y-axis */
  transform: skewX(10deg);

  /* Multiple transforms (applied right to left) */
  transform: translateX(100px) rotate(45deg) scale(1.2);

  /* Transform origin */
  transform-origin: center;            /* default */
  transform-origin: top left;
  transform-origin: 50% 50%;
  transform-origin: 0 0;
}

/* ── 3D Transforms ───────────────────────────────── */
.scene {
  perspective: 800px;              /* depth of 3D scene */
  perspective-origin: 50% 50%;
}
.card-3d {
  transform: rotateY(45deg);       /* rotate around Y axis */
  transform: rotateX(30deg);       /* rotate around X axis */
  transform: rotateZ(15deg);       /* same as 2D rotate */
  transform: rotate3d(1, 1, 0, 45deg); /* custom axis */
  transform: translateZ(100px);    /* move toward viewer */
  transform: scale3d(1.2, 1.2, 1);
  transform-style: preserve-3d;   /* children in 3D space */
  backface-visibility: hidden;     /* hide back of flipped element */
}

/* ── Card flip effect ────────────────────────────── */
.card-container {
  perspective: 1000px;
  width: 200px; height: 300px;
}
.card {
  position: relative;
  width: 100%; height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}
.card:hover { transform: rotateY(180deg); }
.card-front, .card-back {
  position: absolute; inset: 0;
  backface-visibility: hidden;
}
.card-back { transform: rotateY(180deg); }`,
  },
  {
    q: "What are CSS logical properties?",
    a: "CSS logical properties use logical (start/end) rather than physical (left/right) directions. They automatically adapt to writing mode (RTL/LTR) and text orientation. margin-inline-start is left in LTR and right in RTL.",
    code: `/* ── Physical vs Logical ─────────────────────────── */

/* Physical (breaks RTL layouts) */
.physical {
  margin-left:   16px;
  margin-right:  16px;
  margin-top:    8px;
  margin-bottom: 8px;
  padding-left:  20px;
  border-left:   2px solid #f0c040;
  left: 0;
  width:  200px;
  height: 100px;
  text-align: left;
}

/* Logical (adapts to writing direction ✅) */
.logical {
  margin-inline-start:  16px;   /* left in LTR, right in RTL */
  margin-inline-end:    16px;   /* right in LTR, left in RTL */
  margin-block-start:   8px;    /* top (usually) */
  margin-block-end:     8px;    /* bottom (usually) */
  padding-inline-start: 20px;
  border-inline-start:  2px solid #f0c040;
  inset-inline-start:   0;
  inline-size:  200px;   /* width */
  block-size:   100px;   /* height */
  text-align:   start;   /* left in LTR, right in RTL */
}

/* ── Shorthand logical properties ────────────────── */
.box {
  /* inline = horizontal axis */
  margin-inline:  16px;       /* margin-inline-start + end */
  padding-inline: 20px 24px;  /* start, end */
  border-inline:  1px solid;  /* both inline borders */

  /* block = vertical axis */
  margin-block:   8px;        /* margin-block-start + end */
  padding-block:  12px;
  border-block:   1px solid;

  /* inset = all four positions */
  inset:        0;            /* top/right/bottom/left */
  inset-inline: 16px;         /* left and right */
  inset-block:  0;            /* top and bottom */
}

/* ── Writing modes ───────────────────────────────── */
:lang(ar) { direction: rtl; }   /* Arabic (right-to-left) */
:lang(zh) { writing-mode: vertical-rl; } /* Chinese vertical */

.vertical-text {
  writing-mode: vertical-lr;   /* top-to-bottom, left-to-right column */
  writing-mode: vertical-rl;   /* top-to-bottom, right-to-left column */
}`,
  },
  {
    q: "What are CSS filters and backdrop-filter?",
    a: "CSS filters apply graphical effects to elements (blur, brightness, contrast, grayscale, etc.). backdrop-filter applies the same effects to the area behind an element, enabling frosted glass and other modern UI effects.",
    code: `/* ── filter ──────────────────────────────────────── */
.image {
  filter: blur(4px);
  filter: brightness(1.5);      /* 0=black, 1=normal, 2=bright */
  filter: contrast(1.2);        /* 0=gray, 1=normal */
  filter: grayscale(100%);      /* 0=color, 100%=grayscale */
  filter: invert(100%);         /* invert colors */
  filter: opacity(0.5);         /* same as opacity property */
  filter: saturate(2);          /* 0=grayscale, 1=normal, 3=supersaturated */
  filter: sepia(80%);           /* vintage effect */
  filter: hue-rotate(90deg);    /* shift hue */
  filter: drop-shadow(4px 4px 8px rgba(0,0,0,0.5)); /* unlike box-shadow, follows shape */

  /* Multiple filters */
  filter: brightness(1.1) contrast(1.1) saturate(1.2);
}

/* Image hover effects */
.card img {
  filter:     grayscale(100%);
  transition: filter 0.3s ease;
}
.card:hover img {
  filter:     grayscale(0%);    /* reveal color on hover */
}

/* ── backdrop-filter ─────────────────────────────── */
/* Applies effect to what's BEHIND the element */
.frosted-glass {
  background:     rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border:         1px solid rgba(255,255,255,0.2);
  border-radius:  12px;
  /* Creates glassmorphism effect ✅ */
}

.dark-glass {
  background:      rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px) brightness(0.8);
}

/* Navbar glassmorphism */
.navbar-glass {
  position:        fixed;
  top: 0; left: 0; right: 0;
  background:      rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(20px) saturate(1.5);
  border-bottom:   1px solid rgba(255,255,255,0.1);
}

/* ── SVG filters (advanced) ──────────────────────── */
/* Gooey effect */
.goo-container { filter: url(#gooey); }
/* Define SVG filter in HTML:
<svg><defs><filter id="gooey">
  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"/>
</filter></defs></svg> */`,
  },
  {
    q: "What are CSS Grid and Flexbox combined patterns?",
    a: "CSS Grid and Flexbox are complementary — Grid excels at two-dimensional layout (rows AND columns), Flexbox at one-dimensional (row OR column). The best UIs use Grid for page structure and Flexbox for component-level alignment.",
    code: `/* ── Grid for page layout ────────────────────────── */
.app {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 260px 1fr;
  grid-template-rows: 60px 1fr 60px;
  min-height: 100vh;
}
.app-header  { grid-area: header; }
.app-sidebar { grid-area: sidebar; }
.app-main    { grid-area: main; }
.app-footer  { grid-area: footer; }

/* ── Flexbox inside each section ─────────────────── */
.app-header {
  display:         flex;
  align-items:     center;
  justify-content: space-between;
  padding:         0 24px;
  gap:             16px;
}

.app-sidebar {
  display:        flex;
  flex-direction: column;
  gap:            4px;
  padding:        16px 12px;
  overflow-y:     auto;
}

/* ── Card grid (Grid) with card internals (Flex) ─── */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.card {
  display:        flex;
  flex-direction: column;       /* stack vertically */
}
.card-image    { /* fixed */ }
.card-content  { flex: 1; }    /* grow to fill */
.card-actions  {
  display:         flex;
  justify-content: space-between;
  align-items:     center;
  margin-top:      auto;        /* push to bottom */
}

/* ── Navigation (Flexbox) ────────────────────────── */
.nav {
  display:         flex;
  align-items:     center;
  gap:             8px;
}
.nav-logo  { margin-right: auto; }    /* push rest to right */

/* ── Dashboard layout ────────────────────────────── */
.dashboard {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
}
.stat-card  { grid-column: span 3; }  /* 4 per row */
.main-chart { grid-column: span 8; }
.side-panel { grid-column: span 4; }
.data-table { grid-column: span 12; } /* full width */`,
  },
  {
    q: "What is CSS containment and the contain property?",
    a: "CSS containment limits the scope of browser calculations for layout, paint, and style. It signals to the browser that an element's subtree is independent, enabling performance optimizations. The content-visibility property can skip rendering off-screen content entirely.",
    code: `/* ── contain property ───────────────────────────── */
.widget {
  contain: none;     /* default - no containment */
  contain: strict;   /* size + layout + style + paint */
  contain: content;  /* layout + style + paint (no size) */
  contain: size;     /* element size doesn't depend on children */
  contain: layout;   /* internal layout is isolated from outside */
  contain: style;    /* counters/quotes don't escape element */
  contain: paint;    /* element clips its children visually */

  /* Combine types */
  contain: layout paint;
}

/* ── When to use each ────────────────────────────── */
/* contain: strict - fixed-size widgets (ads, iframes) */
.ad-unit {
  contain: strict;
  width: 300px;
  height: 250px;
}

/* contain: content - cards, articles, repeated components */
.card {
  contain: content;
  /* Layout of this card won't affect other cards */
}

/* ── content-visibility ──────────────────────────── */
/* Skip rendering off-screen elements */
.article-section {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px; /* estimated size while off-screen */
  /* Browser skips paint/layout for off-screen sections */
  /* Dramatically improves initial render of long pages */
}

/* content-visibility values */
.el-visible  { content-visibility: visible; }  /* always render (default) */
.el-hidden   { content-visibility: hidden; }   /* never render (like display:none but keeps state) */
.el-auto     { content-visibility: auto; }     /* skip when off-screen */

/* ── container queries ───────────────────────────── */
/* Apply styles based on CONTAINER size, not viewport */
.card-wrapper {
  container-type: inline-size; /* enable container queries */
  container-name: card;        /* optional name */
}

/* Apply styles when card-wrapper is >= 400px wide */
@container card (min-width: 400px) {
  .card { flex-direction: row; }
  .card-image { width: 200px; }
}

@container (min-width: 600px) {
  .card-title { font-size: 1.5rem; }
}`,
  },
  {
    q: "What is the CSS :has() selector and why is it a game changer?",
    a: ":has() is the 'parent selector' CSS developers have wanted for years. It selects an element based on its descendants or siblings. It enables patterns previously impossible without JavaScript — like styling a parent based on its children.",
    code: `/* ── Basic :has() ───────────────────────────────── */
/* Select article that HAS an image */
article:has(img) {
  display: grid;
  grid-template-columns: 200px 1fr;
}

/* Select form that HAS an invalid input */
form:has(input:invalid) .submit-btn {
  opacity: 0.5;
  pointer-events: none;
}

/* Select label that HAS a checked checkbox */
label:has(input:checked) {
  color:       #f0c040;
  font-weight: bold;
}

/* Select div that HAS a focused input */
.form-group:has(input:focus) {
  border-color: #f0c040;
  box-shadow: 0 0 0 3px rgba(240,192,64,0.2);
}

/* ── Styling based on child count ────────────────── */
/* 1 item - full width */
ul:has(li:only-child) li { width: 100%; }

/* 2 items - 50% each */
ul:has(li:nth-child(2)):not(:has(li:nth-child(3))) li { width: 50%; }

/* 3 or more - 33% each */
ul:has(li:nth-child(3)) li { width: 33.33%; }

/* ── Navigation patterns ─────────────────────────── */
/* Style nav differently if it has a logo */
nav:has(.logo) { justify-content: space-between; }
nav:not(:has(.logo)) { justify-content: flex-end; }

/* ── Card variants ───────────────────────────────── */
/* Card with video - remove padding */
.card:has(video) { padding: 0; overflow: hidden; }

/* Card with long content */
.card:has(p:nth-child(3)) { background: var(--color-bg-3); }

/* ── Form validation ─────────────────────────────── */
.input-wrapper:has(input:valid:not(:placeholder-shown)) {
  border-color: #68a063;
}
.input-wrapper:has(input:invalid:not(:placeholder-shown)) {
  border-color: #e34f26;
}

/* ── Quantity queries ────────────────────────────── */
/* Style differently based on number of siblings */
li:has(~ li:nth-child(4)) { font-size: 0.9rem; } /* if 4+ siblings */`,
  },
  {
    q: "What are CSS scroll-driven animations?",
    a: "Scroll-driven animations link animation progress to scroll position. Using animation-timeline with scroll() or view(), animations play as the user scrolls — no JavaScript required. This enables scroll progress indicators, parallax, and reveal animations.",
    code: `/* ── Scroll Progress Bar ────────────────────────── */
@keyframes grow-width {
  from { width: 0%; }
  to   { width: 100%; }
}

.scroll-progress {
  position: fixed;
  top: 0; left: 0;
  height: 4px;
  background: #f0c040;
  transform-origin: left;

  animation: grow-width linear;
  animation-timeline: scroll(root block); /* tied to page scroll */
}

/* ── Reveal on scroll ────────────────────────────── */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

.reveal {
  animation: fade-up 0.6s ease-out both;
  animation-timeline:  view();          /* fires as element enters viewport */
  animation-range:     entry 0% entry 50%; /* start=enters, end=50% in view */
}

/* ── Parallax effect ─────────────────────────────── */
.hero-bg {
  animation: parallax linear;
  animation-timeline: scroll(root);
}
@keyframes parallax {
  from { transform: translateY(0); }
  to   { transform: translateY(-30%); } /* moves slower than scroll */
}

/* ── Named timelines ─────────────────────────────── */
.scroll-container {
  overflow-y: scroll;
  scroll-timeline-name:  --my-scroller;
  scroll-timeline-axis:  block;
}
.animated-child {
  animation-timeline: --my-scroller; /* attach to named timeline */
}

/* ── view-timeline ───────────────────────────────── */
.card {
  view-timeline-name: --card-reveal;
  view-timeline-axis: block;
}
.card-content {
  animation: fade-up 0.5s ease;
  animation-timeline: --card-reveal;
  animation-range: entry 20% cover 50%;
}

/* animation-range values:
  entry    - element entering scroll port
  exit     - element leaving scroll port
  cover    - element covering scroll port
  contain  - element contained in scroll port */`,
  },
  {
    q: "What is the CSS clamp() function and fluid typography?",
    a: "clamp(min, preferred, max) sets a value that scales between a minimum and maximum. Combined with viewport units (vw), it enables truly fluid typography and spacing that scales smoothly without media query breakpoints.",
    code: `/* ── clamp() syntax ──────────────────────────────── */
/* clamp(minimum, preferred, maximum) */

/* Font size: min 14px, preferred 2.5vw, max 22px */
.text { font-size: clamp(14px, 2.5vw, 22px); }

/* Container width */
.container { width: clamp(320px, 90%, 1200px); }

/* ── Fluid typography scale ──────────────────────── */
:root {
  /* Scale smoothly from 320px to 1440px viewport */
  --text-xs:  clamp(0.75rem,  0.7rem  + 0.25vw, 0.875rem);
  --text-sm:  clamp(0.875rem, 0.8rem  + 0.375vw, 1rem);
  --text-md:  clamp(1rem,     0.9rem  + 0.5vw,   1.125rem);
  --text-lg:  clamp(1.125rem, 1rem    + 0.625vw, 1.375rem);
  --text-xl:  clamp(1.25rem,  1.1rem  + 0.75vw,  1.5rem);
  --text-2xl: clamp(1.5rem,   1.3rem  + 1vw,     2rem);
  --text-3xl: clamp(1.875rem, 1.5rem  + 1.875vw, 3rem);
  --text-4xl: clamp(2.25rem,  1.75rem + 2.5vw,   4rem);
}

h1 { font-size: var(--text-4xl); }
h2 { font-size: var(--text-3xl); }
p  { font-size: var(--text-md); }

/* ── Fluid spacing ───────────────────────────────── */
:root {
  --space-sm:  clamp(8px,  2vw,  16px);
  --space-md:  clamp(16px, 4vw,  32px);
  --space-lg:  clamp(24px, 6vw,  48px);
  --space-xl:  clamp(48px, 10vw, 96px);
}

section { padding: var(--space-xl) var(--space-md); }

/* ── min() and max() ─────────────────────────────── */
.img { width: min(100%, 800px); }   /* no wider than 800px or 100% */
.btn { padding: max(8px, 1.5vw); }  /* at least 8px, grows with viewport */

/* ── Fluid grid columns ──────────────────────────── */
.grid {
  grid-template-columns: repeat(
    auto-fill,
    minmax(clamp(200px, 30%, 300px), 1fr)
  );
}`,
  },
  {
    q: "What are CSS custom properties advanced patterns (dynamic theming)?",
    a: "Advanced CSS custom properties enable component-level theming, computed values, runtime animation, and design tokens. Variables can be composed, inherited, and manipulated via JavaScript for fully dynamic theming systems.",
    code: `/* ── Design token system ────────────────────────── */
:root {
  /* Primitive tokens */
  --yellow-400: #f0c040;
  --yellow-600: #d4a800;
  --blue-400:   #61dafb;
  --gray-900:   #0a0a0a;
  --gray-100:   #e8e8e8;

  /* Semantic tokens (reference primitives) */
  --color-accent:     var(--yellow-400);
  --color-accent-dim: var(--yellow-600);
  --color-text:       var(--gray-100);
  --color-bg:         var(--gray-900);

  /* Component tokens (reference semantic) */
  --btn-bg:        var(--color-accent);
  --btn-color:     var(--color-bg);
  --btn-bg-hover:  var(--color-accent-dim);
}

/* ── Component theming ───────────────────────────── */
.button {
  --btn-size:    var(--size-md, 1rem);
  --btn-radius:  var(--radius-md, 8px);
  background:    var(--btn-bg);
  color:         var(--btn-color);
  font-size:     var(--btn-size);
  border-radius: var(--btn-radius);
  padding:       calc(var(--btn-size) * 0.5) calc(var(--btn-size) * 1);
}

/* Variant via local override */
.button--danger  { --btn-bg: #e34f26; --btn-color: #fff; }
.button--ghost   { --btn-bg: transparent; --btn-color: var(--color-accent); }
.button--large   { --btn-size: 1.25rem; }

/* ── Dynamic animation with variables ────────────── */
@keyframes slide {
  to { transform: translateX(var(--slide-distance, 100px)); }
}
.slide-right { --slide-distance:  200px; animation: slide 0.3s forwards; }
.slide-left  { --slide-distance: -200px; animation: slide 0.3s forwards; }

/* ── CSS variable animation (Houdini) ────────────── */
@property --hue {
  syntax: "<number>";
  inherits: false;
  initial-value: 0;
}
.rainbow {
  background: hsl(var(--hue), 80%, 60%);
  transition: --hue 0.5s;
}
.rainbow:hover { --hue: 180; }

/* ── Responsive with variables ───────────────────── */
:root {
  --columns: 1;
  --gap: 16px;
}
@media (min-width: 768px)  { :root { --columns: 2; --gap: 20px; } }
@media (min-width: 1024px) { :root { --columns: 3; --gap: 24px; } }

.grid {
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: var(--gap);
}`,
  },
  {
    q: "What is CSS Houdini and the Paint API?",
    a: "CSS Houdini exposes browser rendering engine internals, letting developers extend CSS. The Paint API (CSS Custom Paint) lets you create custom backgrounds and borders using a canvas-like API. @property enables animatable custom properties.",
    code: `/* ── @property - typed custom properties ─────────── */
@property --progress {
  syntax:        "<percentage>";
  inherits:      false;
  initial-value: 0%;
}

@property --angle {
  syntax:        "<angle>";
  inherits:      false;
  initial-value: 0deg;
}

/* Now these can be transitioned/animated! */
.progress-ring {
  --progress: 0%;
  transition: --progress 1s ease;
}
.progress-ring.loaded { --progress: 75%; }

/* Conic gradient progress */
.progress {
  background: conic-gradient(#f0c040 var(--progress), #222 0);
  border-radius: 50%;
  transition: --progress 0.5s ease;
}

/* Spinning gradient */
@keyframes spin-gradient {
  to { --angle: 360deg; }
}
.spinning {
  background: conic-gradient(
    from var(--angle),
    #f0c040, #61dafb, #e34f26, #f0c040
  );
  animation: spin-gradient 2s linear infinite;
}

/* ── CSS Paint Worklet ───────────────────────────── */
/* Register worklet */
if ("paintWorklet" in CSS) {
  CSS.paintWorklet.addModule("paint-worklet.js");
}

/* paint-worklet.js */
/*
registerPaint("checkerboard", class {
  static get inputProperties() {
    return ["--checker-size", "--checker-color"];
  }

  paint(ctx, geometry, properties) {
    const size  = parseInt(properties.get("--checker-size") || 20);
    const color = properties.get("--checker-color").toString() || "#f0c040";
    const cols  = Math.ceil(geometry.width  / size);
    const rows  = Math.ceil(geometry.height / size);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if ((r + c) % 2 === 0) {
          ctx.fillStyle = color;
          ctx.fillRect(c * size, r * size, size, size);
        }
      }
    }
  }
});
*/

/* Use in CSS */
.checkerboard {
  background:       paint(checkerboard);
  --checker-size:   30px;
  --checker-color:  #f0c040;
}`,
  },

  // ─── INTERMEDIATE-ADVANCED ─────────────────────────────────
  {
    q: "What are CSS blend modes?",
    a: "CSS blend modes control how an element blends with what's behind it. mix-blend-mode applies to the element's entire content. background-blend-mode applies to background layers of a single element. They enable photo editing-like effects natively in CSS.",
    code: `/* ── mix-blend-mode ──────────────────────────────── */
/* How element blends with elements BELOW it */
.blend {
  mix-blend-mode: normal;       /* default */
  mix-blend-mode: multiply;     /* darker - like two transparencies */
  mix-blend-mode: screen;       /* lighter - like projected images */
  mix-blend-mode: overlay;      /* multiply dark + screen light */
  mix-blend-mode: darken;       /* keeps darker of two colors */
  mix-blend-mode: lighten;      /* keeps lighter of two colors */
  mix-blend-mode: color-dodge;  /* brightens base by reflecting blend */
  mix-blend-mode: color-burn;   /* darkens base */
  mix-blend-mode: hard-light;   /* strong overlay */
  mix-blend-mode: soft-light;   /* subtle shading */
  mix-blend-mode: difference;   /* inverts based on difference */
  mix-blend-mode: exclusion;    /* similar to difference, lower contrast */
  mix-blend-mode: hue;          /* hue of blend, saturation+luminance of base */
  mix-blend-mode: saturation;
  mix-blend-mode: color;
  mix-blend-mode: luminosity;
}

/* ── Knockout text effect ────────────────────────── */
.knockout-container {
  background: url("photo.jpg") center/cover;
}
.knockout-text {
  background: #fff;
  mix-blend-mode: multiply;    /* black text = transparent, white = solid */
  font-size: 8rem;
  font-weight: 900;
  color: #000;
}

/* ── Color overlay on image ──────────────────────── */
.image-wrapper { position: relative; }
.image-overlay {
  position: absolute; inset: 0;
  background: #f0c040;
  mix-blend-mode: multiply;
  opacity: 0.6;
}

/* ── background-blend-mode ───────────────────────── */
/* How background layers of SAME element blend */
.multi-bg {
  background:
    url("texture.png"),
    linear-gradient(135deg, #f0c040, #e34f26);
  background-blend-mode: multiply;
}

.duotone {
  background:
    linear-gradient(rgba(0,0,128,0.8), rgba(0,0,128,0.8)),
    url("photo.jpg") center/cover;
  background-blend-mode: luminosity;
}`,
  },
  {
    q: "What are advanced CSS Grid patterns: masonry, holy grail, and mosaic?",
    a: "CSS Grid enables complex layout patterns. The Holy Grail layout has a header, three-column middle, and footer. Masonry creates a Pinterest-like layout. Mosaic creates asymmetric image galleries. These replace float-based and table-based layouts.",
    code: `/* ── Holy Grail Layout ───────────────────────────── */
.holy-grail {
  display: grid;
  grid-template:
    "header  header  header" 60px
    "sidebar content ads   " 1fr
    "footer  footer  footer" 60px
    / 200px 1fr 160px;
  min-height: 100vh;
  gap: 0;
}
.hg-header  { grid-area: header; }
.hg-sidebar { grid-area: sidebar; }
.hg-content { grid-area: content; }
.hg-ads     { grid-area: ads; }
.hg-footer  { grid-area: footer; }

/* Responsive holy grail */
@media (max-width: 768px) {
  .holy-grail {
    grid-template:
      "header"  60px
      "content" 1fr
      "sidebar" auto
      "ads"     auto
      "footer"  60px
      / 1fr;
  }
}

/* ── Mosaic / Asymmetric Gallery ─────────────────── */
.mosaic {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 200px);
  gap: 8px;
}
.mosaic-item:nth-child(1) { grid-column: span 2; grid-row: span 2; }
.mosaic-item:nth-child(4) { grid-column: span 2; }
.mosaic-item:nth-child(6) { grid-column: span 2; grid-row: span 2; }
/* Result: Pinterest-like uneven grid */

/* ── CSS Masonry (native - limited support) ──────── */
.masonry-native {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: masonry; /* Firefox flag only */
  gap: 16px;
}

/* ── CSS Masonry (column hack) ───────────────────── */
.masonry-columns {
  columns: 3;           /* 3 columns */
  column-gap: 16px;
}
.masonry-item {
  break-inside: avoid; /* don't split item across columns */
  margin-bottom: 16px;
}

/* ── Magazine layout ─────────────────────────────── */
.magazine {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 60px;
  gap: 12px;
}
.featured { grid-column: span 4; grid-row: span 5; }
.sidebar  { grid-column: span 2; grid-row: span 3; }
.small    { grid-column: span 2; grid-row: span 2; }`,
  },
  {
    q: "What are CSS logical custom properties and component API design?",
    a: "A component CSS API uses custom properties as a public interface, allowing consumers to customize appearance without overriding internal implementation. This is the pattern used by modern design systems like Material Design and Shoelace.",
    code: `/* ── Button component with CSS API ──────────────── */
.btn {
  /* Public API - consumers can override these */
  --btn-bg:              var(--color-primary, #f0c040);
  --btn-color:           var(--color-bg, #0a0a0a);
  --btn-border:          transparent;
  --btn-border-width:    2px;
  --btn-radius:          var(--radius-md, 8px);
  --btn-padding-x:       var(--space-md, 16px);
  --btn-padding-y:       var(--space-sm, 8px);
  --btn-font-size:       var(--text-md, 1rem);
  --btn-font-weight:     700;
  --btn-shadow:          none;
  --btn-transition:      all 0.2s ease;

  /* Private implementation (use the API variables) */
  display:         inline-flex;
  align-items:     center;
  gap:             var(--space-sm);
  background:      var(--btn-bg);
  color:           var(--btn-color);
  border:          var(--btn-border-width) solid var(--btn-border);
  border-radius:   var(--btn-radius);
  padding:         var(--btn-padding-y) var(--btn-padding-x);
  font-size:       var(--btn-font-size);
  font-weight:     var(--btn-font-weight);
  box-shadow:      var(--btn-shadow);
  transition:      var(--btn-transition);
  cursor:          pointer;
}

/* ── Variant classes (minimal overrides) ─────────── */
.btn--danger  { --btn-bg: #e34f26; --btn-color: #fff; }
.btn--success { --btn-bg: #68a063; --btn-color: #fff; }
.btn--ghost   {
  --btn-bg:     transparent;
  --btn-border: currentColor;
  --btn-color:  var(--color-primary, #f0c040);
}
.btn--sm { --btn-padding-x: 12px; --btn-padding-y: 4px; --btn-font-size: 0.875rem; }
.btn--lg { --btn-padding-x: 24px; --btn-padding-y: 12px; --btn-font-size: 1.125rem; }

/* ── Consumer overrides (no !important needed) ────── */
.my-page .btn {
  --btn-radius: 0;          /* square corners for this page */
  --btn-bg: purple;
}

/* Inline customization */
/* <button class="btn" style="--btn-bg: coral; --btn-radius: 50px"> */

/* ── Card component API ───────────────────────────── */
.card {
  --card-bg:        var(--color-bg-2, #111);
  --card-border:    var(--color-border, #222);
  --card-radius:    var(--radius-lg, 12px);
  --card-padding:   var(--space-lg, 24px);
  --card-shadow:    var(--shadow-md);
  --card-gap:       var(--space-md, 16px);

  background:    var(--card-bg);
  border:        1px solid var(--card-border);
  border-radius: var(--card-radius);
  padding:       var(--card-padding);
  box-shadow:    var(--card-shadow);
  display:       flex;
  flex-direction: column;
  gap:           var(--card-gap);
}`,
  },
  {
    q: "What are CSS counter styles and advanced list styling?",
    a: "CSS counters enable automatic numbering of elements. @counter-style defines custom numbering systems. Combined with ::marker pseudo-element and list-style properties, you can create fully custom ordered and unordered lists.",
    code: `/* ── CSS Counters ────────────────────────────────── */
/* Reset counter on parent */
.steps { counter-reset: step-counter; }

/* Increment on each item */
.step {
  counter-increment: step-counter;
  position: relative;
  padding-left: 48px;
}

/* Display counter value */
.step::before {
  content: counter(step-counter);
  position: absolute;
  left:   0;
  top:    0;
  width:  32px;
  height: 32px;
  border-radius: 50%;
  background: #f0c040;
  color:      #000;
  font-weight: bold;
  display:     flex;
  align-items: center;
  justify-content: center;
}

/* ── Counter in headings (TOC style) ─────────────── */
article { counter-reset: h2 h3; }
h2 { counter-reset: h3; counter-increment: h2; }
h3 { counter-increment: h3; }
h2::before { content: counter(h2) ". "; }
h3::before { content: counter(h2) "." counter(h3) " "; }

/* Counter styles */
ol { list-style-type: counter(steps, decimal); }
ol { counter-reset: my-counter 10; } /* start at 11 */

/* ── @counter-style ───────────────────────────────── */
@counter-style thumbs {
  system:  cyclic;
  symbols: "👍" "👎" "🤷";
  suffix:  " ";
}

@counter-style alphabet-caps {
  system: alphabetic;
  symbols: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z;
}

@counter-style roman {
  system: additive;
  additive-symbols: 1000 M, 900 CM, 500 D, 400 CD, 100 C;
  suffix: ") ";
}

ul.emoji  { list-style-type: thumbs; }
ol.alpha  { list-style-type: alphabet-caps; }
ol.roman  { list-style-type: roman; }

/* ── ::marker pseudo-element ─────────────────────── */
li::marker {
  color:       #f0c040;
  font-size:   1.2em;
  font-weight: bold;
  content:     "→ "; /* custom marker content */
}

ul li::marker { content: "✦ "; }
ol li::marker { content: counter(list-item) ") "; color: #61dafb; }`,
  },
  {
    q: "What are CSS shapes and clip-path?",
    a: "clip-path clips an element to a shape, hiding content outside. CSS Shapes (shape-outside) lets inline content flow around non-rectangular shapes. These enable magazine-style layouts and creative visual design.",
    code: `/* ── clip-path shapes ───────────────────────────── */
.el {
  /* Basic shapes */
  clip-path: circle(50%);                    /* circle */
  clip-path: circle(80px at 50% 50%);        /* circle with size and position */
  clip-path: ellipse(100px 60px at center);  /* ellipse */
  clip-path: inset(10px);                    /* inset rectangle */
  clip-path: inset(10px round 8px);          /* inset with border-radius */
  clip-path: inset(10px 20px 30px 20px);     /* top right bottom left */

  /* Polygon - define points */
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);          /* triangle */
  clip-path: polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%); /* arrow down */
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); /* star */

  /* SVG path */
  clip-path: path("M10 10 L90 10 L90 90 L10 90 Z");
}

/* ── Animated clip-path ──────────────────────────── */
.reveal {
  clip-path: inset(0 100% 0 0); /* fully hidden */
  transition: clip-path 0.6s ease;
}
.reveal.visible {
  clip-path: inset(0 0% 0 0);   /* fully revealed */
}

/* Diagonal reveal */
.diagonal {
  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  transition: clip-path 0.8s cubic-bezier(0.65, 0, 0.35, 1);
}
.diagonal.visible {
  clip-path: polygon(0 0, 110% 0, 110% 100%, 0 100%);
}

/* ── shape-outside (text flow) ───────────────────── */
.float-circle {
  float:         left;
  shape-outside: circle(50%);      /* text flows around circle */
  shape-margin:  16px;             /* gap between shape and text */
  width:  200px;
  height: 200px;
  border-radius: 50%;
}

.float-custom {
  float:         left;
  width:  200px;
  height: 300px;
  shape-outside: polygon(0 0, 100% 0, 60% 100%, 0% 80%);
  shape-outside: url("shape-mask.png"); /* image alpha channel as shape */
}

/* Text flows AROUND the shape, not the bounding box ✅ */`,
  },
  {
    q: "What are advanced CSS selectors: :is(), :where(), :has(), and :not()?",
    a: "Modern CSS selectors enable more powerful and concise selection patterns. :is() and :where() accept selector lists. :has() selects based on descendants. :not() excludes elements. Together they eliminate many complex selector patterns.",
    code: `/* ── :is() - matches any in list ────────────────── */
/* Without :is() - verbose */
h1 a, h2 a, h3 a, h4 a, h5 a, h6 a { color: inherit; }

/* With :is() - concise */
:is(h1, h2, h3, h4, h5, h6) a { color: inherit; }

/* Specificity = most specific argument */
:is(#id, .class, div) {} /* specificity of #id = 0,1,0,0 */

/* ── :where() - zero specificity ────────────────── */
/* Like :is() but contributes 0 to specificity */
:where(h1, h2, h3) { margin-bottom: 1rem; }
/* Can be overridden by a single class: */
.compact h2 { margin-bottom: 0; } /* wins because :where has 0 specificity */

/* Great for reset styles */
:where(*, *::before, *::after) { box-sizing: border-box; }

/* ── :not() - exclude elements ───────────────────── */
/* Single */
a:not(.active) { opacity: 0.6; }
input:not([type="submit"]) { border: 1px solid #333; }

/* Multiple (modern) */
a:not(.active, .disabled) { color: inherit; }
:not(h1, h2, h3, h4, h5, h6) { font-size: 1rem; }

/* Chained */
li:not(:first-child):not(:last-child) { /* middle items */ }

/* ── :has() - relational ──────────────────────────── */
/* Parent has child */
.card:has(> .badge)      { padding-top: 24px; }
.nav:has(.dropdown:hover) { background: rgba(0,0,0,0.8); }

/* Sibling relationships */
h2:has(+ p)   { margin-bottom: 8px; }    /* h2 followed by p */
p:has(~ pre)  { font-style: italic; }    /* p before a code block */

/* Ancestor relationships */
body:has(.modal-open) { overflow: hidden; } /* lock scroll when modal open */
html:has(#sidebar:checked) .content { margin-left: 280px; }

/* ── Combining all four ───────────────────────────── */
/* Form fields that are invalid, not disabled, and not the first field */
:is(input, select, textarea):not(:disabled, :first-child):has(:invalid),
:is(input, select, textarea):not(:disabled, :first-child):invalid {
  border-color: #e34f26;
}`,
  },

  // ─── ADVANCED ───────────────────────────────────────────────
  {
    q: "What are CSS container queries and how do they change responsive design?",
    a: "Container queries apply styles based on the size of a container element rather than the viewport. This enables truly reusable components that adapt to their context — the same component can be compact in a sidebar and expanded in main content.",
    code: `/* ── Define a container ─────────────────────────── */
.card-wrapper {
  container-type: inline-size; /* respond to width changes */
  container-name: card;        /* optional name for targeting */
}

/* container-type values:
   inline-size: width queries enabled (most common)
   size:        width AND height queries enabled
   normal:      only style queries */

/* ── Write container queries ─────────────────────── */
/* Default: compact (mobile-like) */
.card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.card-image { width: 100%; aspect-ratio: 16/9; }
.card-title { font-size: 1rem; }

/* When container is >= 400px wide */
@container card (min-width: 400px) {
  .card { flex-direction: row; }
  .card-image { width: 160px; aspect-ratio: 1; }
  .card-title { font-size: 1.25rem; }
}

/* When container is >= 600px wide */
@container card (min-width: 600px) {
  .card-image { width: 240px; }
  .card-title { font-size: 1.5rem; }
  .card-description { display: block; }
}

/* ── Multiple containers ─────────────────────────── */
.sidebar-wrapper { container: sidebar / inline-size; }
.main-wrapper    { container: main    / inline-size; }

@container sidebar (max-width: 200px) {
  .nav-label { display: none; }     /* icon-only nav */
}
@container main (min-width: 800px) {
  .article { column-count: 2; }     /* two-column article */
}

/* ── Container query units ───────────────────────── */
/* cqi = 1% of container inline size (width) */
/* cqb = 1% of container block size (height) */
/* cqw, cqh, cqmin, cqmax */
.card-title { font-size: clamp(1rem, 4cqi, 2rem); } /* fluid in container */

/* ── Style queries (experimental) ───────────────── */
@container style(--variant: featured) {
  .card { border: 2px solid #f0c040; }
}
/* Usage: <div style="--variant: featured"> */`,
  },
  {
    q: "What are CSS cascade layers (@layer)?",
    a: "CSS @layer creates explicit cascade layers, giving developers control over specificity without !important wars. Layers declared first have lower priority. Unlayered styles always beat layered styles. Essential for design system architecture.",
    code: `/* ── Declare layer order (lowest to highest priority) */
@layer reset, base, tokens, components, utilities;

/* ── Reset layer (lowest priority) ──────────────── */
@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  * { margin: 0; padding: 0; }
  img, video { max-width: 100%; display: block; }
}

/* ── Base/typography layer ───────────────────────── */
@layer base {
  body {
    font-family: var(--font-sans);
    line-height: 1.6;
    color: var(--color-text);
  }
  h1 { font-size: 2.5rem; }
  a  { color: var(--color-primary); }
}

/* ── Design tokens layer ─────────────────────────── */
@layer tokens {
  :root {
    --color-primary: #f0c040;
    --space-md: 16px;
  }
}

/* ── Components layer ────────────────────────────── */
@layer components {
  .btn {
    background: var(--color-primary);
    padding: 8px 16px;
    /* Specificity: 0,1,0 (class) */
  }
  .card { border: 1px solid #222; border-radius: 8px; }
}

/* ── Utilities layer (highest among layered) ─────── */
@layer utilities {
  .hidden  { display: none !important; }
  .flex    { display: flex; }
  .mt-auto { margin-top: auto; }
  /* Even a class beats all components because utilities layer is higher */
  .bg-red  { background: red; }
}

/* ── Unlayered styles ALWAYS win over layered ─────── */
/* This beats ALL layers regardless of specificity */
.special-case { color: purple; } /* unlayered - highest priority */

/* ── Import into layers ──────────────────────────── */
@import url("reset.css") layer(reset);
@import url("bootstrap.css") layer(vendor);

/* ── Anonymous layers ────────────────────────────── */
@layer { /* anonymous - cannot be referenced again */
  .temp { color: red; }
}

/* ── Layer specificity ───────────────────────────── */
/* In components layer: #id selector LOSES to .class in utilities layer */
/* Layer order beats specificity! This is the key insight. */
@layer components { #special { color: blue; }  }   /* loses */
@layer utilities  { .override { color: green; } }  /* wins */`,
  },
  {
    q: "What is the CSS color system: color spaces, oklch, and color-mix()?",
    a: "CSS Color Level 4 and 5 introduce perceptually uniform color spaces (oklch, oklab, display-p3) and functions like color-mix(), color-contrast(), and relative colors. oklch is the recommended modern color space for design systems.",
    code: `/* ── Modern color spaces ─────────────────────────── */
/* oklch(lightness chroma hue) - perceptually uniform */
/* Lightness: 0% = black, 100% = white */
/* Chroma: 0 = gray, higher = more colorful (~0.37 max) */
/* Hue: 0-360 degrees */

.oklch {
  color: oklch(65% 0.25 40);      /* warm orange */
  color: oklch(65% 0.25 180);     /* teal (same L+C, different H) */
  color: oklch(90% 0.15 100);     /* light yellow */
  color: oklch(30% 0.20 265);     /* dark blue */

  /* With alpha */
  color: oklch(65% 0.25 40 / 0.5);
}

/* ── oklab - for interpolation ───────────────────── */
.oklab {
  color: oklab(65% -0.1 0.15);    /* lab(L a b) */
}

/* ── Display-P3 - wide color gamut ───────────────── */
.p3 {
  color: color(display-p3 1 0.5 0);  /* vivid orange (beyond sRGB) */
}

/* ── color-mix() ─────────────────────────────────── */
/* Mix two colors in specified color space */
.mixed {
  /* 50% red + 50% blue in oklch */
  color: color-mix(in oklch, red 50%, blue);

  /* 30% primary mixed with white (tint) */
  background: color-mix(in oklch, var(--color-primary) 30%, white);

  /* 20% mixed with black (shade) */
  border-color: color-mix(in oklch, var(--color-primary) 80%, black);

  /* Mix in sRGB (default, may look muddy) */
  color: color-mix(in srgb, #ff0000, #0000ff);

  /* Mix in hsl */
  color: color-mix(in hsl, hsl(0 100% 50%), hsl(240 100% 50%));
}

/* ── Relative colors (CSS Color 5) ───────────────── */
/* Create variations of a color */
.relative {
  --base: oklch(65% 0.25 40);

  /* Lighter version */
  color: oklch(from var(--base) calc(l + 20%) c h);

  /* Desaturated */
  color: oklch(from var(--base) l calc(c - 0.1) h);

  /* Complementary (opposite hue) */
  color: oklch(from var(--base) l c calc(h + 180));

  /* With alpha from existing color */
  color: rgb(from var(--base) r g b / 0.5);
}

/* ── color-contrast() (experimental) ─────────────── */
.auto-contrast {
  /* Pick best contrast automatically */
  color: color-contrast(var(--bg) vs white, black);
}`,
  },
  {
    q: "What are CSS view transitions?",
    a: "The View Transitions API enables smooth animated transitions between page states or navigations. Single-page transitions use document.startViewTransition(). Multi-page view transitions (MPA) work with the @view-transition rule in CSS.",
    code: `/* ── Single Page View Transitions ───────────────── */
/* JavaScript triggers the transition */
document.startViewTransition(() => {
  // DOM update function (or async function)
  updatePageContent(newRoute);
  // OR: return a Promise
  return fetch(url).then(r => r.text()).then(html => {
    document.body.innerHTML = html;
  });
});

/* ── Default transition styles ───────────────────── */
/* By default, browser cross-fades old and new content */
/* Customize with ::view-transition pseudo-elements */

::view-transition-old(root) {
  /* The outgoing page screenshot */
  animation: slide-out 0.3s ease-in;
}
::view-transition-new(root) {
  /* The incoming page content */
  animation: slide-in 0.3s ease-out;
}

@keyframes slide-out {
  to { transform: translateX(-100%); opacity: 0; }
}
@keyframes slide-in {
  from { transform: translateX(100%); opacity: 0; }
}

/* ── Named view transitions ──────────────────────── */
/* Tag specific elements for individual animations */
.hero-image {
  view-transition-name: hero;    /* must be unique on page */
}
.page-title {
  view-transition-name: title;
}

/* Animate specific named elements */
::view-transition-old(hero) { animation: none; }
::view-transition-new(hero) { animation: none; }
::view-transition-image-pair(hero) {
  /* Hero element morphs between old and new position! */
}

/* ── Multi-Page View Transitions (MPA) ───────────── */
/* In CSS - enables cross-page transitions */
@view-transition {
  navigation: auto; /* enable for same-origin navigations */
}

/* Customize transition type */
html {
  view-transition-name: root;
}

/* Different transitions based on navigation direction */
:root:active-view-transition-type(back) ::view-transition-old(root) {
  animation: slide-right 0.4s ease;
}
:root:active-view-transition-type(forward) ::view-transition-new(root) {
  animation: slide-left 0.4s ease;
}

/* ── Reduced motion ──────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation-duration: 0.01ms !important;
  }
}`,
  },
  {
    q: "How do you implement dark mode in CSS?",
    a: "Dark mode implementation uses CSS custom properties and media queries. The modern approach combines prefers-color-scheme for system detection with a data attribute or class toggle for user preference, with localStorage persistence.",
    code: `/* ── System preference detection ────────────────── */
:root {
  /* Light mode defaults */
  --bg:        #ffffff;
  --bg-2:      #f5f5f5;
  --text:      #111111;
  --text-muted:#666666;
  --border:    #e0e0e0;
  --accent:    #f0c040;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg:        #0a0a0a;
    --bg-2:      #111111;
    --text:      #e8e8e8;
    --text-muted:#666666;
    --border:    #222222;
    --accent:    #f0c040;
  }
}

/* ── Data attribute toggle (user preference) ─────── */
/* HTML: <html data-theme="dark"> */
[data-theme="light"] {
  --bg:   #ffffff;
  --text: #111111;
}
[data-theme="dark"] {
  --bg:   #0a0a0a;
  --text: #e8e8e8;
}

/* ── Class-based toggle ──────────────────────────── */
.dark-mode {
  --bg:   #0a0a0a;
  --text: #e8e8e8;
}

/* ── JavaScript implementation ───────────────────── */
/*
const toggleBtn = document.getElementById("theme-toggle");

function getPreferred() {
  return localStorage.getItem("theme") ??
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  toggleBtn.textContent = theme === "dark" ? "🌙" : "☀️";
}

// Initialize
setTheme(getPreferred());

// Toggle
toggleBtn.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

// Listen for system changes
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    setTheme(e.matches ? "dark" : "light");
  }
});
*/

/* ── Dark mode images ────────────────────────────── */
@media (prefers-color-scheme: dark) {
  img:not([src*=".svg"]) { filter: brightness(0.85) contrast(1.05); }
}

/* ── Invert SVG icons for dark mode ──────────────── */
[data-theme="dark"] .icon-dark-invert { filter: invert(1); }`,
  },
  {
    q: "What are CSS nesting and modern syntax?",
    a: "Native CSS nesting (now widely supported) allows writing nested rules inside parent selectors — similar to Sass. Combined with @scope, @starting-style, and other modern CSS syntax, it dramatically reduces repetition and improves code organization.",
    code: `/* ── CSS Nesting (native, no preprocessor needed) ── */
.card {
  background: var(--bg-2);
  border-radius: 8px;
  padding: 16px;

  /* Nest child selectors */
  .card-title {
    font-size: 1.25rem;
    color: var(--color-primary);
  }

  .card-content {
    margin-top: 8px;
    color: var(--text-muted);
  }

  /* & represents the parent selector */
  &:hover {
    border-color: var(--color-primary);
    transform: translateY(-2px);
  }

  &.featured {
    border: 2px solid var(--color-primary);
  }

  /* Nested at-rules */
  @media (min-width: 768px) {
    padding: 24px;
    .card-title { font-size: 1.5rem; }
  }
}

/* ── Complex nesting ─────────────────────────────── */
.nav {
  display: flex;

  & a {
    color: var(--text-muted);
    padding: 8px 16px;
    text-decoration: none;

    &:hover { color: var(--color-primary); }
    &.active { color: var(--color-primary); font-weight: bold; }
    &[aria-current="page"] { border-bottom: 2px solid currentColor; }
  }

  &:has(.dropdown:hover) { background: rgba(0,0,0,0.5); }
}

/* ── @scope ──────────────────────────────────────── */
/* Limit selector scope to specific DOM subtree */
@scope (.card) {
  /* Only applies inside .card */
  .title { color: var(--color-primary); }
  p { margin-bottom: 8px; }
}

@scope (.card) to (.card-footer) {
  /* Only applies inside .card, but NOT inside .card-footer */
  p { font-size: 0.9rem; }
}

/* ── @starting-style ─────────────────────────────── */
/* Define initial styles for entry animations (no JS needed) */
.dialog {
  opacity: 1;
  transform: scale(1);
  transition: opacity 0.3s, transform 0.3s;

  @starting-style {
    /* These are the styles applied when element FIRST displays */
    opacity: 0;
    transform: scale(0.9);
  }
}`,
  },
  {
    q: "What are the CSS performance best practices?",
    a: "CSS performance involves avoiding expensive properties, reducing layout thrashing, using GPU-accelerated properties, minimizing specificity, critical CSS extraction, and using containment. The browser rendering pipeline (Style → Layout → Paint → Composite) guides optimization.",
    code: `/* ── GPU-accelerated properties (compositing) ────── */
/* These only trigger composite - cheapest */
.fast {
  transform:  translateX(100px);  /* ✅ GPU */
  opacity:    0.5;                 /* ✅ GPU */
  filter:     blur(4px);          /* ✅ GPU (usually) */
  will-change: transform, opacity; /* hint browser to promote layer */
}

/* These trigger layout (reflow) - most expensive */
.slow {
  width:      100px;  /* ❌ layout */
  height:     100px;  /* ❌ layout */
  top:        20px;   /* ❌ layout (use transform instead) */
  left:       20px;   /* ❌ layout (use transform: translateX) */
  margin:     10px;   /* ❌ layout */
  padding:    10px;   /* ❌ layout */
  font-size:  16px;   /* ❌ layout */
}

/* These trigger paint only - medium cost */
.medium {
  background: #f0c040;  /* ❌ paint */
  color:      #000;     /* ❌ paint */
  box-shadow: 0 4px 8px rgba(0,0,0,0.2); /* ❌ paint */
  border:     1px solid; /* ❌ paint (and sometimes layout) */
}

/* ── Selector performance ────────────────────────── */
/* Selectors are matched right-to-left */
/* ❌ Expensive: universal descendent */
.sidebar * { box-sizing: border-box; }

/* ✅ Better: class directly */
.sidebar-item { box-sizing: border-box; }

/* ❌ Avoid deep nesting */
.nav ul li a span { color: red; }

/* ✅ Single class */
.nav-link-text { color: red; }

/* ── will-change (use sparingly) ─────────────────── */
.will-animate {
  will-change: transform;   /* promote to own layer before animation */
}
/* Remove after animation to free memory */
el.addEventListener("animationend", () => el.style.willChange = "auto");

/* ── content-visibility for long pages ───────────── */
.article { content-visibility: auto; contain-intrinsic-size: 0 300px; }

/* ── Critical CSS inlining ───────────────────────── */
/* Extract above-the-fold styles to <style> tag in <head> */
/* Load rest asynchronously */
/* <link rel="preload" href="styles.css" as="style" onload="this.rel='stylesheet'"> */

/* ── Reduce paint areas ───────────────────────────── */
.sidebar { contain: paint; } /* browser won't repaint outside this */`,
  },
  {
    q: "What are CSS trigonometric functions and math functions?",
    a: "CSS math functions enable complex calculations. Beyond calc(), CSS now supports min(), max(), clamp(), sin(), cos(), tan(), atan2(), pow(), sqrt(), round(), mod(), and rem() — enabling previously impossible pure-CSS layouts and animations.",
    code: `/* ── calc() ──────────────────────────────────────── */
.el {
  width:  calc(100% - 2 * 24px);    /* mixed units */
  height: calc(100vh - 60px);       /* viewport minus navbar */
  font-size: calc(1rem + 0.5vw);    /* fluid */
  padding:   calc(var(--space) * 2); /* with variables */
  transform: translateX(calc(50% - 8px));
}

/* ── min(), max(), clamp() ───────────────────────── */
.container {
  width: min(90%, 1200px);           /* smaller of two */
  padding: max(16px, 4vw);           /* larger of two */
  font-size: clamp(1rem, 2.5vw, 2rem); /* between min and max */
}

/* ── Trigonometric functions ─────────────────────── */
/* sin(), cos(), tan(), asin(), acos(), atan(), atan2() */

/* Circle of items (pure CSS) */
.orbit {
  --items: 8;
  --radius: 150px;
}
.orbit-item {
  --i: 0;
  --angle: calc(var(--i) * (360deg / var(--items)));
  position: absolute;
  left: calc(50% + var(--radius) * cos(var(--angle)));
  top:  calc(50% + var(--radius) * sin(var(--angle)));
  transform: translate(-50%, -50%);
}
/* CSS custom:
   item 1: style="--i:0"  → 0deg
   item 2: style="--i:1"  → 45deg
   item 3: style="--i:2"  → 90deg   etc */

/* Wavy text/path */
@keyframes wave {
  0%   { transform: translateY(calc(sin(0deg)   * 20px)); }
  25%  { transform: translateY(calc(sin(90deg)  * 20px)); }
  50%  { transform: translateY(calc(sin(180deg) * 20px)); }
  100% { transform: translateY(calc(sin(360deg) * 20px)); }
}

/* ── Power and root functions ────────────────────── */
.el {
  /* pow(base, exponent), sqrt(value), hypot(), log(), exp() */
  width: calc(sqrt(10000px));   /* 100px */
  /* (requires @property for dynamic use) */
}

/* ── round(), mod(), rem() ───────────────────────── */
.grid {
  /* round(value, step) - snap to nearest step */
  grid-template-columns: repeat(round(down, 100vw / 300px, 1), 1fr);
}
.el {
  /* mod() - remainder (sign follows divisor) */
  margin-left: mod(100%, 30px); /* remainder after 30px grid */
}`,
  },
  {
    q: "What is the CSS anchor positioning API?",
    a: "CSS Anchor Positioning lets you position an element relative to another element (its anchor) anywhere on the page without JavaScript. It replaces complex tooltip/dropdown positioning code and handles viewport overflow automatically.",
    code: `/* ── Basic anchor positioning ───────────────────── */
/* 1. Define the anchor element */
.trigger {
  anchor-name: --my-anchor; /* register as anchor */
}

/* 2. Position element relative to anchor */
.tooltip {
  position: absolute;
  position-anchor: --my-anchor; /* attach to anchor */

  /* Position relative to anchor edges */
  bottom: anchor(top);          /* tooltip bottom = anchor top */
  left:   anchor(center);       /* tooltip left = anchor center */
  transform: translateX(-50%);  /* center horizontally */
}

/* ── anchor() function ───────────────────────────── */
/* anchor(--name side) or anchor(side) with position-anchor set */
.popover {
  position:        absolute;
  position-anchor: --button;

  top:    anchor(bottom);       /* popover top = button bottom */
  left:   anchor(left);         /* align left edges */
  width:  anchor-size(width);   /* same width as anchor */
  /* anchor-size(width | height | block | inline | self-block | self-inline) */
}

/* ── Viewport overflow handling ──────────────────── */
.smart-tooltip {
  position:        absolute;
  position-anchor: --target;

  /* Try to place above anchor */
  top:    anchor(top);
  bottom: anchor(bottom);
  left:   anchor(center);

  /* If above would overflow, flip to below */
  position-try-order: normal, flip-block;
  position-try-fallbacks:
    --above,  /* try custom position */
    --below,
    flip-block;
}

@position-try --above {
  bottom: anchor(top);
  top: auto;
}
@position-try --below {
  top:    anchor(bottom);
  bottom: auto;
}

/* ── Dropdown menu ───────────────────────────────── */
.menu-btn {
  anchor-name: --menu;
}
.dropdown {
  position:        fixed;  /* fixed to avoid clip */
  position-anchor: --menu;
  top:   anchor(bottom);
  left:  anchor(left);
  width: max(anchor-size(width), 200px); /* at least 200px */

  /* Viewport margin */
  margin: 8px;
  position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
}`,
  },
  {
    q: "What are CSS best practices for large-scale applications?",
    a: "Large-scale CSS requires architecture decisions: naming conventions (BEM, CUBE CSS), cascade management (@layer), design tokens, component-based organization, utility classes, and performance optimization. The goal is maintainable, scalable, and performant CSS.",
    code: `/* ── 1. Design token system ──────────────────────── */
@layer tokens {
  :root {
    /* Primitive */
    --blue-500: #3b82f6;
    --gray-900: #111827;
    /* Semantic */
    --color-action:  var(--blue-500);
    --color-surface: var(--gray-900);
    /* Component */
    --btn-primary-bg: var(--color-action);
  }
}

/* ── 2. Layer architecture ───────────────────────── */
@layer reset, tokens, base, layout, components, patterns, utilities;

/* ── 3. BEM naming convention ────────────────────── */
/* Block: .card */
/* Element: .card__title, .card__body, .card__footer */
/* Modifier: .card--featured, .card--compact */
.card {}
.card__title {}
.card__body {}
.card--featured { border: 2px solid var(--color-action); }
.card--compact .card__body { padding: 8px; }

/* ── 4. CUBE CSS methodology ─────────────────────── */
/* Composition: layout, spacing */
.cluster { display: flex; flex-wrap: wrap; gap: var(--space); }
.stack > * + * { margin-block-start: var(--space, 1.5rem); }

/* Utility: single-purpose classes */
.text-center { text-align: center; }
.sr-only { position: absolute; width: 1px; height: 1px; clip: rect(0 0 0 0); }

/* Block: encapsulated component */
.card { /* ... */ }

/* Exception: modifier */
.card[data-state="loading"] .card__content { opacity: 0.5; }

/* ── 5. Critical CSS ─────────────────────────────── */
/* Inline above-the-fold styles */
/* Defer non-critical: */
/* <link rel="preload" as="style" href="styles.css" */
/*       onload="this.onload=null;this.rel='stylesheet'"> */

/* ── 6. CSS file organization ────────────────────── */
/*
styles/
├── tokens/
│   ├── colors.css
│   ├── spacing.css
│   └── typography.css
├── base/
│   ├── reset.css
│   └── global.css
├── layout/
│   ├── grid.css
│   └── sidebar.css
├── components/
│   ├── button.css
│   ├── card.css
│   └── modal.css
└── utilities/
    └── index.css
*/

/* ── 7. Reducing specificity issues ──────────────── */
/* Prefer classes over IDs */
/* Use :where() for reset styles (0 specificity) */
/* Use @layer to manage cascade */
/* Avoid !important (use layers instead) */`,
  },
];