import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/dashboard.css";

function ManageNotifications({ setPage, currentPage }) {
  const notifications = [
    {
      id: 1,
      title: "Low stock alert",
      type: "Warning",
      status: "Active",
    },
    {
      id: 2,
      title: "New user registered",
      type: "Info",
      status: "Active",
    },
    {
      id: 3,
      title: "System maintenance",
      type: "Alert",
      status: "Inactive",
    },
  ];

  return (
    <div className="layout">
      <Sidebar setPage={setPage} currentPage={currentPage} />

      <main className="main-content">
        <Header />

        <div className="page-top">
          <div>
            <h2 className="page-title">Manage Notifications</h2>
            <p className="page-subtitle">
              Control and manage system notifications.
            </p>
          </div>

          <button className="primary-btn">+ New Notification</button>
        </div>

        <div className="card">
          <div className="table-wrap">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {notifications.map((note) => (
                  <tr key={note.id}>
                    <td>{note.title}</td>

                    <td>
                      <span className="role-badge">{note.type}</span>
                    </td>

                    <td>
                      <span
                        className={
                          note.status === "Active"
                            ? "status-active"
                            : "status-inactive"
                        }
                      >
                        {note.status}
                      </span>
                    </td>

                    <td>
                      <div className="action-group">
                        <button className="table-btn edit-btn">
                          ✏ Edit
                        </button>
                        <button className="table-btn delete-btn">
                          🗑 Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {notifications.length === 0 && (
              <p style={{ textAlign: "center", padding: "20px" }}>
                No notifications found
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ManageNotifications;