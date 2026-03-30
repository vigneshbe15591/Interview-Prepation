export const meta = {
  id: "react",
  label: "React",
  icon: "⚛️",
  color: "#61dafb",
  desc: "A JavaScript library for building user interfaces with components.",
};

export const qaData = [
  {
    q: "useState & useEffect",
    a: "useState manages local component state. useEffect handles side effects like data fetching, subscriptions, and DOM manipulation. The dependency array controls when effects re-run.",
    code: `import { useState, useEffect } from "react";
  
  function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      setLoading(true);
      fetch(\`/api/users/\${userId}\`)
        .then(r => r.json())
        .then(data => { setUser(data); setLoading(false); });
  
      return () => { /* cleanup on unmount or userId change */ };
    }, [userId]); // re-runs when userId changes
  
    if (loading) return <div>Loading...</div>;
    return <div>{user?.name}</div>;
  }`,
  },
  {
    q: "useCallback & useMemo",
    a: "useCallback memoizes functions to prevent unnecessary re-renders of child components. useMemo memoizes expensive computed values. Both take a dependency array.",
    code: `import { useCallback, useMemo, useState } from "react";
  
  function Parent() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");
  
    // Only recreated when count changes
    const handleClick = useCallback(() => {
      console.log("count:", count);
    }, [count]);
  
    // Only recomputed when count changes
    const doubled = useMemo(() => {
      return Array.from({ length: count }, (_, i) => i * 2);
    }, [count]);
  
    return (
      <>
        <Child onClick={handleClick} />
        <p>{doubled.join(", ")}</p>
      </>
    );
  }`,
  },
  {
    q: "useRef & useContext",
    a: "useRef persists a mutable value across renders without causing re-renders, and can reference DOM nodes. useContext consumes a context value without prop drilling.",
    code: `import { useRef, useContext, createContext } from "react";
  
  // useRef - DOM access
  function TextInput() {
    const inputRef = useRef(null);
    return (
      <>
        <input ref={inputRef} />
        <button onClick={() => inputRef.current.focus()}>Focus</button>
      </>
    );
  }
  
  // useContext
  const ThemeContext = createContext("light");
  
  function App() {
    return (
      <ThemeContext.Provider value="dark">
        <Child />
      </ThemeContext.Provider>
    );
  }
  
  function Child() {
    const theme = useContext(ThemeContext);
    return <div className={theme}>Hello</div>;
  }`,
  },
  {
    q: "Custom Hooks",
    a: "Custom hooks extract reusable stateful logic into functions starting with 'use'. They can call other hooks and share logic across components without changing the component hierarchy.",
    code: `// useFetch custom hook
  function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      let cancelled = false;
      fetch(url)
        .then(r => r.json())
        .then(d => { if (!cancelled) setData(d); })
        .catch(e => { if (!cancelled) setError(e); })
        .finally(() => { if (!cancelled) setLoading(false); });
      return () => { cancelled = true; };
    }, [url]);
  
    return { data, loading, error };
  }
  
  // Usage
  function Users() {
    const { data, loading, error } = useFetch("/api/users");
    if (loading) return <Spinner />;
    if (error) return <Error msg={error.message} />;
    return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
  }`,
  },
  {
    q: "React.memo & Performance",
    a: "React.memo prevents re-renders when props haven't changed. Combined with useCallback and useMemo, it optimizes rendering performance for heavy components.",
    code: `import { memo, useCallback, useState } from "react";
  
  // Without memo - re-renders on every parent render
  const ExpensiveChild = memo(function({ value, onClick }) {
    console.log("ExpensiveChild rendered");
    return <button onClick={onClick}>{value}</button>;
  });
  
  function Parent() {
    const [count, setCount] = useState(0);
    const [other, setOther] = useState(0);
  
    // Without useCallback, this changes every render
    const handleClick = useCallback(() => {
      console.log("clicked");
    }, []); // stable reference
  
    return (
      <>
        <button onClick={() => setOther(o => o+1)}>Other: {other}</button>
        <ExpensiveChild value={count} onClick={handleClick} />
      </>
    );
    // ExpensiveChild won't re-render when 'other' changes ✅
  }`,
  },
  {
    q: "useReducer",
    a: "useReducer is an alternative to useState for complex state logic. It accepts a reducer function and initial state, returning current state and a dispatch function.",
    code: `import { useReducer } from "react";
  
  const initialState = { count: 0, step: 1 };
  
  function reducer(state, action) {
    switch (action.type) {
      case "increment": return { ...state, count: state.count + state.step };
      case "decrement": return { ...state, count: state.count - state.step };
      case "setStep":   return { ...state, step: action.payload };
      case "reset":     return initialState;
      default: throw new Error("Unknown action");
    }
  }
  
  function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <>
        <p>Count: {state.count}</p>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        <input
          type="number"
          onChange={e => dispatch({ type: "setStep", payload: +e.target.value })}
        />
      </>
    );
  }`,
  },
  {
    q: "Error Boundaries",
    a: "Error boundaries are class components that catch JavaScript errors in their child component tree. They must use componentDidCatch and getDerivedStateFromError lifecycle methods.",
    code: `import { Component } from "react";
  
  class ErrorBoundary extends Component {
    state = { hasError: false, error: null };
  
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
  
    componentDidCatch(error, info) {
      console.error("Caught:", error, info.componentStack);
      // Log to error monitoring service
    }
  
    render() {
      if (this.state.hasError) {
        return (
          <div>
            <h2>Something went wrong</h2>
            <button onClick={() => this.setState({ hasError: false })}>
              Try again
            </button>
          </div>
        );
      }
      return this.props.children;
    }
  }
  
  // Usage
  <ErrorBoundary>
    <RiskyComponent />
  </ErrorBoundary>`,
  },
  {
    q: "Suspense & Lazy Loading",
    a: "React.lazy enables code splitting by lazy-loading components. Suspense shows a fallback UI while the lazy component loads. Works with dynamic import().",
    code: `import { Suspense, lazy } from "react";
  
  // Lazy load a component
  const HeavyChart = lazy(() => import("./HeavyChart"));
  const Settings   = lazy(() => import("./Settings"));
  
  function App() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyChart />
      </Suspense>
    );
  }
  
  // Route-based code splitting
  import { Routes, Route } from "react-router-dom";
  const Home    = lazy(() => import("./pages/Home"));
  const Profile = lazy(() => import("./pages/Profile"));
  
  function Router() {
    return (
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    );
  }`,
  },
];
