import { useEffect, useState } from "react";
import Layout from "../Layout";
import Sidebar from "../components/Sidebar";

const API = "http://localhost:3000/api/admin";

function ConfigureAlerts() {
  const [formData, setFormData] = useState({
    lowStockThreshold: 10,
    expiryWarningDays: 30,
    criticalAlertEmail: "",
    alertFrequency: "Immediately",
    emailAlertsEnabled: false,
    dashboardAlertsEnabled: true,
    smsAlertsEnabled: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${API}/alerts`)
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.message) setFormData(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSaving(true);
    try {
      const res = await fetch(`${API}/alerts`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage("Settings saved successfully.");
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Layout><div style={{ padding: "40px", textAlign: "center" }}>Loading…</div></Layout>;

  return (
    <Layout>
      <div className="page-shell">
        <Sidebar />
        <main className="page-main">
          <div className="page-top">
            <div>
              <h2 className="page-title">Configure Alerts</h2>
              <p className="page-subtitle">Set thresholds and control alert behavior.</p>
            </div>
          </div>
          <div className="card form-card">
            <form className="user-form" onSubmit={handleSubmit}>
              {message && (
                <p style={{ marginBottom: "16px", padding: "12px", borderRadius: "8px", background: message.startsWith("Error") ? "#fdecea" : "#dff3e5", color: message.startsWith("Error") ? "#dc4c64" : "#1f7a3f" }}>
                  {message}
                </p>
              )}

              <div className="form-grid">
                <div className="form-group">
                  <label>Low Stock Threshold</label>
                  <input type="number" name="lowStockThreshold" value={formData.lowStockThreshold} onChange={handleChange} min="0" />
                </div>
                <div className="form-group">
                  <label>Expiry Warning (Days)</label>
                  <input type="number" name="expiryWarningDays" value={formData.expiryWarningDays} onChange={handleChange} min="1" />
                </div>
                <div className="form-group">
                  <label>Critical Alert Email</label>
                  <input type="email" name="criticalAlertEmail" value={formData.criticalAlertEmail} onChange={handleChange} placeholder="admin@hospital.com" />
                </div>
                <div className="form-group">
                  <label>Alert Frequency</label>
                  <select name="alertFrequency" value={formData.alertFrequency} onChange={handleChange}>
                    <option>Immediately</option>
                    <option>Every Hour</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                  </select>
                </div>
              </div>

              <div className="settings-grid">
                {[
                  { key: "emailAlertsEnabled", label: "Enable Email Alerts", desc: "Send notifications through email." },
                  { key: "dashboardAlertsEnabled", label: "Enable Dashboard Alerts", desc: "Show alerts directly in the admin dashboard." },
                  { key: "smsAlertsEnabled", label: "Enable SMS Alerts", desc: "Send critical alerts through SMS." },
                ].map(({ key, label, desc }) => (
                  <div className="setting-box" key={key}>
                    <div><h4>{label}</h4><p>{desc}</p></div>
                    <input type="checkbox" name={key} checked={formData[key]} onChange={handleChange} />
                  </div>
                ))}
              </div>

              <div className="form-actions">
                <button type="button" className="secondary-btn" onClick={() => window.location.reload()}>Reset</button>
                <button type="submit" className="primary-btn" disabled={saving}>{saving ? "Saving…" : "Save Settings"}</button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default ConfigureAlerts;