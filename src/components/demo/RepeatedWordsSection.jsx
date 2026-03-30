import { useState } from "react";
import { findRepeatedWords } from "../../utils/functions";

export default function RepeatedWordsSection() {
  const [text, setText] = useState(
    "This is a test. This test is simple. Simple test example."
  );
  const [result, setResult] = useState("");
  return (
    <div className="section">
      <h2>Find Repeated Words</h2>
      <textarea
        rows={4}
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
