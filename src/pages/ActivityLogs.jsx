import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/dashboard.css";

function ActivityLogs({ setPage, currentPage }) {
  const logs = [
    {
      id: 1,
      user: "John Doe",
      action: "Added new user account",
      module: "Users",
      time: "Today, 9:45 AM",
    },
    {
      id: 2,
      user: "Sarah Ackles",
      action: "Updated category details",
      module: "Categories",
      time: "Today, 10:20 AM",
    },
    {
      id: 3,
      user: "Ali Hadi",
      action: "Changed alert settings",
      module: "Alerts",
      time: "Today, 11:05 AM",
    },
    {
      id: 4,
      user: "Mia Cruz",
      action: "Sent system notification",
      module: "Notifications",
      time: "Today, 12:10 PM",
    },
  ];

  return (
    <div className="layout">
      <Sidebar setPage={setPage} currentPage={currentPage} />

      <main className="main-content">
        <Header />

        <div className="page-top">
          <div>
            <h2 className="page-title">Activity Logs</h2>
            <p className="page-subtitle">
              Review recent actions and system activity.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="table-toolbar">
            <input
              className="search-input"
              type="text"
              placeholder="Search activity..."
            />

            <select className="filter-select">
              <option>All Modules</option>
              <option>Users</option>
              <option>Categories</option>
              <option>Alerts</option>
              <option>Notifications</option>
            </select>
          </div>

          <div className="table-wrap">
            <table className="user-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Action</th>
                  <th>Module</th>
                  <th>Time</th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.user}</td>
                    <td>{log.action}</td>
                    <td>
                      <span className="role-badge">{log.module}</span>
                    </td>
                    <td>{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {logs.length === 0 && (
              <p style={{ textAlign: "center", padding: "20px" }}>
                No activity found
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ActivityLogs;