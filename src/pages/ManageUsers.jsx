import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import Sidebar from "../components/Sidebar";

function ManageUsers({ users, onDeleteUser, onEditUser, onAddUserClick }) {
  const navigate = useNavigate();

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
                onAddUserClick();
                navigate("/add-user");
              }}
            >
              + Add User
            </button>
          </div>

          <div className="card">
            <div className="table-wrap">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td><span className="role-badge">{user.role}</span></td>
                      <td>
                        <span className={user.status === "Active" ? "status-active" : "status-inactive"}>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-group">
                          <button
                            className="table-btn edit-btn"
                            onClick={() => {
                              onEditUser(user);
                              navigate("/add-user");
                            }}
                          >
                            ✏ Edit
                          </button>

                          <button
                            className="table-btn delete-btn"
                            onClick={() => {
                              const ok = window.confirm("Delete this user?");
                              if (ok) onDeleteUser(user.id);
                            }}
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
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default ManageUsers;