import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/dashboard.css";

function Dashboard({ setPage, currentPage }) {
  return (
    <div className="layout">
      <Sidebar setPage={setPage} currentPage={currentPage}/>

      <main className="main-content">
        <Header />

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

        <section className="content-grid">
          

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
  );
}

export default Dashboard;