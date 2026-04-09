import Layout from "../Layout";
import Sidebar from "../components/Sidebar";

function ManageCategories() {
  const categories = [
    { id: 1, name: "Pain Relief", items: 24, status: "Active" },
    { id: 2, name: "Antibiotics", items: 18, status: "Active" },
    { id: 3, name: "Vitamins", items: 30, status: "Inactive" },
  ];

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

            <button className="primary-btn">+ Add Category</button>
          </div>

          <div className="card">
            <div className="table-wrap">
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th>Total Items</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat.id}>
                      <td>{cat.name}</td>
                      <td>{cat.items}</td>
                      <td>
                        <span className={cat.status === "Active" ? "status-active" : "status-inactive"}>
                          {cat.status}
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

              {categories.length === 0 && (
                <p style={{ textAlign: "center", padding: "20px" }}>No categories found</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default ManageCategories;