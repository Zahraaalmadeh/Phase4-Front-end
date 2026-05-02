import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import Sidebar from "../components/Sidebar";

const API = "http://localhost:3000/api/admin";

function AddUser() {
  const navigate = useNavigate();

  // Read the user being edited from sessionStorage (set by ManageUsers)
  const editingUser = (() => {
    try {
      const stored = sessionStorage.getItem("editingUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })();

  const [formData, setFormData] = useState({
    name: editingUser?.name || "",
    email: editingUser?.email || "",
    username: editingUser?.username || "",
    password: "",
    role: editingUser?.role || "staff",
    isActive: editingUser?.isActive ?? true,
    phone: editingUser?.phone || "",
    department: editingUser?.department || "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.username.trim()) {
      setApiError("Name, email, and username are required.");
      return;
    }
    if (!editingUser && !formData.password.trim()) {
      setApiError("Password is required for new users.");
      return;
    }

    setSubmitting(true);
    try {
      const url = editingUser
        ? `${API}/users/${editingUser._id}`
        : `${API}/users`;
      const method = editingUser ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request failed");

      sessionStorage.removeItem("editingUser");
      alert(editingUser ? "User updated successfully." : "User added successfully.");
      navigate("/users");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    sessionStorage.removeItem("editingUser");
    navigate("/users");
  };

  return (
    <Layout>
      <div className="page-shell">
        <Sidebar />

        <main className="page-main">
          <div className="page-top">
            <div>
              <h2 className="page-title">{editingUser ? "Edit User" : "Add User"}</h2>
              <p className="page-subtitle">
                {editingUser ? "Update user account details." : "Create a new user account and assign a role."}
              </p>
            </div>
            <button className="secondary-btn" onClick={handleCancel}>Back</button>
          </div>

          <div className="card form-card">
            <form className="user-form" onSubmit={handleSubmit}>
              {apiError && (
                <p style={{ color: "#dc4c64", marginBottom: "16px", padding: "12px", background: "#fdecea", borderRadius: "8px" }}>
                  {apiError}
                </p>
              )}

              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. john@hospital.com" />
                </div>

                <div className="form-group">
                  <label>Username *</label>
                  <input name="username" value={formData.username} onChange={handleChange} placeholder="e.g. john_doe" />
                </div>

                <div className="form-group">
                  <label>{editingUser ? "New Password (leave blank to keep current)" : "Password *"}</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={editingUser ? "Leave blank to keep current" : "Enter password"}
                  />
                </div>

                <div className="form-group">
                  <label>Role *</label>
                  <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                    <option value="manager">Manager</option>
                    <option value="supplier">Supplier</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Department</label>
                  <select name="department" value={formData.department} onChange={handleChange}>
                    <option value="">— None —</option>
                    <option value="icu">ICU</option>
                    <option value="er">ER</option>
                    <option value="opd">OPD</option>
                    <option value="surgery">Surgery</option>
                    <option value="pharmacy">Pharmacy</option>
                    <option value="radiology">Radiology</option>
                    <option value="blood_bank">Blood Bank</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. +966 55 000 0000" />
                </div>

                <div className="form-group" style={{ flexDirection: "row", alignItems: "center", gap: "12px" }}>
                  <label style={{ marginBottom: 0 }}>Active</label>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    style={{ width: "18px", height: "18px", minWidth: "unset", margin: 0 }}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="secondary-btn" onClick={handleCancel}>Cancel</button>
                <button type="submit" className="primary-btn" disabled={submitting}>
                  {submitting ? "Saving…" : editingUser ? "Update User" : "Save User"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </Layout>
  );
  
}

export default AddUser;