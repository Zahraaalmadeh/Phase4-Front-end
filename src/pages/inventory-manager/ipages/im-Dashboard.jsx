import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Layout from "../iLayout";
import Sidebar from "../icomponents/iSidebar";

function Dashboard({items}){
    const navigate = useNavigate();
    function getItemStatus(item) {
        const todayString = new Date().toISOString().split("T")[0];
        const today = new Date();
        

    if (!item.expiryDate) return "No Expiry Date";

    const expiry = new Date(item.expiryDate);
    if (Number.isNaN(expiry.getTime())) return "Invalid Date";

    const timeDifference = expiry - today;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (Number(item.quantity) === 0) return "Out of Stock";
    if (item.expiryDate < todayString) return "Expired";
    if (daysDifference <= 30) return "Near Expiry";
    if (Number(item.quantity) <= 5) return "Low Stock";

    return "Valid";
  }

    const lowStockCount = items.filter(
        (item) => getItemStatus(item) === "Low Stock"
    ).length;

    const expiredCount = items.filter(
        (item) => getItemStatus(item) === "Expired"
    ).length;

    const nearExpiryCount = items.filter(
        (item) => getItemStatus(item) === "Near Expiry"
    ).length;

    const outOfStockCount = items.filter(
        (item) => getItemStatus(item) === "Out of Stock"
    ).length;

    function handleNavigateToInventory(status) {
        navigate("/inventory", {
            state: { statusFilter: status }
        });
    }

    function handleLogout() {
    navigate("/");
    }



    return(
        <Layout>
            <div className="page-with-sidebar">
            <Sidebar />
            <div className="main-content-area">
        <div className="page-container">
            <div className="dashboard-header">
                <div>
                    <h1 className="brand-title">Makhzan</h1>
                    <p className="brand-subtitle">Inventory Manager Dashboard</p>
                    
                </div>
            </div>

            <div className="dashboard-grid">
                <div>
                    <div className="alerts-row">
                        <button
                            className="alert-box low-stock-box"
                            onClick={() => handleNavigateToInventory("Low Stock")}
                        >
                            <span>Low Stock Alerts</span>
                            <strong>{lowStockCount}</strong>
                        </button>

                        <button
                            className="alert-box expired-box"
                            onClick={() => handleNavigateToInventory("Expired")}
                        >
                            <span>Expired Items</span>
                            <strong>{expiredCount}</strong>
                        </button>
                    </div>

                    <div className="card">
                        <h2>Hospital Inventory Overview</h2>
                        <p className="muted-text">
                            Click any alert card to open the filtered inventory list.
                        </p>

                        <div className="mini-stats">
                            <button
                                className="mini-stat-card"
                                onClick={() => handleNavigateToInventory("Near Expiry")}
                            >
                                <span>Near Expiry</span>
                                <strong>{nearExpiryCount}</strong>
                            </button>

                            <button
                                className="mini-stat-card"
                                onClick={() => handleNavigateToInventory("Out of Stock")}
                            >
                                <span>Out of Stock</span>
                                <strong>{outOfStockCount}</strong>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="dashboard-side-panel">
                    <div className="card">
                        <h3>Quick Navigation</h3>
                        <p className="muted-text">Access core modules quickly.</p>
                        <div className="side-actions">
                            <Link to="/inventory">Manage Inventory</Link>
                            <Link to="/orders">View Orders</Link>
                        </div>
                    </div>

                    <div className="card">
                        <h3>Notifications Summary</h3>
                        <p>Expired products: {expiredCount}</p>
                        <p>Out of stock: {outOfStockCount}</p>
                        <p>Low stock: {lowStockCount}</p>
                        <p>Near expiry: {nearExpiryCount}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        </Layout>
    );
}

export default Dashboard;