export const meta = {
  id: "react",
  label: "React",
  icon: "⚛️",
  color: "#61dafb",
  desc: "A JavaScript library for building user interfaces with reusable components.",
};

export const qaData = [
  // ─── BEGINNER ────────────────────────────────────────────
  {
    q: "What is React and why is it used?",
    a: "React is a JavaScript library for building user interfaces, developed by Facebook. It uses a component-based architecture, a virtual DOM for efficient updates, and a declarative approach to UI development. It's used because it makes it easy to build complex, interactive UIs with reusable components.",
    code: `// React uses JSX - JavaScript + HTML-like syntax
import React from "react";
import ReactDOM from "react-dom/client";

// A simple React component
function Welcome({ name }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome to React</p>
    </div>
  );
}

// Mount to DOM
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Welcome name="Alice" />);

// React's key benefits:
// ✅ Component-based: reusable, composable pieces
// ✅ Virtual DOM: efficient diffing and updates
// ✅ Declarative: describe WHAT the UI looks like, not HOW to update it
// ✅ Unidirectional data flow: predictable state management
// ✅ Rich ecosystem: React Router, Redux, React Query, etc.

// Without React (imperative):
const el = document.createElement("h1");
el.textContent = "Hello, Alice!";
document.body.appendChild(el);

// With React (declarative):
<h1>Hello, Alice!</h1>`,
  },
  {
    q: "What is JSX and how does it work?",
    a: "JSX (JavaScript XML) is a syntax extension that lets you write HTML-like code inside JavaScript. Babel transforms JSX into React.createElement() calls. It is not required but makes code much more readable.",
    code: `// JSX syntax
const element = <h1 className="title">Hello, World!</h1>;

// Babel compiles it to:
const element2 = React.createElement(
  "h1",
  { className: "title" },
  "Hello, World!"
);

// JSX rules:
// 1. Return single root element (or Fragment)
function App() {
  return (
    <>                          {/* Fragment - no extra DOM node */}
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  );
}

// 2. Use className instead of class
<div className="container" />

// 3. Self-close empty tags
<img src="img.png" alt="photo" />
<br />

// 4. camelCase for HTML attributes
<input onChange={handler} tabIndex={0} />

// 5. JS expressions in {}
const name = "Alice";
const age  = 25;
<p>{name} is {age >= 18 ? "adult" : "minor"}</p>

// 6. Inline styles as objects
<div style={{ color: "red", fontSize: "16px" }} />

// 7. Comments
<div>
  {/* This is a JSX comment */}
</div>`,
  },
  {
    q: "What are components in React? What is the difference between functional and class components?",
    a: "Components are the building blocks of React apps — reusable, self-contained pieces of UI. Functional components are plain JavaScript functions that return JSX. Class components extend React.Component. Since React Hooks were introduced, functional components are the modern standard.",
    code: `// ── Functional Component (modern, preferred) ─────
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
    </div>
  );
}

// Arrow function style
const Greeting2 = ({ name }) => <h1>Hello, {name}!</h1>;

// ── Class Component (legacy) ──────────────────────
import { Component } from "react";

class Greeting3 extends Component {
  render() {
    const { name, age } = this.props;
    return (
      <div>
        <h1>Hello, {name}!</h1>
        <p>Age: {age}</p>
      </div>
    );
  }
}

// Usage is identical:
<Greeting  name="Alice" age={25} />
<Greeting3 name="Alice" age={25} />

// Key differences:
// Functional      | Class
// --------------------
// Plain function  | Extends Component
// Hooks for state | this.state / this.setState
// No lifecycle    | Lifecycle methods (componentDidMount, etc.)
// Simpler code    | More boilerplate
// Better perf     | Slightly heavier`,
  },
  {
    q: "What are props in React?",
    a: "Props (properties) are read-only inputs passed from parent to child components. They allow data and callbacks to flow down the component tree. Props cannot be modified by the receiving component — they are immutable.",
    code: `// Parent passes props
function App() {
  const handleClick = (name) => console.log(\`Clicked: \${name}\`);
  return (
    <UserCard
      name="Alice"
      age={25}
      isAdmin={true}
      scores={[95, 87, 92]}
      address={{ city: "Paris" }}
      onSelect={handleClick}
    />
  );
}

// Child receives via destructuring
function UserCard({ name, age, isAdmin, scores, address, onSelect }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {isAdmin && <span>Admin</span>}
      <p>City: {address.city}</p>
      <p>Avg: {scores.reduce((a,b) => a+b,0) / scores.length}</p>
      <button onClick={() => onSelect(name)}>Select</button>
    </div>
  );
}

// Default props
function Button({ label = "Click me", variant = "primary", disabled = false }) {
  return <button className={variant} disabled={disabled}>{label}</button>;
}

// children prop - content between tags
function Card({ children, title }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
<Card title="Profile">
  <p>Alice, 25</p>
  <button>Edit</button>
</Card>`,
  },
  {
    q: "What is state in React and how does useState work?",
    a: "State is data that a component manages internally and can change over time. When state changes, React re-renders the component. useState is a hook that returns the current state value and a setter function.",
    code: `import { useState } from "react";

// Basic useState
function Counter() {
  const [count, setCount] = useState(0); // initial value = 0

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// Functional update (when new state depends on old)
function SafeCounter() {
  const [count, setCount] = useState(0);
  // ✅ Use function form to always get latest state
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  return <button onClick={increment}>{count}</button>;
}

// Object state
function Form() {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,                       // keep other fields
      [e.target.name]: e.target.value // update changed field
    }));
  };

  return (
    <>
      <input name="name"  value={form.name}  onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </>
  );
}

// Lazy initial state (expensive computation)
const [data, setData] = useState(() => {
  return JSON.parse(localStorage.getItem("data")) ?? [];
});`,
  },
  {
    q: "What is the virtual DOM and how does React's reconciliation work?",
    a: "The virtual DOM is a lightweight JavaScript representation of the real DOM. When state changes, React creates a new virtual DOM tree, diffs it against the previous one (reconciliation), and only updates the changed parts in the real DOM.",
    code: `// React's reconciliation process:
// 1. Render phase: React calls components, builds new VDOM tree
// 2. Diffing: React compares new VDOM with previous VDOM
// 3. Commit phase: React applies minimal DOM changes

// Example: only the changed text node is updated
function App() {
  const [count, setCount] = useState(0);
  // Only <span>{count}</span> is updated in real DOM,
  // not the entire component tree
  return (
    <div>
      <h1>Counter App</h1>           {/* unchanged - not touched */}
      <p>Count: <span>{count}</span></p>  {/* only span updated */}
      <button onClick={() => setCount(c => c+1)}>+</button>
    </div>
  );
}

// Keys help reconciliation identify list items
// ❌ Without keys - React re-renders entire list
{items.map(item => <li>{item.name}</li>)}

// ✅ With keys - React reuses existing elements
{items.map(item => <li key={item.id}>{item.name}</li>)}

// Why key matters:
// Adding to start: [B,C] → [A,B,C]
// Without key: React thinks B→A, C→B, adds C (wrong! re-renders all)
// With key:    React knows A is new, B and C are unchanged ✅

// React Fiber (React 16+): reconciliation is now interruptible
// Can pause, resume, and prioritize different updates
// Enables concurrent features (Suspense, transitions)`,
  },
  {
    q: "What is useEffect and when should it be used?",
    a: "useEffect lets you perform side effects in functional components — data fetching, subscriptions, DOM mutations, and timers. It runs after render. The cleanup function prevents memory leaks. The dependency array controls when it runs.",
    code: `import { useState, useEffect } from "react";

// 1. Run after every render (no deps)
useEffect(() => {
  document.title = "My App";
}); // ⚠️ runs after EVERY render - usually not what you want

// 2. Run once on mount (empty deps)
useEffect(() => {
  console.log("Component mounted");
  return () => console.log("Component unmounted"); // cleanup
}, []);

// 3. Run when specific values change
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false; // prevent stale updates

    async function fetchUser() {
      const res  = await fetch(\`/api/users/\${userId}\`);
      const data = await res.json();
      if (!cancelled) setUser(data);
    }
    fetchUser();

    return () => { cancelled = true; }; // cleanup
  }, [userId]); // re-runs when userId changes

  return <div>{user?.name}</div>;
}

// 4. Subscription cleanup
useEffect(() => {
  const subscription = store.subscribe(handleChange);
  return () => subscription.unsubscribe(); // cleanup on unmount ✅
}, []);

// 5. Timer cleanup
useEffect(() => {
  const id = setInterval(() => setCount(c => c + 1), 1000);
  return () => clearInterval(id); // always clean up timers ✅
}, []);

// Common mistake: missing dependencies
useEffect(() => {
  fetchData(userId); // userId used but not in deps!
}, []); // ❌ stale closure - use [userId]`,
  },
  {
    q: "What is the difference between controlled and uncontrolled components?",
    a: "A controlled component has its form data managed by React state — the input value is always driven by state. An uncontrolled component stores form data in the DOM itself, accessed via refs. Controlled components are the React way.",
    code: `import { useState, useRef } from "react";

// ── Controlled Component ──────────────────────
function ControlledForm() {
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email }); // always current values ✅
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}              // driven by state
        onChange={e => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}             // driven by state
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button>Submit</button>
    </form>
  );
}

// ── Uncontrolled Component ────────────────────
function UncontrolledForm() {
  const nameRef  = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name:  nameRef.current.value,  // read from DOM
      email: emailRef.current.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef}  defaultValue="" placeholder="Name" />
      <input ref={emailRef} defaultValue="" placeholder="Email" />
      <button>Submit</button>
    </form>
  );
}

// When to use uncontrolled:
// - File inputs (<input type="file"> is always uncontrolled)
// - Integrating with non-React libraries
// - Performance-critical forms with many fields`,
  },
  {
    q: "What are React keys and why are they important?",
    a: "Keys help React identify which items in a list have changed, been added, or removed. They must be unique among siblings. Using stable, unique IDs is best — avoid using array index as keys when the list can be reordered.",
    code: `// ✅ Use stable unique IDs as keys
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>  {/* stable, unique ID ✅ */}
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// ❌ Avoid index as key when list can change order
{items.map((item, index) => (
  <li key={index}>{item.name}</li>  // index as key ❌
))}

// Why index keys cause bugs:
// Initial: [{id:1,text:"A"}, {id:2,text:"B"}]
// Keys:     0→A, 1→B

// After removing A: [{id:2,text:"B"}]
// Keys:     0→B (React thinks item 0 changed A→B, not removed)
// → Input state stays on wrong item! 🐛

// ✅ Keys must be unique among siblings (not globally)
<ul>
  {listA.map(i => <li key={i.id}>A: {i.text}</li>)}
</ul>
<ul>
  {listB.map(i => <li key={i.id}>B: {i.text}</li>)}  {/* same IDs ok in different list */}
</ul>

// Key as reset trick - force remount by changing key
function ProfilePage({ userId }) {
  return <UserProfile key={userId} userId={userId} />;
  // Changing key forces full remount → resets state ✅
}`,
  },
  {
    q: "What is conditional rendering in React?",
    a: "Conditional rendering renders different UI based on conditions. React supports several patterns: if/else, ternary operator, logical && operator, and switch statements. Choose based on complexity and readability.",
    code: `function Dashboard({ user, loading, error }) {
  // 1. Early return pattern (if/else)
  if (loading) return <Spinner />;
  if (error)   return <ErrorMessage msg={error} />;
  if (!user)   return <p>No user found</p>;

  return <UserDashboard user={user} />;
}

// 2. Ternary operator - for two conditions
function Button({ isLoggedIn }) {
  return (
    <button>
      {isLoggedIn ? "Log Out" : "Log In"}
    </button>
  );
}

// 3. Logical && - render or nothing
function Notification({ message }) {
  return (
    <div>
      {message && <p className="notification">{message}</p>}
      {/* ⚠️ Watch out: 0 && <X/> renders "0", not nothing! */}
      {count > 0 && <Badge count={count} />}  {/* safe */}
      {!!count && <Badge count={count} />}     {/* also safe */}
    </div>
  );
}

// 4. Nullish approach - return null to render nothing
function AdminPanel({ isAdmin }) {
  if (!isAdmin) return null;
  return <div>Admin controls...</div>;
}

// 5. Switch for multiple conditions
function StatusBadge({ status }) {
  const badge = {
    active:   <span className="green">Active</span>,
    inactive: <span className="red">Inactive</span>,
    pending:  <span className="yellow">Pending</span>,
  }[status] ?? <span>Unknown</span>;
  return badge;
}`,
  },

  // ─── INTERMEDIATE ─────────────────────────────────────────
  {
    q: "What is useRef and what are its use cases?",
    a: "useRef returns a mutable ref object with a .current property that persists across renders without causing re-renders. Main use cases: accessing DOM nodes, storing mutable values that don't trigger re-renders, and keeping previous values.",
    code: `import { useRef, useEffect, useState } from "react";

// 1. DOM access
function TextInput() {
  const inputRef = useRef(null);
  return (
    <>
      <input ref={inputRef} placeholder="Type here" />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
      <button onClick={() => inputRef.current.select()}>Select All</button>
    </>
  );
}

// 2. Store mutable value without re-render
function Stopwatch() {
  const [time, setTime]   = useState(0);
  const intervalRef       = useRef(null); // doesn't cause re-render

  const start = () => {
    intervalRef.current = setInterval(() => setTime(t => t + 1), 1000);
  };
  const stop = () => clearInterval(intervalRef.current);

  return (
    <>
      <p>Time: {time}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  );
}

// 3. Track previous value
function usePrevious(value) {
  const prevRef = useRef();
  useEffect(() => {
    prevRef.current = value; // update after render
  });
  return prevRef.current; // previous render's value
}

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return <p>Now: {count}, Before: {prevCount}</p>;
}

// 4. Avoid stale closures
function Timer() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  countRef.current = count; // always fresh

  useEffect(() => {
    const id = setInterval(() => {
      console.log(countRef.current); // always current value ✅
    }, 1000);
    return () => clearInterval(id);
  }, []); // no stale closure with ref ✅
}`,
  },
  {
    q: "What is useCallback and when should you use it?",
    a: "useCallback memoizes a function, returning the same function reference between renders unless dependencies change. Use it to prevent unnecessary re-renders of child components that receive callbacks as props, and as stable dependencies in other hooks.",
    code: `import { useState, useCallback, memo } from "react";

// Without useCallback - new function every render
function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText]   = useState("");

  // ❌ New function reference on every render
  const handleClick = () => console.log("clicked");

  return (
    <>
      <input onChange={e => setText(e.target.value)} />
      <ExpensiveChild onClick={handleClick} />
      {/* ExpensiveChild re-renders even when text changes! */}
    </>
  );
}

// With useCallback - stable function reference
function ParentOptimized() {
  const [count, setCount] = useState(0);
  const [text, setText]   = useState("");

  // ✅ Same reference unless count changes
  const handleClick = useCallback(() => {
    console.log("count:", count);
  }, [count]);

  const handleReset = useCallback(() => setCount(0), []); // never changes

  return (
    <>
      <input onChange={e => setText(e.target.value)} />
      <ExpensiveChild onClick={handleClick} onReset={handleReset} />
      {/* ExpensiveChild only re-renders when count changes ✅ */}
    </>
  );
}

// ExpensiveChild wrapped in memo to benefit from useCallback
const ExpensiveChild = memo(function({ onClick, onReset }) {
  console.log("ExpensiveChild rendered");
  return (
    <>
      <button onClick={onClick}>Action</button>
      <button onClick={onReset}>Reset</button>
    </>
  );
});

// useCallback for stable useEffect dependency
function Fetcher({ userId }) {
  const fetchUser = useCallback(() => {
    return fetch(\`/api/users/\${userId}\`).then(r => r.json());
  }, [userId]); // stable unless userId changes

  useEffect(() => {
    fetchUser().then(setUser);
  }, [fetchUser]); // fetchUser is now a safe dependency ✅
}`,
  },
  {
    q: "What is useMemo and when should you use it?",
    a: "useMemo memoizes the result of an expensive computation, recomputing only when dependencies change. Use it for expensive calculations, filtered/sorted lists, and derived data that is costly to compute on every render.",
    code: `import { useMemo, useState } from "react";

// 1. Expensive calculation
function PrimeCalculator({ limit }) {
  const [multiplier, setMultiplier] = useState(1);

  // ❌ Recalculates every render (even when multiplier changes)
  const primes = findPrimes(limit);

  // ✅ Only recalculates when limit changes
  const primes2 = useMemo(() => {
    console.log("Computing primes...");
    return findPrimes(limit);
  }, [limit]);

  return (
    <div>
      <p>Primes up to {limit}: {primes2.length}</p>
      <p>Multiplied: {primes2[0] * multiplier}</p>
      <button onClick={() => setMultiplier(m => m + 1)}>x{multiplier}</button>
    </div>
  );
}

// 2. Derived data / filtered list
function UserList({ users, searchTerm, sortBy }) {
  const filteredUsers = useMemo(() => {
    console.log("Filtering users..."); // only when users/search/sort changes
    return users
      .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => a[sortBy]?.localeCompare?.(b[sortBy]) ?? 0);
  }, [users, searchTerm, sortBy]);

  return (
    <ul>
      {filteredUsers.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}

// 3. Stable object reference for context/props
function App() {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang]   = useState("en");

  // ❌ New object every render → all consumers re-render
  const config = { theme, lang };

  // ✅ Same reference unless theme or lang changes
  const config2 = useMemo(() => ({ theme, lang }), [theme, lang]);

  return <ThemeContext.Provider value={config2}>...</ThemeContext.Provider>;
}

// When NOT to use useMemo:
// ❌ Simple calculations (overhead > benefit)
// ❌ Every computation (premature optimization)
// ✅ Demonstrably expensive operations
// ✅ When profiler shows rendering bottlenecks`,
  },
  {
    q: "What is useContext and how does it solve prop drilling?",
    a: "useContext consumes a React context value without passing props through intermediate components. Context provides a way to share values like theme, locale, or auth state across the component tree without prop drilling.",
    code: `import { createContext, useContext, useState, useCallback } from "react";

// 1. Create context with default value
const AuthContext = createContext(null);

// 2. Create provider component
function AuthProvider({ children }) {
  const [user, setUser]     = useState(null);
  const [token, setToken]   = useState(null);

  const login = useCallback(async (credentials) => {
    const res  = await fetch("/api/login", { method: "POST", body: JSON.stringify(credentials) });
    const data = await res.json();
    setUser(data.user);
    setToken(data.token);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo(() => ({
    user, token, login, logout, isLoggedIn: !!user
  }), [user, token, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Custom hook for clean usage
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

// 4. Consume anywhere in the tree (no prop drilling!)
function Navbar() {
  const { user, logout, isLoggedIn } = useAuth();
  return (
    <nav>
      {isLoggedIn ? (
        <>
          <span>Hello, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button>Login</button>
      )}
    </nav>
  );
}

// 5. App setup
function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Router />
    </AuthProvider>
  );
}

// Without context: App → Layout → Header → Navbar → user (prop drilling 😱)
// With context:    Navbar reads directly from AuthContext ✅`,
  },
  {
    q: "What is useReducer and when should you use it over useState?",
    a: "useReducer manages complex state with a pure reducer function. Use it when: state logic is complex, next state depends on previous, multiple sub-values are tightly coupled, or state transitions need to be explicit and testable.",
    code: `import { useReducer } from "react";

// State shape
const initialState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
};

// Reducer - pure function, no side effects
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find(i => i.id === action.payload.id);
      const items  = exists
        ? state.items.map(i => i.id === action.payload.id
            ? { ...i, qty: i.qty + 1 } : i)
        : [...state.items, { ...action.payload, qty: 1 }];
      return { ...state, items, total: calcTotal(items) };
    }
    case "REMOVE_ITEM": {
      const items = state.items.filter(i => i.id !== action.payload);
      return { ...state, items, total: calcTotal(items) };
    }
    case "CLEAR_CART":
      return { ...initialState };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      throw new Error(\`Unknown action: \${action.type}\`);
  }
}

function calcTotal(items) {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

// Component
function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem    = (item) => dispatch({ type: "ADD_ITEM",    payload: item });
  const removeItem = (id)   => dispatch({ type: "REMOVE_ITEM", payload: id });
  const clearCart  = ()     => dispatch({ type: "CLEAR_CART" });

  return (
    <div>
      <p>Items: {state.items.length} | Total: \${state.total}</p>
      {state.items.map(item => (
        <div key={item.id}>
          {item.name} x{item.qty}
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <button onClick={clearCart}>Clear</button>
    </div>
  );
}

// useState vs useReducer:
// useState  → simple values, independent updates
// useReducer → complex objects, related state, explicit transitions`,
  },
  {
    q: "What are custom hooks and how do you create them?",
    a: "Custom hooks are JavaScript functions starting with 'use' that call other hooks. They extract and reuse stateful logic across components without changing the component hierarchy. They are the React equivalent of utility functions for state.",
    code: `import { useState, useEffect, useCallback, useRef } from "react";

// 1. useFetch - reusable data fetching
function useFetch(url) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(url)
      .then(r => { if (!r.ok) throw new Error(\`HTTP \${r.status}\`); return r.json(); })
      .then(d => { if (!cancelled) setData(d); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserProfile({ id }) {
  const { data: user, loading, error } = useFetch(\`/api/users/\${id}\`);
  if (loading) return <Spinner />;
  if (error)   return <p>Error: {error}</p>;
  return <h1>{user.name}</h1>;
}

// 2. useLocalStorage - persistent state
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initialValue; }
    catch { return initialValue; }
  });

  const setStoredValue = useCallback((newValue) => {
    const val = newValue instanceof Function ? newValue(value) : newValue;
    setValue(val);
    localStorage.setItem(key, JSON.stringify(val));
  }, [key, value]);

  return [value, setStoredValue];
}

// 3. useDebounce
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// Usage: debounced search
function Search() {
  const [query, setQuery]      = useState("");
  const debouncedQuery         = useDebounce(query, 400);
  const { data }               = useFetch(\`/api/search?q=\${debouncedQuery}\`);
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}`,
  },
  {
    q: "What is React.memo and how does it optimize performance?",
    a: "React.memo is a higher-order component that memoizes a component's render output. It performs a shallow comparison of props and skips re-rendering if props haven't changed. Combine with useCallback and useMemo for maximum effect.",
    code: `import { memo, useState, useCallback } from "react";

// ❌ Without memo - re-renders when parent re-renders
function ExpensiveList({ items, onSelect }) {
  console.log("ExpensiveList rendered");
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onSelect(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// ✅ With memo - skips render if props unchanged
const MemoizedList = memo(function ExpensiveList({ items, onSelect }) {
  console.log("MemoizedList rendered"); // only when items/onSelect changes
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onSelect(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
});

// Parent must also use useCallback to stabilize the callback
function App() {
  const [filter, setFilter] = useState("");
  const [items] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);

  // ✅ useCallback prevents new function reference on every render
  const handleSelect = useCallback((id) => {
    console.log("selected:", id);
  }, []);

  return (
    <>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      {/* MemoizedList won't re-render when filter changes ✅ */}
      <MemoizedList items={items} onSelect={handleSelect} />
    </>
  );
}

// Custom comparison function
const MemoItem = memo(
  function Item({ user }) { return <div>{user.name}</div>; },
  (prevProps, nextProps) => prevProps.user.id === nextProps.user.id
  // Only re-render if user.id changes (ignore other user property changes)
);

// When NOT to use memo:
// ❌ Components that always receive new props
// ❌ Simple, cheap-to-render components
// ✅ Components that render often with same props
// ✅ Components with expensive render logic`,
  },
  {
    q: "What is the React component lifecycle? How do hooks map to lifecycle methods?",
    a: "React components go through mount, update, and unmount phases. Class components have explicit lifecycle methods. Hooks replicate these behaviors — useEffect covers most lifecycle needs with a simpler mental model.",
    code: `// ── Class lifecycle methods ───────────────────────
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
    // Initialize state, bind methods
  }

  componentDidMount() {
    // Runs once after first render
    // Perfect for: data fetching, subscriptions, DOM setup
    fetch("/api/data").then(r => r.json()).then(data => this.setState({ data }));
  }

  componentDidUpdate(prevProps, prevState) {
    // Runs after every update
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser(this.props.userId); // respond to prop changes
    }
  }

  componentWillUnmount() {
    // Runs before component is removed
    // Clean up: unsubscribe, clear timers, cancel requests
    this.subscription.unsubscribe();
  }

  render() { return <div>{this.state.data}</div>; }
}

// ── Equivalent with hooks ──────────────────────────
function MyComponent({ userId }) {
  const [data, setData] = useState(null);

  // componentDidMount equivalent
  useEffect(() => {
    fetchInitialData().then(setData);
  }, []); // empty deps = run once ✅

  // componentDidUpdate equivalent
  useEffect(() => {
    fetchUser(userId).then(setData);
  }, [userId]); // runs when userId changes ✅

  // componentWillUnmount equivalent
  useEffect(() => {
    const sub = store.subscribe(handleChange);
    return () => sub.unsubscribe(); // cleanup = componentWillUnmount ✅
  }, []);

  // getDerivedStateFromProps equivalent
  const derived = useMemo(() => computeFromProps(data), [data]);

  return <div>{data}</div>;
}`,
  },
  {
    q: "What is prop drilling and how can you avoid it?",
    a: "Prop drilling is passing props through many intermediate components that don't need them, just to reach a deeply nested component. Solutions include Context API, state management libraries (Redux, Zustand), or component composition.",
    code: `// ❌ Prop drilling - passing user through 3 levels unnecessarily
function App() {
  const [user] = useState({ name: "Alice", role: "admin" });
  return <Layout user={user} />;
}
function Layout({ user }) {
  return <Header user={user} />; // Layout doesn't use user!
}
function Header({ user }) {
  return <Navbar user={user} />; // Header doesn't use user!
}
function Navbar({ user }) {
  return <span>Hello, {user.name}</span>; // only Navbar needs it
}

// ✅ Solution 1: Context API
const UserContext = createContext(null);
function App() {
  const [user] = useState({ name: "Alice", role: "admin" });
  return (
    <UserContext.Provider value={user}>
      <Layout />  {/* no prop needed */}
    </UserContext.Provider>
  );
}
function Navbar() {
  const user = useContext(UserContext); // direct access ✅
  return <span>Hello, {user.name}</span>;
}

// ✅ Solution 2: Component composition (children)
function App() {
  const [user] = useState({ name: "Alice" });
  return (
    <Layout>
      <Header>
        <Navbar user={user} />  {/* pass directly where needed */}
      </Header>
    </Layout>
  );
}
function Layout({ children }) { return <div>{children}</div>; }
function Header({ children }) { return <header>{children}</header>; }

// ✅ Solution 3: Zustand / Redux for global state
const useStore = create(set => ({
  user: null,
  setUser: (user) => set({ user }),
}));
function Navbar() {
  const user = useStore(s => s.user); // direct ✅
}`,
  },
  {
    q: "What is React Router and how does client-side routing work?",
    a: "React Router enables navigation between views in a SPA without full page reloads. It uses the browser's History API to change the URL and render different components. v6 uses a nested Routes/Route structure with hooks for navigation.",
    code: `import { BrowserRouter, Routes, Route, Link, NavLink,
         useNavigate, useParams, useLocation, Outlet } from "react-router-dom";

// App setup
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/users"       element={<Users />} />
        <Route path="/users/:id"   element={<UserDetail />} />
        <Route path="/dashboard"   element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*"            element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Navigation components
function Nav() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <NavLink to="/users" className={({ isActive }) => isActive ? "active" : ""}>
        Users
      </NavLink>
    </nav>
  );
}

// Route params
function UserDetail() {
  const { id }       = useParams();       // /users/42 → id = "42"
  const location     = useLocation();     // { pathname, search, hash, state }
  const navigate     = useNavigate();
  const { data: user, loading } = useFetch(\`/api/users/\${id}\`);

  if (loading) return <Spinner />;
  return (
    <>
      <h1>{user?.name}</h1>
      <button onClick={() => navigate(-1)}>Back</button>
      <button onClick={() => navigate("/users", { replace: true })}>
        Users (replace history)
      </button>
    </>
  );
}

// Nested routes with Outlet
function Dashboard() {
  return (
    <div>
      <aside><Link to="stats">Stats</Link></aside>
      <main><Outlet /></main>  {/* renders child route */}
    </div>
  );
}`,
  },
  {
    q: "What is React.lazy and Suspense for code splitting?",
    a: "React.lazy enables component-level code splitting using dynamic import(). Suspense shows a fallback UI while the lazy component loads. Together they reduce the initial bundle size by loading components only when needed.",
    code: `import { Suspense, lazy, useState } from "react";

// Lazy load components
const HeavyChart     = lazy(() => import("./components/HeavyChart"));
const UserSettings   = lazy(() => import("./pages/UserSettings"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

// Suspense wraps lazy components with fallback
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyChart />
    </Suspense>
  );
}

// Route-based code splitting (best practice)
const Home    = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Admin   = lazy(() => import("./pages/Admin"));

function Router() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin"   element={<Admin />} />
      </Routes>
    </Suspense>
  );
}

// Nested Suspense for granular loading
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<ChartSkeleton />}>
        <HeavyChart />          {/* loads independently */}
      </Suspense>
      <Suspense fallback={<TableSkeleton />}>
        <DataTable />           {/* loads independently */}
      </Suspense>
    </div>
  );
}

// Preload on hover (advanced)
const LazyModal = lazy(() => import("./Modal"));
function Button() {
  const preload = () => import("./Modal"); // start loading on hover
  return (
    <button onMouseEnter={preload}>
      Open Modal
    </button>
  );
}`,
  },

  // ─── INTERMEDIATE-ADVANCED ─────────────────────────────────
  {
    q: "What are error boundaries in React?",
    a: "Error boundaries are class components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the whole app. They must use getDerivedStateFromError and/or componentDidCatch.",
    code: `import { Component } from "react";

// Error boundary class component
class ErrorBoundary extends Component {
  state = { hasError: false, error: null, info: null };

  // Update state to show fallback UI
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Log error details (send to monitoring service)
  componentDidCatch(error, info) {
    console.error("Error:", error);
    console.error("Component stack:", info.componentStack);
    // logErrorToService(error, info); // Sentry, Datadog, etc.
  }

  handleReset = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError) {
      return this.props.fallback ? (
        this.props.fallback(this.state.error, this.handleReset)
      ) : (
        <div>
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={this.handleReset}>Try Again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Usage - wrap parts of app
function App() {
  return (
    <ErrorBoundary fallback={(err, reset) => (
      <div>
        <p>Error: {err.message}</p>
        <button onClick={reset}>Retry</button>
      </div>
    )}>
      <RiskyComponent />
    </ErrorBoundary>
  );
}

// Granular boundaries
function Dashboard() {
  return (
    <div>
      <ErrorBoundary><Chart /></ErrorBoundary>       {/* chart errors isolated */}
      <ErrorBoundary><DataTable /></ErrorBoundary>    {/* table errors isolated */}
    </div>
  );
}

// ⚠️ Error boundaries do NOT catch:
// - Event handlers (use try/catch inside handlers)
// - Async code (useEffect, setTimeout)
// - Server-side rendering
// - Errors in the boundary itself`,
  },
  {
    q: "What is the Context API and how do you use it effectively?",
    a: "Context provides a way to share values across the component tree without prop drilling. For best performance: split contexts by update frequency, memoize context values, and use multiple contexts rather than one large one.",
    code: `import { createContext, useContext, useState, useMemo, useCallback } from "react";

// ── Theme Context (rarely changes) ───────────────
const ThemeContext = createContext("light");

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggle = useCallback(() =>
    setTheme(t => t === "light" ? "dark" : "light"), []);

  // Memoize to prevent all consumers re-rendering
  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
const useTheme = () => useContext(ThemeContext);

// ── Cart Context (changes often) ─────────────────
const CartContext = createContext(null);

function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem    = useCallback(item =>
    setItems(prev => [...prev, item]), []);
  const removeItem = useCallback(id =>
    setItems(prev => prev.filter(i => i.id !== id)), []);

  const value = useMemo(() => ({
    items,
    addItem,
    removeItem,
    total: items.reduce((sum, i) => sum + i.price, 0),
    count: items.length,
  }), [items, addItem, removeItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};

// ── Usage ─────────────────────────────────────────
function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router />
      </CartProvider>
    </ThemeProvider>
  );
}

function ProductCard({ product }) {
  const { theme }   = useTheme();
  const { addItem } = useCart();
  return (
    <div className={theme}>
      <h3>{product.name}</h3>
      <button onClick={() => addItem(product)}>Add to Cart</button>
    </div>
  );
}`,
  },
  {
    q: "What is the useLayoutEffect hook and how does it differ from useEffect?",
    a: "useLayoutEffect fires synchronously after all DOM mutations but before the browser paints. Use it when you need to read layout (dimensions, positions) and synchronously re-render to avoid visual flicker. useEffect fires asynchronously after paint.",
    code: `import { useEffect, useLayoutEffect, useRef, useState } from "react";

// useEffect - fires after browser paint (async)
// Timeline: render → paint → useEffect callback
// Good for: data fetching, subscriptions, logging

// useLayoutEffect - fires before browser paint (sync)
// Timeline: render → useLayoutEffect callback → paint
// Good for: DOM measurements, preventing flicker

// Example: measuring element dimensions
function Tooltip({ targetRef, children }) {
  const tooltipRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // ✅ useLayoutEffect - measure and position BEFORE paint
  // Using useEffect here would cause visible flicker
  useLayoutEffect(() => {
    if (!targetRef.current || !tooltipRef.current) return;

    const targetRect  = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    setPosition({
      top:  targetRect.top - tooltipRect.height - 8,
      left: targetRect.left + (targetRect.width - tooltipRect.width) / 2,
    });
  }, []); // runs after DOM is updated but before paint

  return (
    <div
      ref={tooltipRef}
      style={{ position: "fixed", ...position }}
    >
      {children}
    </div>
  );
}

// Another example: prevent flash of unstyled content
function AnimatedBox() {
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    // Set initial position synchronously
    boxRef.current.style.transform = "translateX(-100%)";
    // Trigger animation
    requestAnimationFrame(() => {
      boxRef.current.style.transition = "transform 0.3s";
      boxRef.current.style.transform  = "translateX(0)";
    });
  }, []);

  return <div ref={boxRef}>Slides in without flicker ✅</div>;
}

// Rule of thumb:
// Default to useEffect
// Switch to useLayoutEffect only when you see visual flicker`,
  },
  {
    q: "What are render props and higher-order components (HOCs)?",
    a: "Render props share stateful logic via a function prop. HOCs wrap components to add behavior. Both are patterns from before hooks. Hooks have mostly replaced them, but HOCs are still common in some libraries.",
    code: `// ── Render Props ──────────────────────────────────
// Component shares logic via a function prop
function MouseTracker({ render }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return render(pos); // call the render prop with shared data
}

// Usage
<MouseTracker render={({ x, y }) => (
  <div>Mouse: {x}, {y}</div>
)} />

// children as render prop
<MouseTracker>
  {({ x, y }) => <canvas cursor={[x, y]} />}
</MouseTracker>

// ── Higher-Order Components (HOC) ──────────────────
// Function that takes a component and returns enhanced component
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    return <WrappedComponent {...props} user={user} />;
  };
}

function withLogging(WrappedComponent) {
  return function LoggedComponent(props) {
    useEffect(() => {
      console.log(\`\${WrappedComponent.name} mounted\`);
      return () => console.log(\`\${WrappedComponent.name} unmounted\`);
    }, []);
    return <WrappedComponent {...props} />;
  };
}

// Compose HOCs
const EnhancedDashboard = withAuth(withLogging(Dashboard));

// ── Modern equivalent with hooks ──────────────────
// Render props / HOCs → custom hooks (simpler, no nesting)
function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handle = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);
  return pos;
}
function Canvas() {
  const { x, y } = useMousePosition(); // clean, no wrapping ✅
  return <canvas style={{ cursor: \`\${x} \${y}\` }} />;
}`,
  },
  {
    q: "How does React handle forms — controlled forms with validation?",
    a: "Building forms with validation in React involves controlled inputs, error state, touched state, and submission handling. Libraries like React Hook Form and Formik simplify this, but understanding the pattern manually is essential.",
    code: `import { useState } from "react";

function validate(values) {
  const errors = {};
  if (!values.name.trim())            errors.name  = "Name is required";
  if (!values.email)                  errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Email is invalid";
  if (!values.password)               errors.password = "Password is required";
  else if (values.password.length < 8) errors.password = "Min 8 characters";
  return errors;
}

function RegistrationForm() {
  const [values, setValues]   = useState({ name: "", email: "", password: "" });
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // Validate on change if field was touched
    if (touched[name]) {
      setErrors(prev => ({ ...prev, ...validate({ ...values, [name]: value }) }));
    }
  };

  const handleBlur = ({ target: { name } }) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allErrors = validate(values);
    setErrors(allErrors);
    setTouched({ name: true, email: true, password: true });
    if (Object.keys(allErrors).length > 0) return;

    setSubmitting(true);
    try {
      await submitForm(values);
      alert("Success!");
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.form && <p className="error">{errors.form}</p>}
      {["name","email","password"].map(field => (
        <div key={field}>
          <input
            name={field}
            type={field === "password" ? "password" : "text"}
            value={values[field]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={field}
          />
          {touched[field] && errors[field] && (
            <p className="error">{errors[field]}</p>
          )}
        </div>
      ))}
      <button disabled={submitting}>{submitting ? "Saving..." : "Register"}</button>
    </form>
  );
}`,
  },
  {
    q: "What is state management and when should you use Redux / Zustand?",
    a: "State management organizes and shares state across components. Local state (useState) handles component-specific data. Context handles moderate sharing. Redux or Zustand handle complex global state with many consumers, actions, and derived data.",
    code: `// ── Zustand (modern, simple) ──────────────────────
import { create } from "zustand";

const useStore = create((set, get) => ({
  // State
  user:   null,
  cart:   [],
  theme:  "dark",

  // Actions
  setUser:  (user) => set({ user }),
  logout:   () => set({ user: null, cart: [] }),
  addToCart: (item) => set(state => ({
    cart: [...state.cart, item]
  })),
  removeFromCart: (id) => set(state => ({
    cart: state.cart.filter(i => i.id !== id)
  })),
  toggleTheme: () => set(state => ({
    theme: state.theme === "dark" ? "light" : "dark"
  })),

  // Computed (use get() for derived state)
  cartTotal: () => get().cart.reduce((sum, i) => sum + i.price, 0),
}));

// Consume with selector (only re-renders when selected state changes)
function CartIcon() {
  const cart  = useStore(s => s.cart);      // only re-renders when cart changes
  const count = cart.length;
  return <span>🛒 {count}</span>;
}

function UserMenu() {
  const user   = useStore(s => s.user);     // only re-renders when user changes
  const logout = useStore(s => s.logout);
  return user ? <button onClick={logout}>{user.name}</button> : null;
}

// ── Redux Toolkit (large apps) ────────────────────
import { createSlice, configureStore } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem:    (state, action) => { state.items.push(action.payload); },
    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
});

// When to use what:
// useState:  Component-local (form state, toggles, inputs)
// Context:   Low-frequency global data (theme, locale, auth)
// Zustand:   Medium apps, simpler API, less boilerplate
// Redux:     Large teams, complex logic, time-travel debugging`,
  },
  {
    q: "What are React portals and when should you use them?",
    a: "React portals render children into a different DOM node than the parent component's DOM hierarchy, while keeping them in the React component tree. Used for modals, tooltips, dropdowns, and notifications that need to overflow their parent.",
    code: `import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

// Modal using portal
function Modal({ isOpen, onClose, title, children }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Renders into document.body, not into parent DOM node
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <header>
          <h2>{title}</h2>
          <button onClick={onClose}>✕</button>
        </header>
        <main>{children}</main>
      </div>
    </div>,
    document.body  // ← target DOM node (outside React root)
  );
}

// Usage - events still bubble through React tree
function App() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ overflow: "hidden" }}>  {/* overflow won't clip modal */}
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Hello">
        <p>This renders in document.body but React events work normally</p>
      </Modal>
    </div>
  );
}

// Tooltip portal
function Tooltip({ anchor, content }) {
  const [rect, setRect] = useState(null);
  useEffect(() => {
    if (anchor.current) setRect(anchor.current.getBoundingClientRect());
  }, [anchor]);

  if (!rect) return null;
  return createPortal(
    <div style={{ position: "fixed", top: rect.bottom, left: rect.left }}>
      {content}
    </div>,
    document.body
  );
}`,
  },
  {
    q: "What are React Fragments and when should you use them?",
    a: "Fragments let you group multiple elements without adding extra DOM nodes. They solve the requirement for a single root element in JSX without wrapper divs that pollute the DOM structure and break CSS layouts like flexbox/grid.",
    code: `import { Fragment } from "react";

// ❌ Unnecessary wrapper div
function List({ items }) {
  return (
    <div>          {/* extra DOM node! */}
      <h2>Items</h2>
      <ul>...</ul>
    </div>
  );
}

// ✅ Fragment - no extra DOM node
function List({ items }) {
  return (
    <Fragment>
      <h2>Items</h2>
      <ul>...</ul>
    </Fragment>
  );
}

// ✅ Short syntax (most common)
function List({ items }) {
  return (
    <>
      <h2>Items</h2>
      <ul>...</ul>
    </>
  );
}

// Fragments in lists (need key - short syntax doesn't support key)
function DefinitionList({ terms }) {
  return (
    <dl>
      {terms.map(term => (
        <Fragment key={term.id}>   {/* key only works on Fragment, not <> */}
          <dt>{term.word}</dt>
          <dd>{term.definition}</dd>
        </Fragment>
      ))}
    </dl>
  );
}

// Real benefit: preserving CSS layout
// ❌ Extra div breaks flex/grid layout
<table>
  <tr>
    <div>         {/* invalid - div can't be child of tr */}
      <td>A</td>
      <td>B</td>
    </div>
  </tr>
</table>

// ✅ Fragment preserves valid HTML structure
<table>
  <tr>
    <>
      <td>A</td>
      <td>B</td>
    </>
  </tr>
</table>`,
  },

  // ─── ADVANCED ───────────────────────────────────────────────
  {
    q: "What is the React Concurrent Mode and what problems does it solve?",
    a: "Concurrent Mode allows React to work on multiple tasks simultaneously, pausing and resuming rendering work. It enables features like startTransition, useDeferredValue, and Suspense for data fetching — making UIs more responsive.",
    code: `import { startTransition, useDeferredValue, useTransition, Suspense } from "react";

// ── startTransition - mark low-priority updates ──
function SearchPage() {
  const [query, setQuery]   = useState("");
  const [results, setResults] = useState([]);

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);  // urgent: update input immediately

    startTransition(() => {
      // non-urgent: can be interrupted if user types again
      setResults(searchItems(value));
    });
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      <ResultsList results={results} />
    </>
  );
}

// ── useTransition - with pending state ────────────
function TabsComponent() {
  const [tab, setTab]         = useState("home");
  const [isPending, startTransition] = useTransition();

  function selectTab(nextTab) {
    startTransition(() => { setTab(nextTab); }); // non-urgent
  }

  return (
    <>
      <TabButton onClick={() => selectTab("home")}>Home</TabButton>
      <TabButton onClick={() => selectTab("posts")}>
        {isPending ? "Loading..." : "Posts"}
      </TabButton>
      <Suspense fallback={<Spinner />}>
        {tab === "home"  && <HomeTab />}
        {tab === "posts" && <PostsTab />}
      </Suspense>
    </>
  );
}

// ── useDeferredValue - defer expensive renders ────
function FilteredList({ items, filter }) {
  // deferredFilter lags behind filter during typing
  const deferredFilter = useDeferredValue(filter);

  const isStale = filter !== deferredFilter;

  const filtered = useMemo(() =>
    items.filter(i => i.name.includes(deferredFilter)),
  [items, deferredFilter]);

  return (
    <div style={{ opacity: isStale ? 0.7 : 1 }}>  {/* dim while updating */}
      {filtered.map(i => <Item key={i.id} item={i} />)}
    </div>
  );
}`,
  },
  {
    q: "What is the useImperativeHandle hook and forwardRef?",
    a: "forwardRef allows parent components to get a ref to a child component's DOM node or instance. useImperativeHandle customizes what the parent can access via that ref — exposing only specific methods rather than the full DOM node.",
    code: `import { forwardRef, useRef, useImperativeHandle, useState } from "react";

// ── forwardRef - expose DOM node to parent ────────
const Input = forwardRef(function Input({ label, ...props }, ref) {
  return (
    <div>
      <label>{label}</label>
      <input ref={ref} {...props} />  {/* forward ref to input */}
    </div>
  );
});

function Parent() {
  const inputRef = useRef(null);
  return (
    <>
      <Input ref={inputRef} label="Name" />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </>
  );
}

// ── useImperativeHandle - customize ref interface ─
const FancyInput = forwardRef(function FancyInput(props, ref) {
  const inputRef = useRef(null);
  const [value, setValue] = useState("");

  // Expose only specific methods (not full DOM node)
  useImperativeHandle(ref, () => ({
    focus:    ()      => inputRef.current.focus(),
    clear:    ()      => setValue(""),
    getValue: ()      => value,
    setValue: (v)     => setValue(v),
    scrollIntoView:() => inputRef.current.scrollIntoView(),
    // inputRef.current itself is NOT exposed ✅
  }), [value]);

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={e => setValue(e.target.value)}
      {...props}
    />
  );
});

// Parent has controlled access
function Form() {
  const fancyRef = useRef(null);

  const handleReset = () => {
    fancyRef.current.clear();           // ✅ allowed
    fancyRef.current.focus();           // ✅ allowed
    // fancyRef.current.style = "...";  // ❌ not exposed
  };

  return (
    <>
      <FancyInput ref={fancyRef} placeholder="Type here" />
      <button onClick={handleReset}>Reset & Focus</button>
    </>
  );
}`,
  },
  {
    q: "How do you optimize React performance? List all key techniques.",
    a: "React performance optimization involves preventing unnecessary renders, reducing computation costs, improving load time, and efficient DOM updates. Use React DevTools Profiler to identify bottlenecks before optimizing.",
    code: `// 1. React.memo - skip re-render if props unchanged
const MemoComp = memo(({ data }) => <ExpensiveUI data={data} />);

// 2. useCallback - stable function references
const handleClick = useCallback(() => doSomething(id), [id]);

// 3. useMemo - cache expensive computations
const sorted = useMemo(() => items.sort(compare), [items]);

// 4. Code splitting - reduce initial bundle
const HeavyPage = lazy(() => import("./HeavyPage"));

// 5. Virtual lists - only render visible items
import { FixedSizeList } from "react-window";
<FixedSizeList height={600} itemCount={10000} itemSize={50}>
  {({ index, style }) => <div style={style}>Row {index}</div>}
</FixedSizeList>

// 6. startTransition - non-blocking updates
startTransition(() => setResults(heavySearch(query)));

// 7. useDeferredValue - defer slow renders
const deferred = useDeferredValue(searchTerm);

// 8. Avoid anonymous functions/objects in JSX
// ❌ New object every render
<Child config={{ color: "red" }} onClick={() => handleClick(id)} />
// ✅ Memoized references
const config = useMemo(() => ({ color: "red" }), []);
<Child config={config} onClick={handleClick} />

// 9. State colocation - move state to where it's needed
// Don't put everything in root state

// 10. Key trick - reset component state
<UserProfile key={userId} /> // re-mounts when userId changes

// 11. Avoid deeply nested context updates
// Split contexts by update frequency

// 12. Production build
// npm run build → enables React optimizations, removes dev warnings

// Measure with React DevTools Profiler:
// - Identify which components render most often
// - Find what triggered each render
// - Measure render duration`,
  },
  {
    q: "What is Server-Side Rendering (SSR) and how does Next.js implement it?",
    a: "SSR renders React components on the server and sends HTML to the client, improving initial load time and SEO. Next.js provides multiple rendering strategies: SSR, SSG, ISR, and client-side rendering.",
    code: `// ── Next.js rendering strategies ─────────────────

// 1. SSR - getServerSideProps (runs on every request)
export async function getServerSideProps(context) {
  const { params, req, res, query } = context;
  const user = await fetchUser(params.id);
  if (!user) return { notFound: true };  // → 404 page

  return {
    props: { user },    // passed to page component as props
    // revalidate not available in SSR (use ISR instead)
  };
}
export default function UserPage({ user }) {
  return <h1>{user.name}</h1>;
}

// 2. SSG - getStaticProps (runs at build time)
export async function getStaticProps() {
  const posts = await fetchAllPosts();
  return {
    props: { posts },
    revalidate: 60,  // ISR: regenerate every 60 seconds
  };
}
export async function getStaticPaths() {
  const posts = await fetchAllPosts();
  return {
    paths: posts.map(p => ({ params: { id: p.id.toString() } })),
    fallback: "blocking",  // generate unknown paths on demand
  };
}

// 3. Next.js 13+ App Router - React Server Components
// app/users/[id]/page.tsx
async function UserPage({ params }) {
  // This runs on the server, never sent to client
  const user = await db.users.findUnique({ where: { id: params.id } });
  return (
    <div>
      <h1>{user.name}</h1>
      <ClientSideInteractions userId={user.id} />  {/* "use client" */}
    </div>
  );
}

// "use client" for interactive components
"use client";
function ClientSideInteractions({ userId }) {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(l => !l)}>
    {liked ? "❤️" : "🤍"}
  </button>;
}`,
  },
  {
    q: "What are React Server Components (RSC)?",
    a: "React Server Components run exclusively on the server, have zero client-side JavaScript, can directly access databases and server resources, and are not interactive. They reduce bundle size and improve performance. Client Components use 'use client' directive.",
    code: `// ── Server Component (default in Next.js App Router) ──
// Runs on server only, no useState/useEffect/browser APIs
// Can directly query DB, access filesystem, use server secrets

async function UserDashboard({ userId }) {
  // Direct DB access - no API route needed! ✅
  const user  = await prisma.user.findUnique({ where: { id: userId } });
  const posts = await prisma.post.findMany({ where: { authorId: userId } });

  return (
    <div>
      <h1>{user.name}</h1>
      {/* Can pass serializable data to client components */}
      <LikeButton postId={posts[0].id} initialLikes={posts[0].likes} />
      {/* Server components can be children of client components */}
      {posts.map(p => <PostCard key={p.id} post={p} />)}
    </div>
  );
}

// ── Client Component ───────────────────────────────
"use client"; // directive marks as client component

function LikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    setLiked(l => !l);
    setLikes(l => liked ? l - 1 : l + 1);
    await fetch(\`/api/posts/\${postId}/like\`, { method: "POST" });
  };

  return (
    <button onClick={handleLike}>
      {liked ? "❤️" : "🤍"} {likes}
    </button>
  );
}

// ── Rules ──────────────────────────────────────────
// Server Components CAN:
// ✅ Be async, await promises
// ✅ Access server-only resources (DB, filesystem)
// ✅ Import server-only packages
// ✅ Render client components

// Server Components CANNOT:
// ❌ Use hooks (useState, useEffect, etc.)
// ❌ Use browser APIs (window, document)
// ❌ Use event listeners (onClick, etc.)
// ❌ Be imported by client components (only data can be passed)`,
  },
  {
    q: "How do you implement infinite scroll and pagination in React?",
    a: "Infinite scroll loads more data as the user scrolls using IntersectionObserver. Pagination loads specific pages on demand. React Query or SWR simplify both patterns with built-in caching, loading states, and deduplication.",
    code: `import { useState, useEffect, useRef, useCallback } from "react";

// ── Infinite Scroll with IntersectionObserver ─────
function InfiniteList() {
  const [items, setItems]     = useState([]);
  const [page, setPage]       = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef           = useRef(null); // ref for the bottom element

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const res  = await fetch(\`/api/items?page=\${page}&limit=20\`);
    const data = await res.json();
    setItems(prev => [...prev, ...data.items]);
    setHasMore(data.hasMore);
    setPage(p => p + 1);
    setLoading(false);
  }, [page, loading, hasMore]);

  // Observe the sentinel element at the bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div>
      {items.map(item => <ItemCard key={item.id} item={item} />)}
      {loading && <Spinner />}
      <div ref={sentinelRef} />  {/* sentinel at bottom */}
      {!hasMore && <p>No more items</p>}
    </div>
  );
}

// ── Pagination ─────────────────────────────────────
function PaginatedList() {
  const [page, setPage]       = useState(1);
  const [pageSize]            = useState(10);
  const { data, loading }     = useFetch(\`/api/items?page=\${page}&size=\${pageSize}\`);

  return (
    <div>
      {data?.items.map(item => <ItemCard key={item.id} item={item} />)}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(p => p-1)}>Prev</button>
        {Array.from({ length: data?.totalPages ?? 0 }, (_, i) => (
          <button key={i+1} className={page === i+1 ? "active" : ""}
            onClick={() => setPage(i+1)}>{i+1}</button>
        ))}
        <button disabled={page === data?.totalPages}
          onClick={() => setPage(p => p+1)}>Next</button>
      </div>
    </div>
  );
}`,
  },
  {
    q: "What is React Query (TanStack Query) and why is it used?",
    a: "React Query is a data-fetching and server-state management library. It handles caching, background refetching, loading/error states, pagination, optimistic updates, and deduplication — eliminating most useEffect-based data fetching boilerplate.",
    code: `import { QueryClient, QueryClientProvider, useQuery,
         useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:   60 * 1000, // data fresh for 1 minute
      gcTime:      5 * 60 * 1000, // cache for 5 minutes
      retry: 3,
      refetchOnWindowFocus: true,
    }
  }
});

// ── Basic Query ────────────────────────────────────
function UserProfile({ id }) {
  const { data: user, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["user", id],          // unique cache key
    queryFn:  () => fetchUser(id),   // fetch function
    enabled:  !!id,                  // only run when id exists
    staleTime: 5 * 60 * 1000,        // override default
  });

  if (isLoading) return <Spinner />;
  if (isError)   return <p>Error: {error.message}</p>;
  return (
    <>
      <h1>{user.name}</h1>
      <button onClick={() => refetch()}>Refresh</button>
    </>
  );
}

// ── Mutation ───────────────────────────────────────
function UpdateUserForm({ userId }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updates) => updateUser(userId, updates),
    onSuccess: (updatedUser) => {
      // Update cache directly (no refetch needed)
      queryClient.setQueryData(["user", userId], updatedUser);
      // Or invalidate to trigger refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => console.error(error),
  });

  return (
    <button
      onClick={() => mutation.mutate({ name: "New Name" })}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? "Saving..." : "Save"}
    </button>
  );
}

// ── Optimistic Updates ─────────────────────────────
const likeMutation = useMutation({
  mutationFn: likePost,
  onMutate: async (postId) => {
    await queryClient.cancelQueries({ queryKey: ["posts"] });
    const previous = queryClient.getQueryData(["posts"]);
    queryClient.setQueryData(["posts"], old =>
      old.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p)
    );
    return { previous }; // for rollback
  },
  onError: (err, postId, context) => {
    queryClient.setQueryData(["posts"], context.previous); // rollback
  },
});`,
  },
  {
    q: "How does React handle accessibility (a11y)?",
    a: "React supports accessibility through semantic HTML, ARIA attributes, keyboard navigation, focus management, and screen reader support. Since JSX renders to DOM, standard HTML a11y practices apply with some JSX-specific differences.",
    code: `// 1. Semantic HTML first
function Navigation() {
  return (
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  );
}

// 2. ARIA in JSX (camelCase attributes)
<button
  aria-label="Close dialog"
  aria-expanded={isOpen}
  aria-controls="menu-id"
  aria-haspopup="true"
>✕</button>

// 3. Focus management for modals
function Modal({ isOpen, onClose }) {
  const firstFocusRef = useRef(null);
  const prevFocusRef  = useRef(null);

  useEffect(() => {
    if (isOpen) {
      prevFocusRef.current = document.activeElement; // save focus
      firstFocusRef.current?.focus();                // move into modal
    } else {
      prevFocusRef.current?.focus();                 // restore focus
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <h2 id="modal-title">Dialog Title</h2>
      <button ref={firstFocusRef}>First focusable</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

// 4. Skip link
<a href="#main" className="skip-link">Skip to main content</a>
<main id="main">...</main>

// 5. Live regions for dynamic content
function Notification({ message }) {
  return (
    <div aria-live="polite" aria-atomic="true">
      {message}  {/* screen readers announce changes */}
    </div>
  );
}

// 6. Form labels
<label htmlFor="email">Email</label>  {/* htmlFor not 'for' in JSX */}
<input id="email" type="email" aria-describedby="email-hint" />
<span id="email-hint">We'll never share your email</span>

// 7. Image alt text
<img src="avatar.jpg" alt="Alice's profile picture" />
<img src="decorative.png" alt="" role="presentation" />  {/* decorative */}`,
  },
  {
    q: "What is React Testing Library and how do you test React components?",
    a: "React Testing Library (RTL) tests components from a user's perspective, querying elements the way users find them. Paired with Vitest or Jest, it provides render, screen queries, user-event, and async utilities for comprehensive component testing.",
    code: `import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Component to test
function Counter({ onCountChange }) {
  const [count, setCount] = useState(0);
  const increment = () => {
    const next = count + 1;
    setCount(next);
    onCountChange?.(next);
  };
  return (
    <div>
      <p>Count: <span data-testid="count">{count}</span></p>
      <button onClick={increment}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

describe("Counter", () => {
  it("renders initial count of 0", () => {
    render(<Counter />);
    expect(screen.getByText("Count:")).toBeInTheDocument();
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("increments count on button click", async () => {
    const user = userEvent.setup();
    render(<Counter />);
    await user.click(screen.getByText("Increment"));
    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  it("calls onCountChange with new value", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Counter onCountChange={handleChange} />);
    await user.click(screen.getByText("Increment"));
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it("resets count to 0", async () => {
    const user = userEvent.setup();
    render(<Counter />);
    await user.click(screen.getByText("Increment"));
    await user.click(screen.getByText("Increment"));
    await user.click(screen.getByText("Reset"));
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });
});

// Testing async components
it("loads and displays user", async () => {
  vi.mock("./api", () => ({ fetchUser: vi.fn().mockResolvedValue({ name: "Alice" }) }));
  render(<UserProfile id={1} />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText("Alice")).toBeInTheDocument());
});`,
  },
  {
    q: "What are React design patterns you should know?",
    a: "Key React patterns include Compound Components, Controlled/Uncontrolled, Provider, Container/Presentational, and the custom hook pattern. They solve common problems of component composition, state sharing, and code reuse.",
    code: `// 1. Compound Components - components that work together
function Tabs({ children, defaultTab }) {
  const [active, setActive] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}
Tabs.Tab    = function Tab({ id, children }) {
  const { active, setActive } = useContext(TabsContext);
  return <button className={active === id ? "active" : ""} onClick={() => setActive(id)}>{children}</button>;
};
Tabs.Panel  = function Panel({ id, children }) {
  const { active } = useContext(TabsContext);
  return active === id ? <div>{children}</div> : null;
};

// Usage - flexible, expressive API
<Tabs defaultTab="home">
  <Tabs.Tab id="home">Home</Tabs.Tab>
  <Tabs.Tab id="posts">Posts</Tabs.Tab>
  <Tabs.Panel id="home"><HomeContent /></Tabs.Panel>
  <Tabs.Panel id="posts"><PostsContent /></Tabs.Panel>
</Tabs>

// 2. Container/Presentational split
// Container: handles data and logic
function UserListContainer() {
  const { data, loading } = useFetch("/api/users");
  if (loading) return <Spinner />;
  return <UserListView users={data} />;
}
// Presentational: pure UI, no data fetching
function UserListView({ users }) {
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// 3. State Reducer Pattern - let users control reducer
function useToggle({ reducer = (s,a) => s } = {}) {
  const [on, dispatch] = useReducer(
    (state, action) => reducer(toggleReducer(state, action), action),
    false
  );
  return { on, toggle: () => dispatch({ type: "TOGGLE" }) };
}

// 4. Slots pattern - named children
function Layout({ header, sidebar, children, footer }) {
  return (
    <div>
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  );
}
<Layout header={<Nav />} sidebar={<Menu />} footer={<Footer />}>
  <HomePage />
</Layout>`,
  },
  {
    q: "What is Zustand and how does it compare to Redux?",
    a: "Zustand is a minimal state management library using hooks. It has almost no boilerplate, supports middleware, and is much simpler than Redux. Redux Toolkit reduced Redux boilerplate significantly, making the choice situational.",
    code: `// ── Zustand ──────────────────────────────────────
import { create } from "zustand";
import { persist, devtools, immer } from "zustand/middleware";

const useStore = create(
  devtools(
    persist(
      immer((set, get) => ({
        // State
        user: null,
        todos: [],

        // Actions (with immer - mutate directly)
        setUser: (user) => set(state => { state.user = user; }),
        addTodo: (text) => set(state => {
          state.todos.push({ id: Date.now(), text, done: false });
        }),
        toggleTodo: (id) => set(state => {
          const todo = state.todos.find(t => t.id === id);
          if (todo) todo.done = !todo.done;
        }),
        removeTodo: (id) => set(state => {
          state.todos = state.todos.filter(t => t.id !== id);
        }),

        // Computed (derived from state)
        get completedCount() { return get().todos.filter(t => t.done).length; },
      })),
      { name: "app-storage" } // persist to localStorage
    )
  )
);

// Simple, hook-based usage with selectors
function TodoList() {
  const todos      = useStore(s => s.todos);     // selective subscription
  const addTodo    = useStore(s => s.addTodo);
  const toggleTodo = useStore(s => s.toggleTodo);
  const completed  = useStore(s => s.completedCount());

  return (
    <div>
      <p>{completed} / {todos.length} done</p>
      {todos.map(t => (
        <label key={t.id}>
          <input type="checkbox" checked={t.done} onChange={() => toggleTodo(t.id)} />
          {t.text}
        </label>
      ))}
    </div>
  );
}

// Zustand vs Redux comparison:
// Setup       | ~5 lines          | configureStore + slices
// Boilerplate | Minimal           | Moderate (RTK reduces it)
// DevTools    | ✅ (middleware)    | ✅ (built-in)
// Middleware  | ✅ Simple          | ✅ Powerful
// Bundle size | ~1KB              | ~15KB
// Best for    | Most apps         | Large teams, complex logic`,
  },
  {
    q: "What are React's synthetic events and event handling?",
    a: "React wraps native browser events in SyntheticEvents for cross-browser consistency. React uses event delegation — attaching a single listener to the root. Events in React are similar to HTML but use camelCase and pass functions instead of strings.",
    code: `// React event handling differences from HTML:
// HTML:  <button onclick="handleClick()">
// React: <button onClick={handleClick}>

function EventExamples() {
  // 1. Basic events
  const handleClick   = (e) => {
    console.log(e.type);            // "click"
    console.log(e.target);          // DOM node
    console.log(e.currentTarget);   // element with handler
    e.preventDefault();             // prevent default
    e.stopPropagation();            // stop bubbling
  };

  // 2. Passing data to handlers
  const handleItemClick = (id, e) => {
    e.stopPropagation();
    selectItem(id);
  };

  // 3. Form events
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    const formData = new FormData(e.target);
    console.log(Object.fromEntries(formData));
  };

  // 4. Input events
  const [value, setValue] = useState("");
  const handleChange = (e) => setValue(e.target.value);

  // 5. Keyboard events
  const handleKeyDown = (e) => {
    if (e.key === "Enter")  submit();
    if (e.key === "Escape") cancel();
    if (e.ctrlKey && e.key === "s") save();
  };

  return (
    <div onClick={handleClick}>
      {items.map(item => (
        <div key={item.id} onClick={(e) => handleItemClick(item.id, e)}>
          {item.name}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={value} onChange={handleChange} onKeyDown={handleKeyDown} />
      </form>
    </div>
  );
}

// Event delegation in React:
// React attaches ONE listener to the root DOM node
// All events bubble up and are dispatched to the correct handler
// This is why e.stopPropagation() works within React but doesn't
// prevent a native addEventListener above the React root`,
  },
  {
    q: "How do you handle side effects correctly with useEffect? Common pitfalls.",
    a: "useEffect pitfalls include missing dependencies (stale closures), infinite loops, missing cleanup, and running effects unnecessarily. The ESLint exhaustive-deps rule catches most issues. Understanding the dependency array is crucial.",
    code: `import { useState, useEffect, useCallback, useRef } from "react";

// Pitfall 1: Missing dependency → stale closure
function BadCounter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      console.log(count); // ❌ always logs 0 (stale closure)
    }, 1000);
    return () => clearInterval(id);
  }, []); // ❌ count missing from deps
}

// Fix: use functional update or add to deps
function GoodCounter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1); // ✅ functional update, no stale closure
    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ empty deps ok because we use functional update
}

// Pitfall 2: Infinite loop
function BadFetch({ userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId, user]); // ❌ user changes → effect runs → sets user → infinite!
}
// Fix: remove user from deps (it's not needed there)

// Pitfall 3: Missing cleanup for fetch
function GoodFetch({ userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    let cancelled = false;
    fetchUser(userId).then(data => {
      if (!cancelled) setUser(data); // ✅ prevent state update after unmount
    });
    return () => { cancelled = true; }; // ✅ cleanup
  }, [userId]);
}

// Pitfall 4: Object/array deps cause infinite loop
function BadSearch({ filters }) {
  useEffect(() => {
    search(filters); // filters is new object every render!
  }, [filters]); // ❌ infinite loop if filters is {}
}
// Fix: destructure or use useCallback/useMemo
function GoodSearch({ userId, status }) { // pass primitives
  useEffect(() => {
    search({ userId, status });
  }, [userId, status]); // ✅ primitives are stable
}`,
  },
  {
    q: "What are React's new hooks in React 18 and 19?",
    a: "React 18 introduced useId, useSyncExternalStore, useInsertionEffect, useTransition, and useDeferredValue. React 19 adds use(), useOptimistic, useFormStatus, and useFormState — focusing on async, forms, and server integration.",
    code: `import {
  useId, useSyncExternalStore, useTransition, useDeferredValue,
  useOptimistic, use
} from "react";

// ── React 18 ────────────────────────────────────────

// useId - generate stable, unique IDs for accessibility
function FormField({ label, type = "text" }) {
  const id = useId(); // stable across server/client renders
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} />
    </>
  );
}

// useSyncExternalStore - subscribe to external stores
function useWindowSize() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("resize", callback);
      return () => window.removeEventListener("resize", callback);
    },
    () => ({ width: window.innerWidth, height: window.innerHeight }),
    () => ({ width: 0, height: 0 }) // server snapshot
  );
}

// useTransition
const [isPending, startTransition] = useTransition();
startTransition(() => setResults(heavySearch(query)));

// useDeferredValue
const deferredQuery = useDeferredValue(query);

// ── React 19 ────────────────────────────────────────

// use() - read resources (promises, context) in render
function UserCard({ userPromise }) {
  const user = use(userPromise); // suspends until resolved
  return <h1>{user.name}</h1>;
}

// useOptimistic - optimistic UI updates
function LikeButton({ postId, initialLiked }) {
  const [liked, setLiked]           = useState(initialLiked);
  const [optimisticLiked, toggleOptimistic] = useOptimistic(
    liked,
    (state) => !state  // optimistic update function
  );

  async function handleLike() {
    toggleOptimistic(); // immediately updates UI
    try {
      await likePost(postId); // actual server call
      setLiked(l => !l);      // confirm with server state
    } catch {
      // revert on error (automatic with useOptimistic)
    }
  }
  return <button onClick={handleLike}>{optimisticLiked ? "❤️" : "🤍"}</button>;
}`,
  },
  {
    q: "How do you implement a reusable data table component in React?",
    a: "A reusable data table needs sorting, filtering, pagination, and flexible column definitions. The key is making it generic with TypeScript generics or a column config API, separating data logic from rendering.",
    code: `import { useState, useMemo } from "react";

// Column definition API
const columns = [
  { key: "name",   header: "Name",   sortable: true,
    render: (val, row) => <strong>{val}</strong> },
  { key: "email",  header: "Email",  sortable: true },
  { key: "age",    header: "Age",    sortable: true,
    render: (val) => \`\${val} yrs\` },
  { key: "active", header: "Status",
    render: (val) => <span className={val ? "green" : "red"}>{val ? "Active" : "Inactive"}</span> },
  { key: "actions", header: "",
    render: (_, row) => <button onClick={() => deleteRow(row.id)}>Delete</button> },
];

function DataTable({ data, columns, pageSize = 10 }) {
  const [sortKey, setSortKey]     = useState(null);
  const [sortDir, setSortDir]     = useState("asc");
  const [filter, setFilter]       = useState("");
  const [page, setPage]           = useState(1);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  };

  const processed = useMemo(() => {
    let result = data;
    // Filter
    if (filter) result = result.filter(row =>
      columns.some(col => String(row[col.key] ?? "")
        .toLowerCase().includes(filter.toLowerCase()))
    );
    // Sort
    if (sortKey) result = [...result].sort((a, b) => {
      const aVal = a[sortKey], bVal = b[sortKey];
      const cmp  = typeof aVal === "string"
        ? aVal.localeCompare(bVal) : aVal - bVal;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return result;
  }, [data, columns, filter, sortKey, sortDir]);

  const totalPages = Math.ceil(processed.length / pageSize);
  const paged      = processed.slice((page-1)*pageSize, page*pageSize);

  return (
    <div>
      <input placeholder="Search..." value={filter}
        onChange={e => { setFilter(e.target.value); setPage(1); }} />
      <table>
        <thead><tr>
          {columns.map(col => (
            <th key={col.key} onClick={() => col.sortable && handleSort(col.key)}
              style={{ cursor: col.sortable ? "pointer" : "default" }}>
              {col.header}
              {sortKey === col.key ? (sortDir === "asc" ? " ↑" : " ↓") : ""}
            </th>
          ))}
        </tr></thead>
        <tbody>
          {paged.map((row, i) => (
            <tr key={row.id ?? i}>
              {columns.map(col => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p>Page {page} of {totalPages} ({processed.length} results)</p>
      <button disabled={page===1} onClick={() => setPage(p=>p-1)}>Prev</button>
      <button disabled={page===totalPages} onClick={() => setPage(p=>p+1)}>Next</button>
    </div>
  );
}`,
  },
  {
    q: "What are the differences between React 17, 18, and 19?",
    a: "React 17 introduced the new JSX transform (no import needed). React 18 added concurrent features, automatic batching, new root API, and new hooks. React 19 adds server actions, improved forms, new hooks, and better error handling.",
    code: `// ── React 17 ────────────────────────────────────────
// New JSX transform - no longer need to import React
// Before React 17:
import React from "react"; // required
const el = <div>Hello</div>; // React.createElement("div", ...)

// React 17+:
// No import needed (babel handles it automatically)
const el = <div>Hello</div>; // ✅

// ── React 18 ────────────────────────────────────────
// 1. New root API
// Before:
import ReactDOM from "react-dom";
ReactDOM.render(<App />, document.getElementById("root")); // legacy

// React 18:
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
root.render(<App />); // ✅ enables concurrent features

// 2. Automatic batching (React 18 batches ALL updates)
// Before: only batched inside React event handlers
// React 18: batches in timeouts, promises, native handlers too
setTimeout(() => {
  setCount(c => c+1);
  setUser(u => u);
  // React 18: ONE re-render (batched) ✅
  // React 17: TWO re-renders ❌
}, 0);

// 3. Concurrent features enabled
// useTransition, useDeferredValue, Suspense improvements

// ── React 19 ────────────────────────────────────────
// 1. Actions - async functions for form submissions
async function updateName(formData) {
  "use server"; // server action
  const name = formData.get("name");
  await db.update({ name });
}
<form action={updateName}>
  <input name="name" />
  <button>Update</button>
</form>

// 2. useFormStatus - form submission state
import { useFormStatus } from "react-dom";
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? "Saving..." : "Save"}</button>;
}

// 3. ref as prop (no more forwardRef needed)
function Input({ ref, ...props }) { // React 19: ref is just a prop ✅
  return <input ref={ref} {...props} />;
}`,
  },
  {
    q: "How do you handle global error handling and logging in React apps?",
    a: "Global error handling in React combines Error Boundaries for render errors, window.onerror and unhandledrejection for runtime errors, and error monitoring services like Sentry. A good strategy catches, logs, and recovers gracefully.",
    code: `import { Component } from "react";
import * as Sentry from "@sentry/react";

// 1. Sentry initialization
Sentry.init({
  dsn: "YOUR_DSN",
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});

// 2. Error Boundary with Sentry
class GlobalErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Log to Sentry with context
    Sentry.withScope(scope => {
      scope.setExtras(info);
      scope.setUser({ id: this.props.userId });
      Sentry.captureException(error);
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>Something went wrong</h1>
          <button onClick={() => this.setState({ error: null })}>
            Try Again
          </button>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// 3. Global async error handler
useEffect(() => {
  // Unhandled promise rejections
  const handleRejection = (e) => {
    Sentry.captureException(e.reason);
    console.error("Unhandled rejection:", e.reason);
    e.preventDefault(); // prevent console error
  };

  // Runtime errors
  const handleError = (e) => {
    Sentry.captureException(e.error);
    console.error("Runtime error:", e.error);
  };

  window.addEventListener("unhandledrejection", handleRejection);
  window.addEventListener("error", handleError);
  return () => {
    window.removeEventListener("unhandledrejection", handleRejection);
    window.removeEventListener("error", handleError);
  };
}, []);

// 4. Custom error logging hook
function useErrorHandler() {
  return useCallback((error, context = {}) => {
    console.error(error);
    Sentry.captureException(error, { extra: context });
  }, []);
}`,
  },
];