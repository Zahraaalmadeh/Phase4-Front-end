import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import Sidebar from "../components/Sidebar";

const API = "http://localhost:3000/api/admin";

function ManageUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/users`);
      if (!res.ok) throw new Error("Failed to load users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError("Could not load users. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    sessionStorage.setItem("editingUser", JSON.stringify(user));
    navigate("/add-user");
  };

  const handleDelete = async (user) => {
    const confirmed = window.confirm(`Delete user "${user.name}"? This cannot be undone.`);
    if (!confirmed) return;

    try {
      const res = await fetch(`${API}/users/${user._id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Delete failed");
      }
      setUsers((prev) => prev.filter((u) => u._id !== user._id));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const getRoleLabel = (role) => {
    if (!role) return "—";
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <Layout>
      <div className="page-shell">
        <Sidebar />

        <main className="page-main">
          <div className="page-top">
            <div>
              <h2 className="page-title">Manage Users</h2>
              <p className="page-subtitle">View, manage, and update user accounts.</p>
            </div>
            <button
              className="primary-btn"
              onClick={() => {
                sessionStorage.removeItem("editingUser");
                navigate("/add-user");
              }}
            >
              + Add User
            </button>
          </div>

          <div className="card">
            {loading && <p style={{ padding: "20px", textAlign: "center" }}>Loading users…</p>}
            {error && <p style={{ padding: "20px", textAlign: "center", color: "#dc4c64" }}>{error}</p>}

            {!loading && !error && (
              <div className="table-wrap">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>
                          <span className="role-badge">{getRoleLabel(user.role)}</span>
                        </td>
                        <td>
                          <span className={user.isActive ? "status-active" : "status-inactive"}>
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <div className="action-group">
                            <button
                              className="table-btn edit-btn"
                              onClick={() => handleEdit(user)}
                            >
                              ✏ Edit
                            </button>
                            <button
                              className="table-btn delete-btn"
                              onClick={() => handleDelete(user)}
                            >
                              🗑 Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {users.length === 0 && (
                  <p style={{ textAlign: "center", padding: "20px" }}>No users found</p>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default ManageUsers;