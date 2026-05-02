import { useEffect, useState } from "react";
import Layout from "../Layout";
import Sidebar from "../components/Sidebar";

const API = "http://localhost:3000/api/admin";

function ManageNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({ title: "", type: "Info", message: "", targetRole: "all", isActive: true });
  const [apiError, setApiError] = useState("");

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/notifications`);
      const data = await res.json();
      setNotifications(Array.isArray(data) ? data : []);
    } catch { setNotifications([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchNotifications(); }, []);

  const openAdd = () => {
    setEditingNote(null);
    setFormData({ title: "", type: "Info", message: "", targetRole: "all", isActive: true });
    setApiError("");
    setShowForm(true);
  };

  const openEdit = (note) => {
    setEditingNote(note);
    setFormData({ title: note.title, type: note.type, message: note.message || "", targetRole: note.targetRole || "all", isActive: note.isActive });
    setApiError("");
    setShowForm(true);
  };

  const handleDelete = async (note) => {
    if (!window.confirm(`Delete notification "${note.title}"?`)) return;
    try {
      const res = await fetch(`${API}/notifications/${note._id}`, { method: "DELETE" });
      if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
      setNotifications((prev) => prev.filter((n) => n._id !== note._id));
    } catch (err) { alert(`Error: ${err.message}`); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!formData.title.trim()) { setApiError("Title is required."); return; }
    try {
      const url = editingNote ? `${API}/notifications/${editingNote._id}` : `${API}/notifications`;
      const method = editingNote ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setShowForm(false);
      fetchNotifications();
    } catch (err) { setApiError(err.message); }
  };

  return (
    <Layout>
      <div className="page-shell">
        <Sidebar />
        <main className="page-main">
          <div className="page-top">
            <div>
              <h2 className="page-title">Manage Notifications</h2>
              <p className="page-subtitle">Control and manage system notifications.</p>
            </div>
            <button className="primary-btn" onClick={openAdd}>+ New Notification</button>
          </div>

          {showForm && (
            <div className="card form-card" style={{ marginBottom: "20px" }}>
              <h3 style={{ marginBottom: "16px" }}>{editingNote ? "Edit Notification" : "New Notification"}</h3>
              {apiError && <p style={{ color: "#dc4c64", marginBottom: "12px" }}>{apiError}</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Title *</label>
                    <input value={formData.title} onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Low stock alert" />
                  </div>
                  <div className="form-group">
                    <label>Type *</label>
                    <select value={formData.type} onChange={(e) => setFormData(p => ({ ...p, type: e.target.value }))}>
                      <option>Info</option><option>Warning</option><option>Alert</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Target Role</label>
                    <select value={formData.targetRole} onChange={(e) => setFormData(p => ({ ...p, targetRole: e.target.value }))}>
                      <option value="all">All</option>
                      <option value="staff">Staff</option>
                      <option value="manager">Manager</option>
                      <option value="supplier">Supplier</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <input value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} placeholder="Optional message body" />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "12px 0" }}>
                  <input type="checkbox" id="noteActive" checked={formData.isActive} onChange={(e) => setFormData(p => ({ ...p, isActive: e.target.checked }))} style={{ width: "18px", height: "18px", minWidth: "unset", margin: 0 }} />
                  <label htmlFor="noteActive">Active</label>
                </div>
                <div className="form-actions">
                  <button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="primary-btn">{editingNote ? "Update" : "Save"}</button>
                </div>
              </form>
            </div>
          )}

          <div className="card">
            {loading ? <p style={{ padding: "20px", textAlign: "center" }}>Loading…</p> : (
              <div className="table-wrap">
                <table className="user-table">
                  <thead>
                    <tr><th>Title</th><th>Type</th><th>Target</th><th>Status</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {notifications.map((note) => (
                      <tr key={note._id}>
                        <td>{note.title}</td>
                        <td><span className="role-badge">{note.type}</span></td>
                        <td>{note.targetRole}</td>
                        <td><span className={note.isActive ? "status-active" : "status-inactive"}>{note.isActive ? "Active" : "Inactive"}</span></td>
                        <td>
                          <div className="action-group">
                            <button className="table-btn edit-btn" onClick={() => openEdit(note)}>✏ Edit</button>
                            <button className="table-btn delete-btn" onClick={() => handleDelete(note)}>🗑 Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {notifications.length === 0 && <p style={{ textAlign: "center", padding: "20px" }}>No notifications found</p>}
              </div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default ManageNotifications;