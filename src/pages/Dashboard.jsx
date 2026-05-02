import { useEffect, useState } from "react";
import Layout from "../Layout";
import Sidebar from "../components/Sidebar";

const API = "http://localhost:3000/api/admin";

function Dashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalCategories: 0, activeNotifications: 0 });
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch(`${API}/stats`)
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});

    fetch(`${API}/logs`)
      .then((r) => r.json())
      .then((data) => setLogs(Array.isArray(data) ? data.slice(0, 5) : []))
      .catch(() => {});
  }, []);

  const formatTime = (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Layout>
      <div className="page-shell">
        <Sidebar />

        <main className="page-main">
          <div className="page-top">
            <div>
              <h2 className="page-title">Dashboard</h2>
              <p className="page-subtitle">System admin overview and quick summary.</p>
            </div>
          </div>

          <section className="stats-grid">
            <div className="card stat-card">
              <p>Total Users</p>
              <h2>{stats.totalUsers}</h2>
            </div>
            <div className="card stat-card">
              <p>Categories</p>
              <h2>{stats.totalCategories}</h2>
            </div>
            <div className="card stat-card">
              <p>Notifications</p>
              <h2>{stats.activeNotifications}</h2>
            </div>
          </section>

          <section>
            <div className="card">
              <h3>Recent Activity</h3>
              {logs.length === 0 ? (
                <p style={{ marginTop: "12px", color: "#6b7280" }}>No recent activity.</p>
              ) : (
                <ul className="activity-list">
                  {logs.map((log) => (
                    <li key={log._id}>
                      <strong>{log.user}</strong> — {log.action}
                      <span style={{ float: "right", color: "#6b7280", fontSize: "13px" }}>
                        {formatTime(log.createdAt)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}

export default Dashboard;