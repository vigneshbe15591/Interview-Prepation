import { useState } from "react";
import CodeBlock from "./CodeBlock";

export default function AccordionItem({ item, index, lang }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`accordion-item ${open ? "open" : ""}`}>
      <button className="accordion-question" onClick={() => setOpen(!open)}>
        <span className="q-number">Q{index + 1}</span>
        <span className="q-text">{item.q}</span>
        <span className="q-arrow">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="accordion-answer">
          <p className="answer-text">{item.a}</p>
          {item.code && <CodeBlock initialCode={item.code} lang={lang} />}
        </div>
      )}
    </div>
  );
}
