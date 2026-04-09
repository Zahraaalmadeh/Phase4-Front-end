import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <h2 className="logo-text">Makhzan</h2>

      <nav className="sidebar-nav">
        <button
          className={`nav-btn ${isActive("/dashboard") ? "active" : ""}`}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        <button
          className={`nav-btn ${isActive("/users") || isActive("/add-user") ? "active" : ""}`}
          onClick={() => navigate("/users")}
        >
          Manage Users
        </button>

        <button
          className={`nav-btn ${isActive("/categories") ? "active" : ""}`}
          onClick={() => navigate("/categories")}
        >
          Manage Categories
        </button>

        <button
          className={`nav-btn ${isActive("/logs") ? "active" : ""}`}
          onClick={() => navigate("/logs")}
        >
          Activity Logs
        </button>

        <button
          className={`nav-btn ${isActive("/alerts") ? "active" : ""}`}
          onClick={() => navigate("/alerts")}
        >
          Configure Alerts
        </button>

        <button
          className={`nav-btn ${isActive("/notifications") ? "active" : ""}`}
          onClick={() => navigate("/notifications")}
        >
          Manage Notifications
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;