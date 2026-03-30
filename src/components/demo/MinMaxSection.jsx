import { useState } from "react";
import { findMinMax } from "../../utils/functions";

export default function MinMaxSection() {
  const [result, setResult] = useState("");
  const arr = [5, 10, 2, 8, 20, 1];
  return (
    <div className="section">
      <h2>Find Min & Max</h2>
      <button
        onClick={() => {
          const { min, max } = findMinMax(arr);
          setResult(`Array: [${arr}] → Min: ${min}, Max: ${max}`);
        }}
      >
        Run
      </button>
      <div className="output">{result}</div>
    </div>
  );
}
