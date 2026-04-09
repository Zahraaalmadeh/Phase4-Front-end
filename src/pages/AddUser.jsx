import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import Sidebar from "../components/Sidebar";

function AddUser({ onAddUser, onUpdateUser, editingUser, clearEditingUser }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Staff",
    status: "Active",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        id: editingUser.id,
        name: editingUser.name || "",
        email: editingUser.email || "",
        password: "",
        role: editingUser.role || "Staff",
        status: editingUser.status || "Active",
        phone: editingUser.phone || "",
        notes: editingUser.notes || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "Staff",
        status: "Active",
        phone: "",
        notes: "",
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Please fill in name and email.");
      return;
    }

    if (editingUser) {
      onUpdateUser(formData);
      alert("User updated successfully.");
    } else {
      onAddUser(formData);
      alert("User added successfully.");
    }

    clearEditingUser();
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

            <button
              className="secondary-btn"
              onClick={() => {
                clearEditingUser();
                navigate("/users");
              }}
            >
              Back
            </button>
          </div>

          <div className="card form-card">
            <form className="user-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input name="name" value={formData.name} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input name="email" value={formData.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Role</label>
                  <select name="role" value={formData.role} onChange={handleChange}>
                    <option>Admin</option>
                    <option>Staff</option>
                    <option>Manager</option>
                    <option>Supplier</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: "20px" }}>
                <label>Notes</label>
                <textarea rows="4" name="notes" value={formData.notes} onChange={handleChange}></textarea>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => {
                    clearEditingUser();
                    navigate("/users");
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  {editingUser ? "Update User" : "Save User"}
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