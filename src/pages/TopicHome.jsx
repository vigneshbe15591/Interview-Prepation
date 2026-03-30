import { useParams, Link } from "react-router-dom";
import { getTopic } from "../data";
import MinMaxSection from "../components/demo/MinMaxSection";
import RepeatedWordsSection from "../components/demo/RepeatedWordsSection";
import EncodeDecodeSection from "../components/demo/EncodeDecodeSection";

export default function TopicHome() {
  const { topicId } = useParams();
  const topic = getTopic(topicId);
  if (!topic) return <div className="page-content">Topic not found.</div>;

  const isJS = topicId === "javascript";

  return (
    <div className="page-content">
      <div className="topic-hero">
        <div className="topic-hero-icon">{topic.meta.icon}</div>
        <div>
          <div className="topic-hero-title">{topic.meta.label}</div>
          <div className="topic-hero-desc">{topic.meta.desc}</div>
        </div>
      </div>

      {isJS ? (
        <>
          <MinMaxSection />
          <RepeatedWordsSection />
          <EncodeDecodeSection />
        </>
      ) : (
        <div className="section">
          <h2>Quick Overview</h2>
          <p
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.88rem",
              lineHeight: 1.8,
            }}
          >
            {topic.meta.desc}
            <br />
            <br />
            This section covers{" "}
            <strong style={{ color: "var(--accent)" }}>
              {topic.qaData.length} key topics
            </strong>{" "}
            with detailed answers and editable code examples. Head to the{" "}
            <Link to={`/${topicId}/qa`} style={{ color: "var(--accent)" }}>
              Q&amp;A section →
            </Link>{" "}
            to explore them all.
          </p>
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <Link to={`/${topicId}/qa`} style={{ textDecoration: "none" }}>
          <button style={{ marginTop: 0 }}>Open Q&amp;A →</button>
        </Link>
      </div>
    </div>
  );
}
