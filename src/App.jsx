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
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "john@email.com",
            role: "Admin",
            status: "Active",
            phone: "",
            notes: "",
        },
        {
            id: 2,
            name: "Sarah Ackles",
            email: "sarah@email.com",
            role: "Staff",
            status: "Active",
            phone: "",
            notes: "",
        },
        {
            id: 3,
            name: "Ali Hadi",
            email: "ali@email.com",
            role: "Manager",
            status: "Inactive",
            phone: "",
            notes: "",
        },
        {
            id: 4,
            name: "Mia Cruz",
            email: "mia@email.com",
            role: "Supplier",
            status: "Active",
            phone: "",
            notes: "",
        },
    ]);

    const [editingUser, setEditingUser] = useState(null);

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

    const addUser = (newUser) => {
        setUsers((prev) => [...prev, { ...newUser, id: Date.now() }]);
    };

    const updateUser = (updatedUser) => {
        setUsers((prev) =>
            prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
        setEditingUser(null);
    };

    const deleteUser = (id) => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
    };

    const startEditUser = (user) => {
        setEditingUser(user);
    };

    const clearEditingUser = () => {
        setEditingUser(null);
    };

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LogIn />} />

            {/* Admin routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
                path="/users"
                element={
                    <ManageUsers
                        users={users}
                        onDeleteUser={deleteUser}
                        onEditUser={startEditUser}
                        onAddUserClick={clearEditingUser}
                    />
                }
            />
            <Route
                path="/add-user"
                element={
                    <AddUser
                        onAddUser={addUser}
                        onUpdateUser={updateUser}
                        editingUser={editingUser}
                        clearEditingUser={clearEditingUser}
                    />
                }
            />
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