function Sidebar({ setPage, currentPage }) {
  return (
    <aside className="sidebar">
      <h2 className="logo">Makhzan</h2>

      <nav className="sidebar-nav">
        <button
          className={`nav-btn ${currentPage === "dashboard" ? "active" : ""}`}
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={`nav-btn ${currentPage === "users" ? "active" : ""}`}
          onClick={() => setPage("users")}
        >
          Manage Users
        </button>

        <button
        className={`nav-btn ${currentPage === "categories" ? "active" : ""}`}
        onClick={() => setPage("categories")}
        >
        Manage Categories
        </button>
        <button
        className={`nav-btn ${currentPage === "logs" ? "active" : ""}`}
        onClick={() => setPage("logs")}
        >
        Activity Logs
        </button>
        <button
        className={`nav-btn ${currentPage === "alerts" ? "active" : ""}`}
        onClick={() => setPage("alerts")}
        >
        Configure Alerts
        </button>
        <button
        className={`nav-btn ${currentPage === "notifications" ? "active" : ""}`}
        onClick={() => setPage("notifications")}
        >
        Manage Notifications
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;