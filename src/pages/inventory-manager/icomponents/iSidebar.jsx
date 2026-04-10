import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2 className="logo-text">Makhzan</h2>
        <p className="sidebar-subtitle">Inventory Manager</p>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-btn ${isActive("/im-dashboard") ? "active" : ""}`}
          onClick={() => navigate("/im-dashboard")}
        >
          Dashboard
        </button>

        <button
          className={`nav-btn ${isActive("/inventory") ? "active" : ""}`}
          onClick={() => navigate("/inventory")}
        >
          Inventory
        </button>

        <button
          className={`nav-btn ${isActive("/orders") ? "active" : ""}`}
          onClick={() => navigate("/orders")}
        >
          Orders
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;