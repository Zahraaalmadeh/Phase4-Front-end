import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ManageUsers from "./pages/ManageUsers";
import AddUser from "./pages/AddUser";
import ManageCategories from "./pages/ManageCategories";
import ActivityLogs from "./pages/ActivityLogs";
import ConfigureAlerts from "./pages/ConfigureAlerts";
import ManageNotifications from "./pages/ManageNotifications";
import SupplierPage from "./pages/SupplierPage";
import LogIn from "./logIn.jsx";

import Layout from "./Layout";

// Staff pages
import StaffDashboard from "./pages/Staff/Dashboard.jsx";
import AddRequest from "./pages/Staff/AddRequest.jsx";
import StaffInventory from "./pages/Staff/inventory.jsx";
import StaffNotifications from "./pages/Staff/Notifications.jsx";
import ViewRequest from "./pages/Staff/ViewRequest.jsx";
import Insights from "./pages/Staff/Insights.jsx";

// Inventory Manager pages
import ImDashboard from "./pages/inventory-manager/ipages/im-Dashboard.jsx";
import ImInventory from "./pages/inventory-manager/ipages/Inventory.jsx";
import Orders from "./pages/inventory-manager/ipages/Orders.jsx";

function App() {
    



    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem("items");
        return savedItems ? JSON.parse(savedItems) : [];
    });

    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem("orders");
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);

    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    
    

    


    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LogIn />} />

            {/* Admin routes */}
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/users" element={<ManageUsers />} />
            <Route path="/add-user" element={<AddUser />} />
            
            <Route path="/categories" element={<ManageCategories />} />
            <Route path="/logs" element={<ActivityLogs />} />
            <Route path="/alerts" element={<ConfigureAlerts />} />
            <Route path="/notifications" element={<ManageNotifications />} />

            {/* Supplier routes */}
            <Route path="/supplier" element={<SupplierPage />} />

            {/* Staff routes */}
            <Route
                path="/staffDashboard"
                element={
                    <Layout>
                        <StaffDashboard />
                    </Layout>
                }
            />
            <Route
                path="/add-request"
                element={
                    <Layout>
                        <AddRequest />
                    </Layout>
                }
            />
            <Route
                path="/staff-inventory"
                element={
                    <Layout>
                        <StaffInventory />
                    </Layout>
                }
            />
            <Route
                path="/staff-notifications"
                element={
                    <Layout>
                        <StaffNotifications />
                    </Layout>
                }
            />
            <Route
                path="/view-requests"
                element={
                    <Layout>
                        <ViewRequest />
                    </Layout>
                }
            />
            <Route
                path="/insights"
                element={
                    <Layout>
                        <Insights />
                    </Layout>
                }
            />

            {/* Inventory Manager routes */}
            <Route
                path="/im-dashboard"
                element={
                    <Layout>
                        <ImDashboard items={items} />
                    </Layout>
                }
            />
            <Route
                path="/im-inventory"
                element={
                    <Layout>
                        <ImInventory items={items} setItems={setItems} />
                    </Layout>
                }
            />
            <Route
                path="/orders"
                element={
                    <Layout>
                        <Orders orders={orders} setOrders={setOrders} />
                    </Layout>
                }
            />
        </Routes>
    );
}

export default App;