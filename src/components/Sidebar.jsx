import { NavLink, useLocation } from "react-router-dom";
import { topics } from "../data";

export default function Sidebar() {
  const location = useLocation();
  const currentTopicId = location.pathname.split("/")[1];

  // Safety guard
  if (!topics || !Array.isArray(topics)) return null;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h1>⚡ DevPrep</h1>
        <p>Interview Ready</p>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-section-label">Overview</p>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `sidebar-item ${isActive ? "active" : ""}`
          }
        >
          <span className="item-icon">🏠</span> Dashboard
        </NavLink>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-section-label">Topics</p>
        {topics.map((topic) => {
          // Safety guard per topic
          if (!topic?.meta?.id) return null;

          const isExpanded = currentTopicId === topic.meta.id;

          return (
            <div key={topic.meta.id}>
              <NavLink
                to={`/${topic.meta.id}`}
                className={({ isActive }) =>
                  `sidebar-item ${isActive || isExpanded ? "active" : ""}`
                }
              >
                <span className="item-icon">{topic.meta.icon}</span>
                {topic.meta.label}
              </NavLink>

              {isExpanded && (
                <div className="sidebar-submenu">
                  <NavLink
                    to={`/${topic.meta.id}`}
                    end
                    className={({ isActive }) =>
                      `sidebar-subitem ${isActive ? "active" : ""}`
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to={`/${topic.meta.id}/qa`}
                    className={({ isActive }) =>
                      `sidebar-subitem ${isActive ? "active" : ""}`
                    }
                  >
                    Q&amp;A
                  </NavLink>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
