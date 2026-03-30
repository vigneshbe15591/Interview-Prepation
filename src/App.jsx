import { Routes, Route, useParams } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import TopicHome from "./pages/TopicHome";
import TopicQA from "./pages/TopicQA";

function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:topicId" element={<TopicHome />} />
          <Route path="/:topicId/qa" element={<TopicQA />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return <Layout />;
}
