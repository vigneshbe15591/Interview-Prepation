import { Link } from "react-router-dom";
import { topics } from "../data";

export default function Dashboard() {
  if (!topics || !Array.isArray(topics)) return null;

  return (
    <div className="page-content">
      <div className="dash-header">
        <h1>Developer Interview Prep</h1>
        <p>Choose a topic to start learning with examples and Q&amp;A</p>
      </div>
      <div className="dashboard-grid">
        {topics.map((topic) => {
          if (!topic?.meta?.id) return null;
          return (
            <Link
              key={topic.meta.id}
              to={`/${topic.meta.id}`}
              className="dash-card"
            >
              <div className="dash-card-icon">{topic.meta.icon}</div>
              <div className="dash-card-title">{topic.meta.label}</div>
              <div className="dash-card-desc">{topic.meta.desc}</div>
              <div className="dash-card-count">
                {topic.qaData?.length ?? 0} questions →
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
