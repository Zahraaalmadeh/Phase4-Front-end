import { useEffect, useState } from "react";
import Layout from "../Layout";
import Sidebar from "../components/Sidebar";

const API = "http://localhost:3000/api/admin";

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", isActive: true });
  const [apiError, setApiError] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/categories`);
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch {
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const openAdd = () => {
    setEditingCat(null);
    setFormData({ name: "", description: "", isActive: true });
    setApiError("");
    setShowForm(true);
  };

  const openEdit = (cat) => {
    setEditingCat(cat);
    setFormData({ name: cat.name, description: cat.description || "", isActive: cat.isActive });
    setApiError("");
    setShowForm(true);
  };

  const handleDelete = async (cat) => {
    if (!window.confirm(`Delete category "${cat.name}"?`)) return;
    try {
      const res = await fetch(`${API}/categories/${cat._id}`, { method: "DELETE" });
      if (!res.ok) { const d = await res.json(); throw new Error(d.message); }
      setCategories((prev) => prev.filter((c) => c._id !== cat._id));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!formData.name.trim()) { setApiError("Category name is required."); return; }

    try {
      const url = editingCat ? `${API}/categories/${editingCat._id}` : `${API}/categories`;
      const method = editingCat ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setShowForm(false);
      fetchCategories();
    } catch (err) {
      setApiError(err.message);
    }
  };

  return (
    <Layout>
      <div className="page-shell">
        <Sidebar />
        <main className="page-main">
          <div className="page-top">
            <div>
              <h2 className="page-title">Manage Categories</h2>
              <p className="page-subtitle">Organize and manage medicine categories.</p>
            </div>
            <button className="primary-btn" onClick={openAdd}>+ Add Category</button>
          </div>

          {showForm && (
            <div className="card form-card" style={{ marginBottom: "20px" }}>
              <h3 style={{ marginBottom: "16px" }}>{editingCat ? "Edit Category" : "New Category"}</h3>
              {apiError && <p style={{ color: "#dc4c64", marginBottom: "12px" }}>{apiError}</p>}
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Category Name *</label>
                    <input
                      value={formData.name}
                      onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. Antibiotics"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      value={formData.description}
                      onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                      placeholder="Optional description"
                    />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "12px 0" }}>
                  <input
                    type="checkbox"
                    id="catActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(p => ({ ...p, isActive: e.target.checked }))}
                    style={{ width: "18px", height: "18px", minWidth: "unset", margin: 0 }}
                  />
                  <label htmlFor="catActive">Active</label>
                </div>
                <div className="form-actions">
                  <button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="primary-btn">{editingCat ? "Update" : "Save"}</button>
                </div>
              </form>
            </div>
          )}

          <div className="card">
            {loading ? <p style={{ padding: "20px", textAlign: "center" }}>Loading…</p> : (
              <div className="table-wrap">
                <table className="user-table">
                  <thead>
                    <tr><th>Category Name</th><th>Description</th><th>Status</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {categories.map((cat) => (
                      <tr key={cat._id}>
                        <td>{cat.name}</td>
                        <td>{cat.description || "—"}</td>
                        <td>
                          <span className={cat.isActive ? "status-active" : "status-inactive"}>
                            {cat.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <div className="action-group">
                            <button className="table-btn edit-btn" onClick={() => openEdit(cat)}>✏ Edit</button>
                            <button className="table-btn delete-btn" onClick={() => handleDelete(cat)}>🗑 Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {categories.length === 0 && <p style={{ textAlign: "center", padding: "20px" }}>No categories found</p>}
              </div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default ManageCategories;