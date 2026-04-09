import Layout from "../Layout";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <Layout>
      <div className="page-shell">
        <Sidebar />

        <main className="page-main">
          <div className="page-top">
            <div>
              <h2 className="page-title">Dashboard</h2>
              <p className="page-subtitle">System admin overview and quick summary.</p>
            </div>
          </div>

          <section className="stats-grid">
            <div className="card stat-card">
              <p>Total Users</p>
              <h2>128</h2>
            </div>

            <div className="card stat-card">
              <p>Categories</p>
              <h2>16</h2>
            </div>

            <div className="card stat-card">
              <p>Active Alerts</p>
              <h2>5</h2>
            </div>

            <div className="card stat-card">
              <p>Notifications</p>
              <h2>12</h2>
            </div>
          </section>

          <section>
            <div className="card">
              <h3>Recent Activity</h3>
              <ul className="activity-list">
                <li>John added a new category</li>
                <li>Sara updated alerts</li>
                <li>Admin sent a notification</li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}

export default Dashboard;