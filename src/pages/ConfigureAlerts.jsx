import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/dashboard.css";

function ConfigureAlerts({ setPage, currentPage }) {
  return (
    <div className="layout">
      <Sidebar setPage={setPage} currentPage={currentPage} />

      <main className="main-content">
        <Header />

        <div className="page-top">
          <div>
            <h2 className="page-title">Configure Alerts</h2>
            <p className="page-subtitle">
              Set thresholds and control alert behavior.
            </p>
          </div>
        </div>

        <div className="card form-card">
          <form className="user-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Low Stock Threshold</label>
                <input type="number" placeholder="Enter minimum stock level" />
              </div>

              <div className="form-group">
                <label>Expiry Warning (Days)</label>
                <input type="number" placeholder="Enter number of days" />
              </div>

              <div className="form-group">
                <label>Critical Alert Email</label>
                <input type="email" placeholder="Enter email address" />
              </div>

              <div className="form-group">
                <label>Alert Frequency</label>
                <select>
                  <option>Immediately</option>
                  <option>Every Hour</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
              </div>
            </div>

            <div className="settings-grid">
              <div className="setting-box">
                <div>
                  <h4>Enable Email Alerts</h4>
                  <p>Send notifications through email.</p>
                </div>
                <input type="checkbox" />
              </div>

              <div className="setting-box">
                <div>
                  <h4>Enable Dashboard Alerts</h4>
                  <p>Show alerts directly in the admin dashboard.</p>
                </div>
                <input type="checkbox" />
              </div>

              <div className="setting-box">
                <div>
                  <h4>Enable SMS Alerts</h4>
                  <p>Send critical alerts through SMS.</p>
                </div>
                <input type="checkbox" />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="secondary-btn">
                Reset
              </button>
              <button type="submit" className="primary-btn">
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ConfigureAlerts;