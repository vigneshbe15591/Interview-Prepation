import { useParams } from "react-router-dom";
import { useState } from "react";
import { getTopic } from "../data";
import AccordionItem from "../components/AccordionItem";

export default function TopicQA() {
  const { topicId } = useParams();
  const topic = getTopic(topicId);
  const [search, setSearch] = useState("");

  if (!topic) return <div className="page-content">Topic not found.</div>;

  const filtered = topic.qaData.filter((item) =>
    item.q.toLowerCase().includes(search.toLowerCase())
  );

  const langMap = {
    javascript: "JS",
    typescript: "TS",
    react: "JSX",
    angular: "TS",
    nodejs: "Node",
    html5: "HTML",
    css3: "CSS",
  };

  return (
    <div className="page-content">
      <div className="qa-header">
        <h1>
          {topic.meta.icon} {topic.meta.label} — Q&amp;A
        </h1>
        <p>
          {topic.qaData.length} questions · click to expand · code is editable
        </p>
      </div>
      <input
        className="qa-search"
        placeholder={`🔍 Search ${topic.meta.label} topics...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="accordion">
        {filtered.length > 0 ? (
          filtered.map((item, i) => (
            <AccordionItem
              key={item.q}
              item={item}
              index={i}
              lang={langMap[topicId] || "CODE"}
            />
          ))
        ) : (
          <p className="no-results">No results for "{search}"</p>
        )}
      </div>
    </div>
  );
}
