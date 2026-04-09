import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/dashboard.css";

function ManageUsers({ setPage, currentPage }) {
  const users = [
    { id: 1, name: "John Doe", email: "john@email.com", role: "Admin", status: "Active" },
    { id: 2, name: "Sarah Ackles", email: "sarah@email.com", role: "Staff", status: "Active" },
    { id: 3, name: "Ali Hadi", email: "ali@email.com", role: "Manager", status: "Inactive" },
    { id: 4, name: "Mia Cruz", email: "mia@email.com", role: "Supplier", status: "Active" },
  ];

  return (
    <div className="layout">
      <Sidebar setPage={setPage} currentPage={currentPage}/>

      <main className="main-content">
        <Header />

        <div className="page-top">
          <div>
            <h2 className="page-title">Manage Users</h2>
            <p className="page-subtitle">View, manage, and update user accounts.</p>
          </div>

          <button className="primary-btn" onClick={() => setPage("add-user")}>
             + Add User
          </button>
        </div>

        <div className="card">
          <div className="table-toolbar">
            <input
              className="search-input"
              type="text"
              placeholder="Search users..."
            />

            <select className="filter-select">
              <option>All Roles</option>
              <option>Admin</option>
              <option>Staff</option>
              <option>Manager</option>
              <option>Supplier</option>
            </select>
          </div>

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
                    <td>
                      <span className="role-badge">{user.role}</span>
                    </td>
                    <td>
                      <span
                        className={
                          user.status === "Active" ? "status-active" : "status-inactive"
                        }
                      >
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-group">
                        <button className="table-btn edit-btn">✏ Edit</button>
                        <button className="table-btn delete-btn">🗑 Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
                <p style={{ textAlign: "center", padding: "20px" }}>
                 No users found
                </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ManageUsers;