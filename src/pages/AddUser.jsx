import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/dashboard.css";

function AddUser({ setPage ,currentPage}) {
  return (
    <div className="layout">
      <Sidebar setPage={setPage} currentPage={currentPage}/>

      <main className="main-content">
        <Header />

        <div className="page-top">
  <div>
    <h2 className="page-title">Add User</h2>
    <p className="page-subtitle">Create a new user account and assign a role.</p>
  </div>

  <button className="secondary-btn" onClick={() => setPage("users")}>
    Back
  </button>
</div>

        <div className="card form-card">
          <form
            className="user-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("User saved!");
              setPage("users");
            }}
          >
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter full name" />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Enter email address" />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Enter password" />
              </div>

              <div className="form-group">
                <label>Role</label>
                <select>
                  <option>Select role</option>
                  <option>Admin</option>
                  <option>Staff</option>
                  <option>Manager</option>
                  <option>Supplier</option>
                </select>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" placeholder="Enter phone number" />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Notes</label>
              <textarea rows="4" placeholder="Add notes about this user"></textarea>
            </div>

            <div className="form-actions">
              <button type="button" className="secondary-btn">Cancel</button>
              <button type="submit" className="primary-btn">Save User</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddUser;