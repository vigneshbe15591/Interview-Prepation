import { useState } from "react";

export default function CodeBlock({ initialCode, lang = "JS" }) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="code-block">
      <div className="code-toolbar">
        <span className="code-label">{lang}</span>
        <button className="code-btn" onClick={handleCopy}>
          {copied ? "✅ Copied" : "📋 Copy"}
        </button>
      </div>
      <textarea
        className="code-editor"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        rows={code.split("\n").length + 1}
      />
    </div>
  );
}
