import { useEffect, useState } from "react";
import Layout from "../Layout";
import Sidebar from "../components/Sidebar";

const API = "http://localhost:3000/api/admin";

function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/logs`)
      .then((r) => r.json())
      .then((data) => setLogs(Array.isArray(data) ? data : []))
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  }, []);

  const formatTime = (iso) => {
    if (!iso) return "";
    return new Date(iso).toLocaleString("en-US", {
      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <Layout>
      <div className="page-shell">
        <Sidebar />
        <main className="page-main">
          <div className="page-top">
            <div>
              <h2 className="page-title">Activity Logs</h2>
              <p className="page-subtitle">Review recent actions and system activity.</p>
            </div>
          </div>
          <div className="card">
            {loading ? (
              <p style={{ padding: "20px", textAlign: "center" }}>Loading…</p>
            ) : (
              <div className="table-wrap">
                <table className="user-table">
                  <thead>
                    <tr><th>User</th><th>Action</th><th>Module</th><th>Time</th></tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log._id}>
                        <td>{log.user}</td>
                        <td>{log.action}</td>
                        <td><span className="role-badge">{log.module}</span></td>
                        <td>{formatTime(log.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {logs.length === 0 && <p style={{ textAlign: "center", padding: "20px" }}>No activity found</p>}
              </div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default ActivityLogs;